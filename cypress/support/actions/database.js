const db = require("../db/setup");

module.exports = {
  insertUser: name => {
    return db.prepare("INSERT INTO users (name) VALUES (?)").run(name);
  },
  getUsers: () => {
    return db.prepare("SELECT * FROM users").all();
  },
  deleteAllUsers: () => {
    return db.prepare("DELETE FROM users").run();
  },
  getReservationsByUser: name => {
    return db
      .prepare(
        `
        SELECT 
          r.id AS reservation_id,
          u.name AS user_name,
          h.name AS hotel_name,
          r.checkin_date,
          r.checkout_date
        FROM reservations r
        JOIN users u ON r.user_id = u.id
        JOIN hotels h ON r.hotel_id = h.id
        WHERE u.name = ?
      `
      )
      .all(name);
  },
};
