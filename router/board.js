const express = require('express')
const router = express.Router()
const {Article, Board} = require('../mongoose/model')

//게시판별 게시글을 가져오는 라우트
router.get('/board/:slug', async (req, res) =>{
    const {slug} = req.params
    // const {lastIndex} = req.query //무한 스크롤 구현시 사용할 부분
    const board = await Board.findOne({slug})
    // const board = await Board.findAll()

    console.log(board)
    if(!board._id){
        return res.send({
            article:[],
            error:true,
            msg:'there is no board'
        })
    }
    const article = await Article.find({board:board._id})
    res.send({article, error:false, msg:'success'})
})
//관리자:게시판추가
router.post('/board/create',async(req,res)=>{
    const{title, slug} = req.body
    const newBoard = await Board({
        title, slug
    }).save()
    res.send(newBoard._id ? true : false)
})

module.exports = router