import mysql from 'mysql2/promise';

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const pool = globalThis._mysqlPool || mysql.createPool({
  host: process.env.TIDB_HOST,
  port: Number(process.env.TIDB_PORT),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  // Cấu hình SSL bắt buộc cho TiDB Serverless Cloud
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
});

if (process.env.NODE_ENV !== 'production') {
  globalThis._mysqlPool = pool;
}

export default pool;