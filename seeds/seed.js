const sequelize = require("../config/connection")
const { BlogPost, User, Comment } = require(`../models`);

const seedUser = require(`./seedUser.json`);
const seedBlogPost = require(`./seedBlogPost.json`);
const seedComment = require(`./seedComment.json`);

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const newUsers = await User.bulkCreate(seedUser, {
        individualHooks: true,
        returning: true
    });

    const newPosts = await BlogPost.bulkCreate(seedBlogPost,{
        individualHooks: true,
        returning: true
    });

    const newComments = await Comment.bulkCreate(seedComment,{
        individualHooks: true,
        returning: true
    });

    process.exit(0);
}

seedDatabase();