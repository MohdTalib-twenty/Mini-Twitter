const Tweet = require("../models/tweetModel");

const getAllPost = async (req, res) => {
  try {
    const result = await Tweet.find({});
    if (result) {
      res.send({
        success: true,
        result,
      });
    } else {
      res.send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
};

const getUserPost = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Tweet.find({ user: id }).sort({ createdAt: -1 });
    if (result) {
      res.status(201).send({
        success: true,
        result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};
const getPost = async (req, res) => {
  try {
    const result = await Tweet.find(req.params.id);
    if (result) {
      res.status(201).send({
        success: true,
        result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const createTweet = async (req, res) => {
  try {
    const { title, body, id, userName } = req.body;

    if (!title || !body || !id) {
      res.status(400).send({
        success: false,
        message: "Enter all the fields",
      });
    } else {
      const tweet = await new Tweet({
        title: title,
        body: body,
        user: id,
        userName: userName,
      });
      await tweet.save();

      res.status(201).send({
        success: true,
        message: "Posted successfully",
        tweet,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const result = await Tweet.findOneAndDelete({
      _id: req.params.id,
    });
    if (result) {
      res.status(201).send({
        success: true,
        message: "Deleted Successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong please try after sometime",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const likeTweet = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Tweet.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: id },
        $inc: { numLikes: 1 },
      },
      { new: true }
    ).populate("user", "_id name");
    if (result) {
      res.status(201).send({
        success: true,
        message: "Liked successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};
const updateTweet = async (req, res) => {
  try {
    const { id, newtitle, newbody } = req.body;
    const result = await Tweet.findByIdAndUpdate(id, {
      $set: { title: newtitle, body: newbody }
    });
    if (result) {
      res.status(201).send({
        success: true,
        message: "Tweet Updated",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};
const unlikeTweets = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Tweet.findByIdAndUpdate(
      req.params.id,

      { $pull: { likes: id }, $inc: { numLikes: -1 } },
      { new: true }
    ).populate("user", "_id name");

    if (result) {
      res.status(201).send({
        success: true,
        message: "unliked successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const commentTweet = async (req, res) => {
  try {
    const { body, id } = req.body;
    const result = await Tweet.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: { comment: body, commenter: id },
        },
        $inc: { numComments: 1 },
      },
      { new: true }
    ).populate("user", "_id name");

    if (result) {
      res.status(201).send({
        success: true,
        message: "comment added successfully",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};
module.exports = {
  createTweet,
  deleteTweet,
  likeTweet,
  unlikeTweets,
  commentTweet,
  getAllPost,
  getPost,
  getUserPost,
  updateTweet
};
