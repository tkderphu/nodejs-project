const {Router} = require('express')

const myController = require('../controller/myController')

const router = Router()

router.get('/hello-world', myController.hello_world)
router.get('/hello-friend', myController.hello_friend)

module.exports = router