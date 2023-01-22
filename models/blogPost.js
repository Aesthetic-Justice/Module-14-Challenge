const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class BlogPost extends Model { }

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: `blogPost`
    }
)

module.exports = BlogPost;