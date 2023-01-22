const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');

router.get(`/all`, async (req, res) => {
    try {
        const dbBlogPosts = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: [`id`, `name`]
                }
            ]
        });

        const allBlogPosts = dbBlogPosts.map((blogPosts) => blogPosts.get({ plain: true }));

        res.status(200).json(allBlogPosts);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.post(`/post`, async (req, res) => {
    try{
        const dbBlogPostData = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            creator_id: req.session.userID,
            date: req.body.date
        });
        res.status(200).json(dbBlogPostData);
    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

router.post(`/postComment`, async (req, res) => {
    try{
        const dbCommentData = await Comment.create({
            content: req.body.content,
            creator_id: req.session.userID,
            parent_id: req.body.parent_id,
            date: req.body.date
        });
        res.status(200).json(dbCommentData);
    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = router;