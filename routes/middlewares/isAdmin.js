const isAdminMiddleware = (req, res, next) => {
    try {
        if (!req.user) {
            res.redirect('/passport/sign-in')
            return
        }

        if (!req.user.isAdmin) {
            res.redirect('/')
            return
        }

        next()
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

module.exports = isAdminMiddleware
