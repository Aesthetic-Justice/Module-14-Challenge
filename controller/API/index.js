const router = require(`express`).Router();

const userRoutes = require(`./user-routes`);
const blostPostRoutes = require(`./post-routes`);

router.use(`/users`, userRoutes);
router.use(`/posts`, blostPostRoutes);

module.exports = router;