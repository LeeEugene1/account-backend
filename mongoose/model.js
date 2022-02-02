const mongoose = require('mongoose')
const schema = require('./schema')
const config = require('dotenv').config()

const db = mongoose.connection
const model = (()=>{
    db.on("error", console.error)
    db.on("open",()=>{
        console.log('Connecting mongodb!')
    })

    //Atlas mongodb cluster와 연결
    mongoose.connect(
        `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster0.feldq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        ,{useNewUrlParser:true, useUnifiedTopology:true}
        )
    //DOTENV 테스트
    // console.log(process.env.DB_ID)
    
    //스키마 연결
    const model = {};
    for(let key in schema){
        model[key] = mongoose.model(key, schema[key])
    }

    return model
})();

module.exports = model