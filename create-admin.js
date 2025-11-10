const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/User')

const URI = "mongodb://127.0.0.1:27017/varius"

mongoose.set('strictQuery', false);

mongoose.connect(URI)
.then(async () => {
    console.log("Database connected");

    try {
        const adminEmail = "admin@vairus.com"
        const adminPassword = "admin123"
        const adminName = "مدير النظام"

        const existingAdmin = await User.findOne({ email: adminEmail })

        if (existingAdmin) {
            console.log("Admin user already exists!")
        } else {
            const hashedPassword = await bcrypt.hash(adminPassword, 10)

            const newAdmin = new User({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true
            })

            await newAdmin.save()
            console.log("✅ Admin user created successfully!")
            console.log(`Email: ${adminEmail}`)
            console.log(`Password: ${adminPassword}`)
        }

        process.exit(0)
    } catch (err) {
        console.error("Error:", err)
        process.exit(1)
    }
})
.catch((err) => {
    console.log(err);
    process.exit(1)
})
