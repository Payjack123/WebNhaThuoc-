'use server';
import pool from '@/lib/db';

export async function getDepartments() {
  try {
    // Truy vấn dữ liệu từ TiDB
    const [rows] = await pool.query('SELECT * FROM departments ORDER BY department_id ASC');
    
    // Trả về dữ liệu
    return rows;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khoa phòng:", error);
    throw new Error("Không thể kết nối đến cơ sở dữ liệu.");
  }
}