const router = require('express').Router();
const isAuth = require('../middleware/isAuth');
const { userController : controller } = require('../controllers/Controller');
const isRefresh = require('../middleware/isRefresh');

router.post('/join', controller.UserJoin);
router.post('/login', controller.UserLogin);
router.post('/auth', isAuth, controller.AuthTest);
router.post('/refresh', isRefresh);

module.exports = router;