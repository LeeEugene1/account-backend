const express = require('express')
const router = express.Router()
const {User} = require('../mongoose/model')
const jwt = require('jsonwebtoken')
const session = require('express-session')

//개별 개시글을 가져오는 라우트
router.post('/user/login', async (req, res) =>{
    const {email, password} = req.body
    const loginUser = await User.findOne({email:email})
    // console.log(loginUser)
    if(!loginUser){
        return res.send({
            error:true,
            msg:'there is no email address'
        })
    }
    const correctPassword = await loginUser.authenticate(password)
    if(!correctPassword){
        return res.send({
            error:true,
            msg:'password fail'
        })
    }

    // const token = jwt.sign({
    //     email:loginUser.email,
    //     nickname:loginUser.nickname
    // },process.env.SECRETCODE,{
    //     expiresIn:7,
    //     issuer:'khacker',
    //     subject:'auth',
    // })

    req.session.is_logined = true
    req.session.nickname = loginUser.nickname
    req.session.email = loginUser.email
    // console.log(req.session)
    // console.log(loginUser.email)
    
    res.send({
        //jwt
        // email:loginUser.email, 
        // nickname:loginUser.nickname,
        // token:token,
        // is_logined:true,

        //세션
        is_logined:req.session.is_logined,
        nickname:req.session.nickname,
        email:req.session.email,
        
        error:false, 
        msg:'login success',
    })
})

// add user
router.post('/user/create', async (req,res)=>{
    const{nickname, email, password} = req.body
    const newUser = await User({
        email,nickname,password
    }).save()

    console.log(newUser)
    res.send(newUser._id ? true : false)
})

//사용자정보변경
//사용자삭제
//프로필이미지추가

module.exports = router