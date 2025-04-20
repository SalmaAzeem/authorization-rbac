const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const db = new Low(new JSONFile('db.json'));

async function initDB() {
    await db.read();
    db.data ||= { refresh_tokens: []};
    await db.write();
}

module.exports = {db, initDB };

// https://www.npmjs.com/package/lowdb