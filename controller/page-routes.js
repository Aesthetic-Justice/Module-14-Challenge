const router = require(`express`).Router();
const sequelize = require(`../config/connection`);
const { User, BlogPost, Comment } = require(`../models`);

router.get(`/`, async (req, res) => {
    try {
        const dbBlogPosts = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: [`id`, `name`]
                }
            ],
        });

        const allBlogPosts = dbBlogPosts.map((blogPosts) => blogPosts.get({ plain: true }));

        res.render(`landing`, {
            loggedIn: req.session.loggedIn,
            allBlogPosts
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get(`/dashboard`, async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const dbBlogPosts = await BlogPost.findAll({
                include: [
                    {
                        model: User,
                        attributes: [`id`, `name`]
                    }
                ],
                where: {
                    creator_id: req.session.userID
                }
            });

            let allBlogPosts = [];

            if (dbBlogPosts) {
                allBlogPosts = dbBlogPosts.map((blogPosts) => blogPosts.get({ plain: true }));
            };

            res.render(`dashboard`, {
                loggedIn: req.session.loggedIn,
                allBlogPosts
            });
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.render(`dashboard`, {
            loggedIn: req.session.loggedIn,
            allBlogPosts: []
        })
    }
})

router.get(`/dashboard/:id`, async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const dbBlogPosts = await BlogPost.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: [`id`, `name`]
                    }
                ]
            });

            const allBlogPosts = dbBlogPosts.get({ plain: true });

            console.log(allBlogPosts);

            const dbComments = await Comment.findAll({
                include: [
                    {
                        model: User,
                        attributes: [`id`, `name`]
                    }
                ],
                where: {
                    parent_id: req.params.id
                }
            })

            let allComments = [];

            if (allComments) { allComments = dbComments.map((comments) => comments.get({ plain: true })) };

            console.log(allComments);

            res.render(`post`, {
                loggedIn: req.session.loggedIn,
                allBlogPosts,
                allComments
            });
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.redirect(`/login`);
        return;
    }
})

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn === true) {
        res.redirect('/');
        return;
    }

    res.render('login', {
        loggedIn: false
    });
});

module.exports = router;