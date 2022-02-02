const express = require('express')
const router = express.Router()
const {Reply} = require('../mongoose/model')

//대댓글생성
router.post('/reply/create',async(req,res)=>{
    const{auther, comment, content} = req.body
    const newReply = await Reply({
        auther,comment, content
    }).save()
    res.send(newReply._id ? true : false)
})

//대댓글 수정
router.patch('/reply/update', async(req,res)=>{
    const {id, auther, content} = req.body
    const filter = {_id:id, auther}
    const update = {content}
    const updateReply = await Reply.findOneAndUpdate(filter,update,{
        new:true//update가 적용된걸 받음(공식문서참조)
    })
    res.send(updateReply)
})

//대댓글 삭제(hard delete)
router.delete('/reply/delete',async(req,res)=>{
    const{id, auther} = req.body
    const deleteReply = await Reply.deleteOne({
        _id:id,
        auther
    })
    res.send(deleteReply)
})

// soft delete:일반 사용자는 안보임, 일정시간이 지나면 삭제
//deleteTime 초기값이 0이므로 0이 아닌경우만 출력하면됨
router.delete('/reply/delete/soft',async(req,res)=>{
    const{id, auther} = req.body
    const deleteReply = await Reply.findOneAndUpdate({
        _id:id,
        auther
    },{
        deleteTime:new Date().getTime() + 30 * 24 * 60 * 60 * 1000//30일 후
    })
    res.send(deleteReply)
})

module.exports = router