const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Article, Comment } = require("../mongoose/model");

//댓글생성
router.post("/comment/create", async (req, res) => {
  const { author, article, content } = req.body;
  //   const { article, content } = req.body;

  //   //author을 jwt인증
  //   const { authorization } = req.header;
  //   if (!authorization) {
  //     return res.send({
  //       error: true,
  //       msg: "there is no token",
  //     });
  //   }

  //   const token = authorization.split(" ")[1];
  //   const secret = req.app.get("jwt-secret");

  //   jwt.verify(token, secret, async (err, data) => {
  //     if (err) res.send(err);
  //     const newComment = await Comment({
  //       author: data.id,
  //       article,
  //       content,
  //     }).save();
  //     res.save(newComment._id ? true : false);
  //   });
  const newComment = await Comment({
    author,
    article,
    content,
  }).save();
  //comment count++
  await Article.findOneAndUpdate(
    {
      _id: article,
    },
    {
      $inc: { commentCount: 1 }, //increment의 약자
    }
  );
  res.send(newComment._id ? true : false);
});

//댓글 수정
router.patch("/comment/update", async (req, res) => {
  const { id, author, content } = req.body;
  const filter = { _id: id, author };
  const update = { content };
  const updateComment = await Comment.findOneAndUpdate(filter, update, {
    new: true, //update가 적용된걸 받음(공식문서참조)
  });
  console.log(updateComment);
  res.send(updateComment);
});

//댓글 삭제
router.delete("/comment/delete", async (req, res) => {
  const { id, author } = req.body;
  const deleteComment = await Comment.deleteOne({
    _id: id,
    author,
  });
  res.send(deleteComment);
});

router.delete("/comment/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const deleteComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, //30일 후
    }
  );
  res.send(deleteComment);
});

module.exports = router;
