// 여러개의 스키마 관리
const Article = require('./article')//사용자가 작성한 게시글
const Board = require('./board')//게시판
const Comment = require('./comment')//게시글 안에 있는 댓글
// const Company = require('./company')//회사정보
const Reply = require('./reply')//게사글안에 있는 대댓글
const User = require('./user')//사용자 정보

module.exports = {
    Article,
    Board,
    Comment,
    // Company,
    Reply,
    User,
}