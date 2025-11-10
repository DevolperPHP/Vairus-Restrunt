const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User')

router.get('/sign-in', async (req, res) => {
    try {
        if (req.session.userId) {
            res.redirect("/")
        } else {
            res.render('passport/sign-in', {
                err: req.flash('error'),
            })
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await User.findOne({ email: email})

        if(userData) {
            const compare = await bcrypt.compare(password, userData.password)

            if(compare){
                req.session.userId = userData.id
                res.redirect("/")
            } else {
                req.flash('error', 'بيانات الدخول غير صحيحة')
                res.redirect('/passport/sign-in')
            }
        } else {
            req.flash('error', 'بيانات الدخول غير صحيحة')
            res.redirect('/passport/sign-in')
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/sign-out', async (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/passport/sign-in")
    } catch (err) {
        console.log(err);
    }
})
module.exports = router