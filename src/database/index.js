const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const Tarefa = require('../model/Tarefa');

const connection = new Sequelize(dbconfig);

Tarefa.init(connection);




module.exports = connection;