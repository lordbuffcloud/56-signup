import pool from '../config/db.js';

export class BoardApplication {
  static async create({ userId, position, boardMonth, boardYear }) {
    const query = `
      INSERT INTO board_applications (user_id, position, board_month, board_year)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const values = [userId, position, boardMonth, boardYear];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE board_applications
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    
    const values = [status, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByMonth(month, year) {
    const query = `
      SELECT ba.*, u.first_name, u.last_name, u.email, u.squadron
      FROM board_applications ba
      JOIN users u ON ba.user_id = u.id
      WHERE ba.board_month = $1 AND ba.board_year = $2
    `;
    
    const { rows } = await pool.query(query, [month, year]);
    return rows;
  }
}