const User = require('../../models/User')

const isLogginMiddleWare = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            res.redirect('/passport/sign-in')
            return
        }

        const user = await User.findOne({ _id: req.session.userId })

        if (!user) {
            res.redirect('/passport/sign-in')
            return
        }

        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.redirect('/passport/sign-in')
    }
}

module.exports = isLogginMiddleWare
