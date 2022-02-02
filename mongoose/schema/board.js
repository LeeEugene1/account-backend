//게시판 카테고리
const mongoose = require('mongoose')
const Board = new mongoose.Schema({
    title:{type:String, required:true},
    slug:{type:String, required:true, unique:true},//url중
    createdAt:{type:Date,default:Date.now,required:true},
    
    //동적으로 변동될 수 있는 데이터

    //옵션: 사용자가 게시글에 추가할 수 있는 데이터
});

module.exports = Board;