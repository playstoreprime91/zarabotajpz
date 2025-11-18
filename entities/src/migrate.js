const fs = require('fs');
const path = require('path');
const { db } = require('./db');


const sql = fs.readFileSync(path.join(__dirname, '..', 'migrations', '001_create_entities_table.sql'), 'utf8');


db.exec(sql, (err) => {
if (err) {
console.error('Migration failed:', err);
process.exit(1);
}
console.log('Migration applied.');
process.exit(0);
});
