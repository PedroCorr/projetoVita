const { Model, DataTypes } = require('sequelize')

class Tarefa extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            state: DataTypes.BOOLEAN
        }, {
            sequelize: connection
        })
    }   
}

module.exports = Tarefa;