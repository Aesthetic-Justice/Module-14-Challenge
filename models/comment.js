const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: `Sample Text`
        },
        creator_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: `user`,
                key: `id`
            }
        },
        parent_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: `blogPost`,
                key:`id`
            }
        },
        date:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: `comment`
    }
)

module.exports = Comment;