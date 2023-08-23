const express = require("express")
const {createTweet, deleteTweet,updateTweet, likeTweet, unlikeTweets, commentTweet, getAllPost, getUserPost, getPost}= require("../controller/tweetController")
const router = express.Router();

router.post('/createTweet',createTweet)
router.post('/:id/like',likeTweet)
router.post("/:id/unlike",unlikeTweets)
router.post("/:id/comment",commentTweet)
router.post('/allTweets',getAllPost)
router.post('/mypost',getUserPost)
router.post('/postDetails',getPost);

router.post('/update',updateTweet)

router.delete('/:id',deleteTweet)




module.exports=router