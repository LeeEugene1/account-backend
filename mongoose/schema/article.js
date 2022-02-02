const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Article = new mongoose.Schema({
    auther:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    title:{type:String, required:true},
    content:{type:String, required:true},
    board:{type:mongoose.Schema.Types.ObjectId, ref:'Board', required:true},
    createdAt:{type:Date,default:Date.now,required:true},
    
    //동적으로 변동될 수 있는 데이터
    viewCount:{type:Number, default:0},
    thumbupCount:{type:Number, default:0},
    commentCount:{type:Number, default:0},
    deleteTime:{type:Number, default:0},

    //옵션: 사용자가 게시글에 추가할 수 있는 데이터
    articleImgAddress:{type:String},
    mention:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
});

Article.plugin(AutoIncrement, {inc_field:'key'})//id는 1,2,3,4..

module.exports = Article;