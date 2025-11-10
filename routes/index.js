const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const Category = require('../models/Category')
const isLogginMiddleWare = require('./middlewares/isUser')
const isAdminMiddleware = require('./middlewares/isAdmin')
const upload = require('../config/multer')

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ date_sort: 1 })
        const items = await Item.find()

        res.render('home', {
            categories: categories,
            items: items,
            user: req.user || null
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في الخادم')
    }
})

router.get('/item/:id', async (req, res) => {
    try {
        const { id } = req.params
        const item = await Item.findById(id)
        const categories = await Category.find().sort({ date_sort: 1 })

        if (!item) {
            return res.status(404).send('المنتج غير موجود')
        }

        const category = categories.find(c => c._id.toString() === item.category.toString())

        res.render('item-detail', {
            item: item,
            category: category,
            user: req.user || null
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في الخادم')
    }
})

router.get('/admin', isLogginMiddleWare, isAdminMiddleware, async (req, res) => {
    try {
        const categories = await Category.find().sort({ date_sort: 1 })
        const items = await Item.find()

        res.render('admin/dashboard', {
            user: req.user,
            categories: categories,
            items: items
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في الخادم')
    }
})

router.get('/admin/items', isLogginMiddleWare, isAdminMiddleware, async (req, res) => {
    try {
        const categories = await Category.find().sort({ date_sort: 1 })
        const items = await Item.find()

        res.render('admin/items', {
            user: req.user,
            categories: categories,
            items: items
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في الخادم')
    }
})

router.get('/admin/items/edit/:id', isLogginMiddleWare, isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const categories = await Category.find().sort({ date_sort: 1 })
        const item = await Item.findById(id)

        if (!item) {
            return res.status(404).send('المنتج غير موجود')
        }

        res.render('admin/edit-item', {
            user: req.user,
            categories: categories,
            item: item
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في الخادم')
    }
})

router.post('/category/add', isLogginMiddleWare, isAdminMiddleware, async (req, res) => {
    try {
        const { name } = req.body

        const existingCategory = await Category.findOne({ name: name })

        if (existingCategory) {
            return res.status(400).send('الفئة موجودة مسبقاً')
        }

        const newCategory = new Category({
            name: name
        })

        await newCategory.save()
        res.redirect('/admin')
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في إضافة الفئة')
    }
})

router.post('/category/edit/:id', isLogginMiddleWare, isAdminMiddleware, async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params

        await Category.findByIdAndUpdate(id, { name: name })
        res.redirect('/admin')
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في تعديل الفئة')
    }
})

router.post('/category/delete/:id', isLogginMiddleWare, isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        await Category.findByIdAndDelete(id)
        await Item.deleteMany({ category: id })
        res.redirect('/admin')
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في حذف الفئة')
    }
})

router.post('/item/add', isLogginMiddleWare, isAdminMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { name, des, price, category } = req.body

        console.log('Request body:', req.body);
        console.log('File:', req.file);

        let imagePath = 'noImage.png';
        if (req.file) {
            imagePath = '/upload/images/' + req.file.filename;
            console.log('Image saved as:', imagePath);
        } else {
            console.log('No image file uploaded');
        }

        const newItem = new Item({
            name: name,
            des: des,
            price: price,
            category: category,
            image: imagePath
        })

        await newItem.save()
        console.log('Item saved successfully');
        res.redirect('/admin/items')
    } catch (err) {
        console.error('Error adding item:', err)
        res.status(500).send('خطأ في إضافة المنتج: ' + err.message)
    }
})

router.post('/item/edit/:id', isLogginMiddleWare, isAdminMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        const { name, des, price, category } = req.body

        const updateData = {
            name: name,
            des: des,
            price: price,
            category: category
        }

        if (req.file) {
            updateData.image = '/upload/images/' + req.file.filename;
        }

        await Item.findByIdAndUpdate(id, updateData)

        res.redirect('/admin/items')
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في تعديل المنتج: ' + err.message)
    }
})

router.post('/item/delete/:id', isLogginMiddleWare, isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        await Item.findByIdAndDelete(id)
        res.redirect('/admin/items')
    } catch (err) {
        console.log(err)
        res.status(500).send('خطأ في حذف المنتج')
    }
})

module.exports = router
