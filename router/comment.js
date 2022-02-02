const express = require('express')
const router = express.Router()
const {Comment} = require('../mongoose/model')

//댓글생성
router.post('/comment/create',async(req,res)=>{
    const{auther, article, content} = req.body
    const newComment = await Comment({
        auther,article, content
    }).save()
    res.send(newComment._id ? true : false)
})

//댓글 수정
router.patch('/comment/update', async(req,res)=>{
    const {id, auther, content} = req.body
    const filter = {_id:id, auther}
    const update = {content}
    const updateComment = await Comment.findOneAndUpdate(filter,update,{
        new:true//update가 적용된걸 받음(공식문서참조)
    })
    console.log(updateComment)
    res.send(updateComment)
})

//댓글 삭제
router.delete('/comment/delete',async(req,res)=>{
    const{id, auther} = req.body
    const deleteComment = await Comment.deleteOne({
        _id:id,
        auther
    })
    res.send(deleteComment)
})

router.delete('/comment/delete/soft',async(req,res)=>{
    const{id, auther} = req.body
    const deleteComment = await Comment.findOneAndUpdate({
        _id:id,
        auther
    },{
        deleteTime:new Date().getTime() + 30 * 24 * 60 * 60 * 1000//30일 후
    })
    res.send(deleteComment)
})

module.exports = router