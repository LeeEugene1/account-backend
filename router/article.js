const express = require('express')
const router = express.Router()
const {Article, Comment} = require('../mongoose/model')

//개별 개시글을 가져오는 라우트
router.get('/article/:id', async (req, res) =>{
    const {id} = req.params
    const article = await Article.findById(id)
    const comment = await Comment.find({article:id})
    res.send({article, comment})
})

//게시판추가
router.post('/article/create', async (req, res)=>{
    const {auther,title,content,board} = req.body
    const newArticle = await Article({auther,title,content,board}).save()
    res.send(newArticle)
})

//게시글 수정
router.patch('/article/update', async(req,res)=>{
    const {id, auther, content} = req.body
    const filter = {_id:id, auther}
    const update = {content}
    const updateArticle = await Comment.findOneAndUpdate(filter,update,{
        new:true//update가 적용된걸 받음(공식문서참조)
    })
    // console.log(updateArticle)
    res.send(updateArticle)
})

//게시글 삭제
router.delete('/article/delete',async(req,res)=>{
    const{id, auther} = req.body
    const deleteArticle = await Article.deleteOne({
        _id:id,
        auther
    })
    res.send(deleteArticle)
})

router.delete('/article/delete/soft',async(req,res)=>{
    const{id, auther} = req.body
    const deleteArticle = await Article.findOneAndUpdate({
        _id:id,
        auther
    },{
        deleteTime:new Date().getTime() + 30 * 24 * 60 * 60 * 1000//30일 후
    })
    res.send(deleteArticle)
})

module.exports = router