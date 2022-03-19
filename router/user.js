const express = require("express");
const router = express.Router();
const { User } = require("../mongoose/model");
const jwt = require("jsonwebtoken");
const session = require("express-session");

//로그인
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email: email });
  if (!loginUser) {
    return res.send({
      status: 404,
      error: true,
      msg: "there is no email address",
    });
  }
  const correctPassword = await loginUser.authenticate(password);
  if (!correctPassword) {
    return res.send({
      status: 404,
      error: true,
      msg: "password fail",
    });
  }

  // const token = jwt.sign({
  //     email:loginUser.email,
  //     nickname:loginUser.nickname
  // },process.env.SECRETCODE,{
  //     expiresIn:7,
  //     issuer:'khacker',
  //     subject:'auth',
  // })
  req.session._id = loginUser._id;
  req.session.is_logined = true;
  req.session.nickname = loginUser.nickname;
  req.session.email = loginUser.email;
  // console.log(req.session)
  // console.log(loginUser.email)

  res.send({
    //jwt
    // email:loginUser.email,
    // nickname:loginUser.nickname,
    // token:token,
    // is_logined:true,

    //세션
    id: req.session._id,
    is_logined: req.session.is_logined,
    nickname: req.session.nickname,
    email: req.session.email,
    status: 200,
    error: false,
    msg: "login success",
  });
});

// add user
router.post("/user/create", async (req, res) => {
  const { nickname, email, password } = req.body;
  // const loginUser = await User.findOne({email:email})

  const newUser = await User.findOneAndUpdate({
    email,
    nickname,
    password,
  }).save();

  console.log(newUser);
  // res.send(newUser._id ? true : false)
  if (!newUser._id) {
    return res.send({
      status: 404,
      error: true,
      msg: "there is no email",
    });
  }
  res.send({
    status: 200,
    error: false,
    msg: "user created",
  });
});

router.get("/user/:id", async (req, res) => {
  //   let ObjectId = require("mongodb").ObjectID;
  const id = req.params.id;
  const userInfo = await User.find({ _id: id });
  res.send({
    userInfo,
  });
});

//사용자정보변경
router.put("/user/update", async (req, res) => {
  const { nickname, email, password } = req.body;
  const newUser = await User({
    email,
    nickname,
    password,
  }).save();

  console.log(newUser);
  // res.send(newUser._id ? true : false)
  if (!newUser._id) {
    return res.send({
      status: 404,
      error: true,
      msg: "user id is not created",
    });
  }
  res.send({
    status: 200,
    error: false,
    msg: "user updated",
  });
});

//사용자삭제(숨기기)
//프로필이미지추가

module.exports = router;
