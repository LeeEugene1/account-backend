// const mongoose = require('mongoose')
// const Company = new mongoose.Schema({
//     title:{
//         type:String, required:true, unique:true
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now,
//         required:true
//     },
//     imgAddress:{
//         type:String, default:null
//     },
//     reviewScore:{
//         type:Number, default:3, required:true
//     },
//     realtimeScore:{}
//     //불편인것들과 자주변동되는 데이터(reviewScore,realtimeScore)는 파일을 분리하는것이 좋음
// });

// module.exports = Company;