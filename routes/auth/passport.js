const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const moment = require('moment');
const isLogginMiddleWare = require('../middlewares/isUser');

router.get('/sign-up', async (req, res) => {
    try {
        const id = req.cookies.id
        const user = await User.findOne({ _id: id })
        if (user) {
            res.redirect('/')
        } else {
            res.render('passport/sign-up', {
                err: req.flash('error'),
                user: user,
            })
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/sign-up', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const filter = await User.findOne({ email: email })
        if (filter) {
            req.flash('error', 'email unique')
            res.redirect("/passport/sign-in")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = [
                new User({
                    name: name,
                    email: email,
                    password: hashedPassword,
                })
            ]

            newUser.forEach(user => {
                user.save()
            })
            req.flash('success', 'success')
            res.redirect("/passport/sign-in")
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/sign-in', async (req, res) => {
    try {
        const id = req.cookies.id
        const user = await User.findOne({ _id: id })

        if (user) {
            res.redirect("/")
        } else {
            res.render('passport/sign-in', {
                user: user,
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
                res.cookie("id", userData.id, { maxAge: moment().add(4, "months") })
                res.redirect("/")
            } else {
                req.flash('error', 'error')
                res.redirect('/passport/sign-in')
            }
        } else {
            req.flash('error', 'error')
            res.redirect('/passport/sign-in')
        }

    } catch (err) {
        console.log(err);
    }
})

router.post('/sign-out', isLogginMiddleWare, async (req, res) => {
    try {
        res.clearCookie("id")
        res.redirect("/passport/sign-in")
    } catch (err) {
        console.log(err);
    }
})
module.exports = router