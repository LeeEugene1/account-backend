const express = require("express");
const router = express.Router();
const { Article, Board } = require("../mongoose/model");

//메인에서 여러 게시판의 게시글 리스트를 보여주는 라우트
router.get("/main", async (req, res) => {
  const board = await Board.find();
  console.log(board);
  if (!Array.isArray(board)) {
    res.send({
      error: true,
      msg: "게시판을 발견할 수 없음",
    });
  }
  let mainContent = [];
  Promise.all(
    board.map(async (b) => {
      const recentArticles = await Article.find({ board: b._id });
      //   return recentArticles;
      if (!Array.isArray(recentArticles)) {
        return false;
      }
      //   mainContent[b.slug] = recentArticles;
      mainContent.push({
        ...b._doc,
        content: recentArticles,
      });
    })
  )
    .then(() => {
      //   const content = Object.keys(mainContent).map((v) => {
      //     return {
      //       slug: v,
      //       content: mainContent[v],
      //     };
      //   }); //배열형태로 전달하기
      res.send({
        content: mainContent,
        error: false,
        msg: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        content: null,
        error: true,
        msg: "server error",
      });
    });
});

//게시판별 게시글을 가져오는 라우트
router.get("/board/:slug", async (req, res) => {
  const { slug } = req.params;
  // const {lastIndex} = req.query //무한 스크롤 구현시 사용할 부분
  const board = await Board.findOne({ slug });
  // const board = await Board.findAll()

  console.log(board);
  if (!board._id) {
    return res.send({
      article: [],
      error: true,
      msg: "there is no board",
    });
  }
  const article = await Article.find({ board: board._id }).populate("author");
  res.send({ article, error: false, msg: "success" });
});
//관리자:보드 추가
router.post("/board/create", async (req, res) => {
  const { title, slug } = req.body;
  const newBoard = await Board({
    title,
    slug,
  }).save();
  res.send(newBoard._id ? true : false);
});

module.exports = router;
