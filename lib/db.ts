import { Pool } from 'pg'

let pool: Pool | null = null
let initPromise: Promise<void> | null = null

export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    pool = new Pool({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    })

    // Initialize schema once and let query() await this before first use.
    initPromise = initTables(pool)
  }

  return pool
}

export async function query(sql: string, values?: any[]) {
  const currentPool = getPool()
  if (initPromise) {
    await initPromise
  }
  return currentPool.query(sql, values)
}

/**
 * Synchronous query wrapper (for immediate table initialization, not for general use)
 * WARNING: This is a blocking call and should only be used for initialization
 */
export function querySync(sql: string, values?: any[]): any {
  // For synchronous compatibility with existing code during migration
  // This is a compatibility layer - in production, all queries should be async
  throw new Error(
    'Synchronous queries are not supported. Use "await query(...)" instead. ' +
    'If you need blocking behavior for initialization, use queryAsync with proper await.'
  )
}

/**
 * Backward compatibility wrapper (for lazy initialization)
 * Call this in routes that need synchronous-like initialization
 */
export function getDb(): { prepare: () => never } {
  throw new Error(
    'SQLite API (getDb) is no longer supported. ' +
    'This project has migrated to PostgreSQL. ' +
    'Please use: await query(sql, values) instead of db.prepare(sql).run/get() ' +
    'For async-unsafe contexts, use fire-and-forget query().catch(...) pattern.'
  )
}

async function initTables(currentPool: Pool) {
  try {
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS licenses (
        id SERIAL PRIMARY KEY,
        license_key TEXT NOT NULL UNIQUE,
        email TEXT,
        tier TEXT NOT NULL DEFAULT 'core',
        plan TEXT NOT NULL DEFAULT 'standard',
        max_instances INTEGER NOT NULL DEFAULT 2,
        status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'expired', 'cancelled')),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMP,
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT UNIQUE
      );

      CREATE TABLE IF NOT EXISTS license_instances (
        id SERIAL PRIMARY KEY,
        license_id INTEGER NOT NULL,
        instance_id TEXT NOT NULL,
        domain TEXT,
        first_seen_at TIMESTAMP NOT NULL DEFAULT NOW(),
        last_seen_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE,
        UNIQUE(license_id, instance_id)
      );

      CREATE TABLE IF NOT EXISTS license_logs (
        id SERIAL PRIMARY KEY,
        license_key TEXT,
        event TEXT NOT NULL,
        details TEXT,
        ip_address TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        provider TEXT NOT NULL CHECK(provider IN ('stripe', 'paddle')),
        provider_event_id TEXT UNIQUE,
        provider_checkout_id TEXT,
        email TEXT NOT NULL,
        amount_cents INTEGER NOT NULL,
        currency TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS artifacts (
        id SERIAL PRIMARY KEY,
        version TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('source', 'docker')),
        filename TEXT NOT NULL,
        storage_key TEXT NOT NULL,
        sha256 TEXT NOT NULL,
        size_bytes INTEGER NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1,
        published_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS download_events (
        id SERIAL PRIMARY KEY,
        license_id INTEGER NOT NULL,
        artifact_id INTEGER NOT NULL,
        ip TEXT,
        user_agent TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE,
        FOREIGN KEY (artifact_id) REFERENCES artifacts(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS portal_magic_links (
        id SERIAL PRIMARY KEY,
        license_id INTEGER NOT NULL,
        email TEXT NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        used_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS portal_sessions (
        id SERIAL PRIMARY KEY,
        license_id INTEGER NOT NULL,
        session_hash TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        revoked_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS portal_download_tokens (
        id SERIAL PRIMARY KEY,
        license_id INTEGER NOT NULL,
        artifact_id INTEGER NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        used_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE,
        FOREIGN KEY (artifact_id) REFERENCES artifacts(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS webhook_events (
        id SERIAL PRIMARY KEY,
        provider TEXT NOT NULL,
        provider_event_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        UNIQUE(provider, provider_event_id)
      );

      CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);
      CREATE INDEX IF NOT EXISTS idx_licenses_stripe_sub ON licenses(stripe_subscription_id);
      CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
      CREATE INDEX IF NOT EXISTS idx_instances_license ON license_instances(license_id);
      CREATE INDEX IF NOT EXISTS idx_logs_license ON license_logs(license_key);
      CREATE INDEX IF NOT EXISTS idx_orders_event ON orders(provider_event_id);
      CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
      CREATE INDEX IF NOT EXISTS idx_artifacts_active ON artifacts(is_active, published_at DESC);
      CREATE INDEX IF NOT EXISTS idx_download_events_license ON download_events(license_id);
      CREATE INDEX IF NOT EXISTS idx_magic_links_hash ON portal_magic_links(token_hash);
      CREATE INDEX IF NOT EXISTS idx_magic_links_exp ON portal_magic_links(expires_at);
      CREATE INDEX IF NOT EXISTS idx_portal_sessions_hash ON portal_sessions(session_hash);
      CREATE INDEX IF NOT EXISTS idx_download_tokens_hash ON portal_download_tokens(token_hash);
      CREATE INDEX IF NOT EXISTS idx_download_tokens_exp ON portal_download_tokens(expires_at);
    `)

    console.log('[DB] Tables initialized successfully')
  } catch (error: any) {
    console.error('[DB] Failed to initialize tables:', error)
    throw error
  }
}
