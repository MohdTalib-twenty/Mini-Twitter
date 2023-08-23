const express = require("express")
const { signUp,logIn,find, findUserId,followUser,UnfollowUser }= require("../controller/userComponents")
const router = express.Router();


router.post('/signup',signUp);
router.post('/login',logIn);
router.post('/findUser',findUserId)
router.post('/find',find)
router.post('/follow',followUser)
router.post('/unfollow',UnfollowUser)




module.exports=router