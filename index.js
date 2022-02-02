const express = require("express")
const { article, user, board, comment, reply } = require('./router');
const { articleDelete } = require("./router/article");
const router = require('./router')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.get('/',(req,res) =>{
    res.send("success")
})

// 기능별 라우터추가
app.use(article)
app.use(user)
app.use(board)
app.use(comment)
app.use(reply)

const PORT = 3000

app.listen(PORT,'localhost',()=>{
    console.log(`App is listening at http://localhost:${PORT}`)
})