const router = require('express').Router()
module.exports = router

router.post('/login', async (req, res, next)=>{
    try {
        const user = {id: req.body.id, name: req.body.name, isAdmin: req.body.admin}
        req.login(user, err => (err ? next(err) : res.json(user)))
    } catch(err) {
        next(err)
    }
})


router.post('/signup', async (req, res, next) => {
    try {
        req.login(req.body, err => (err ? next(err) : res.json(user)))
    } catch(err) {
        next(err)
    }
})

router.post('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

router.get('/me', (req, res) => {
    res.json(req.user)
})

// router.use('/google', require('./google'))
// router.use('/facebook', require('./facebook'))