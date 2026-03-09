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

    CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);
    CREATE INDEX IF NOT EXISTS idx_licenses_stripe_sub ON licenses(stripe_subscription_id);
    CREATE INDEX IF NOT EXISTS idx_instances_license ON license_instances(license_id);
    CREATE INDEX IF NOT EXISTS idx_logs_license ON license_logs(license_key);
  `)
}
