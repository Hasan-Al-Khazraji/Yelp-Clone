const { Pool } = require('pg'); // only taking pool logic (destructuring)
 
const pool = new Pool(); // create new pool, pool automatically knows to take from .env
 
module.exports = {
    query: (text, params) => pool.query(text, params),
};