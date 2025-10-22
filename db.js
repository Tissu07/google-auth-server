const mongoose = require('mongoose')


const connect = async() => {
    try {
        await mongoose.connect()
    }
    catch (error) {

    }
}