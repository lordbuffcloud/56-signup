import pool from '../config/db.js';

export class User {
  static async create({ firstName, lastName, email, squadron }) {
    const query = `
      INSERT INTO users (first_name, last_name, email, squadron)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const values = [firstName, lastName, email, squadron];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
}