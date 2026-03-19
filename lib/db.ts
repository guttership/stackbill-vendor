import Database from 'better-sqlite3'
import path from 'path'

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'data', 'stackbill.db')
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initTables(db)
  }
  return db
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS licenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_key TEXT NOT NULL UNIQUE,
      plan TEXT NOT NULL DEFAULT 'standard',
      max_instances INTEGER NOT NULL DEFAULT 2,
      status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'expired', 'cancelled')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS license_instances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_id INTEGER NOT NULL,
      instance_id TEXT NOT NULL,
      domain TEXT,
      first_seen_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_seen_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE,
      UNIQUE(license_id, instance_id)
    );

    CREATE TABLE IF NOT EXISTS license_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_key TEXT,
      event TEXT NOT NULL,
      details TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL CHECK(provider IN ('stripe', 'paddle')),
      provider_event_id TEXT UNIQUE,
      provider_checkout_id TEXT,
      email TEXT NOT NULL,
      amount_cents INTEGER NOT NULL,
      currency TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS artifacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('source', 'docker')),
      filename TEXT NOT NULL,
      storage_key TEXT NOT NULL,
      sha256 TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      published_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS download_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_id INTEGER NOT NULL,
      artifact_id INTEGER NOT NULL,
      ip TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE,
      FOREIGN KEY (artifact_id) REFERENCES artifacts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS portal_magic_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_id INTEGER NOT NULL,
      email TEXT NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS portal_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_id INTEGER NOT NULL,
      session_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      revoked_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS portal_download_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      license_id INTEGER NOT NULL,
      artifact_id INTEGER NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (license_id) REFERENCES licenses(id) ON DELETE CASCADE,
      FOREIGN KEY (artifact_id) REFERENCES artifacts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS webhook_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT NOT NULL,
      provider_event_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
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

  ensureColumn(db, 'licenses', 'email', 'TEXT')
  ensureColumn(db, 'licenses', 'tier', "TEXT NOT NULL DEFAULT 'core'")
}

function ensureColumn(db: Database.Database, table: string, column: string, definition: string) {
  const result = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>
  const hasColumn = result.some((item) => item.name === column)
  if (!hasColumn) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`)
  }
}
