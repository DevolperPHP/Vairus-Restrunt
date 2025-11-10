const express = require('express')
const app = express()
const db = require('./config/db')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')

let PORT = 3000;

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use(session({
    secret: 'your-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 4 * 30 * 24 * 60 * 60 * 1000 }
}))

app.use(flash())

app.use(express.static("public"))

app.use(async (req, res, next) => {
    if (req.session.userId) {
        const User = require('./models/User')
        try {
            const user = await User.findOne({ _id: req.session.userId })
            req.user = user
            res.locals.user = user
        } catch (err) {
            res.locals.user = null
        }
    } else {
        res.locals.user = null
    }
    next()
})

app.use('/', require('./routes/index'))
app.use('/passport', require('./routes/auth/passport'))

app.use((req, res) => {
    res.status(404).send('الصفحة غير موجودة')
})

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server is running on port : ${PORT}`);

})