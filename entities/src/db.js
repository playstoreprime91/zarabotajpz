const path = require('path');
const sqlite3 = require('sqlite3');
const DB_PATH = process.env.ENT_DB_PATH || path.join(__dirname, '..', 'data', 'entities.db');
const fs = require('fs');


// ensure folder
const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });


const db = new sqlite3.Database(DB_PATH);


function run(sql, params = []) {
return new Promise((resolve, reject) => {
db.run(sql, params, function (err) {
if (err) return reject(err);
resolve(this);
});
});
}


function all(sql, params = []) {
return new Promise((resolve, reject) => {
db.all(sql, params, (err, rows) => {
if (err) return reject(err);
resolve(rows);
});
});
}


function get(sql, params = []) {
return new Promise((resolve, reject) => {
db.get(sql, params, (err, row) => {
if (err) return reject(err);
resolve(row);
});
});
}


module.exports = { db, run, all, get, DB_PATH };
