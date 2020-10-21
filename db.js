const Sequelize = require('sequelize');

const database = new Sequelize(process.env.NAME,
'postgres', process.env.PASS, {
        host: 'localhost',
        dialect: 'postgres'
});

database.authenticate()
    .then(() => console.log('postgress db is connected'))
    .then(err => console.log(err));

module.exports = database;