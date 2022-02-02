//대댓글
const mongoose = require('mongoose')
const Reply = new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    comment:{type:mongoose.Schema.Types.ObjectId, ref:"Comment"},
    content:{type:String, required:true},
    createdAt:{type:Date,default:Date.now,required:true},
    
    //동적으로 변동될 수 있는 데이터
    thumbupCount:{type:Number, default:0},
    deleteTime:{type:Number, default:0},

    //옵션: 사용자가 게시글에 추가할 수 있는 데이터
    replyImgAddress:{type:String},
});

module.exports = Reply;