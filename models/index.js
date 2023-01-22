const User = require(`./user`);
const BlogPost = require(`./blogPost`);
const Comment = require(`./comment`);

User.hasMany(BlogPost, {
    foreignKey: `creator_id`,
    onDelete: `CASCADE`
});

BlogPost.belongsTo(User, {
    foreignKey: `creator_id`
});

User.hasMany(Comment,{
    foreignKey: `creator_id`,
    onDelete: `CASCADE`
});

Comment.belongsTo(User, {
    foreignKey: `creator_id`,
})

BlogPost.hasMany(Comment, {
    foreignKey: `parent_id`,
    onDelete: `CASCADE`
})

Comment.belongsTo(BlogPost, {
    foreignKey: `parent_id`
})

module.exports = { User, BlogPost, Comment };