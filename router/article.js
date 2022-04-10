const express = require("express");
const router = express.Router();
const { Reply, Article, Comment } = require("../mongoose/model");

//개별 개시글을 가져오는 라우트
router.get("/article/:key", async (req, res) => {
  const { key } = req.params;
  const article = await Article.findOne({ _id: key })
    .populate("author")
    .populate("board");
  const commentList = await Comment.find({ article: article._id }).populate(
    "author"
  );
  Promise.all(
    commentList.map(async (each) => {
      const replies = await Reply.find({ comment: each._doc._id }).populate(
        "author"
      );
      return {
        ...each._doc,
        replies: replies,
      };
    })
  )
    .then((comment) => {
      res.send({
        article,
        comment,
      });
    })
    .catch(() => {});

  //   const comment = commentList.map(async (v) => {
  //     const replies = await Reply.find({ comment: comment._id }).populate(
  //       "author"
  //     );
  //     console.log(v);
  //     return {
  //       ...v,
  //       replies: replies, //대댓글 배열
  //     };
  //   });
});

//게시판추가
router.post("/article/create", async (req, res) => {
  const { author, title, content, board } = req.body;
  const newArticle = await Article({ author, title, content, board }).save();
  res.send(newArticle);
});

//게시글 수정
router.patch("/article/update", async (req, res) => {
  const { id, author, title, content } = req.body;
  const filter = { _id: id, author };
  const update = { content, title };
  const updateArticle = await Article.findOneAndUpdate(filter, update, {
    new: true, //update가 적용된걸 받음(공식문서참조)
  });
  // console.log(updateArticle)
  res.send(updateArticle);
});

//게시글 삭제
router.delete("/article/delete", async (req, res) => {
  const { id, author } = req.body;
  const deleteArticle = await Article.deleteOne({
    _id: id,
    author,
  });
  res.send(deleteArticle);
});

router.delete("/article/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const deleteArticle = await comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, //30일 후
    }
  );
  res.send(deleteArticle);
});

module.exports = router;
