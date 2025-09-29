const Database = require("better-sqlite3");
const db = new Database(":memory:");

db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    hotel_id INTEGER,
    checkin_date TEXT,
    checkout_date TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
  );
`);

db.prepare("INSERT INTO users (name) VALUES (?)").run("Alisson");
db.prepare("INSERT INTO users (name) VALUES (?)").run("Gabi");

db.prepare("INSERT INTO hotels (name) VALUES (?)").run("Hotel Lodgify");
db.prepare("INSERT INTO hotels (name) VALUES (?)").run("Yellow Ocean Hotel");

db.prepare("INSERT INTO reservations (user_id, hotel_id, checkin_date, checkout_date) VALUES (?, ?, ?, ?)").run(1, 1, "2025-10-01", "2025-10-05");

db.prepare("INSERT INTO reservations (user_id, hotel_id, checkin_date, checkout_date) VALUES (?, ?, ?, ?)").run(2, 2, "2025-10-03", "2025-10-06");

module.exports = db;
