const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generatePassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};
const comparePassword = async (password, hashedPassword) => {
  return await bcryptjs.compare(password, hashedPassword);
};
const generateToken = async (name) => {
  return await jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: process.env.TIME,
  });
};
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({
        success: false,
        message: "Please Enter all the fields",
      });
    } else {
      const existUser = await User.findOne({ name: name });
      if (existUser) {
        res.status(400).send({
          success: false,
          message: "User Already exists",
        });
      } else {
        const user = new User({
          name: name,
          email: email,
          password: generatePassword(password),
        });
        await user.save();
        res.status(200).send({
          success: true,
          message: "Registration successfully",
          user,
        });
      }
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error,
    });
  }
};

const logIn = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).send({
      success: false,
      message: "Please Enter all the fields",
    });
  } else {
    const user = await User.findOne({ name: name });
    if (user && (await comparePassword(password, user.password))) {
      const authToken = await generateToken(user.name);
      res.status(201).send({
        success: true,
        message: "Login Successfully",
        token: authToken,
        user,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "User not found with this name",
      });
    }
  }
};

const findUserId = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ name: name });
    if (user) {
      res.status(201).send({
        success: true,
        user_id: user._id,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "User not found with this name",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "User not found with this name",
    });
  }
};
const find = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(201).send({
        success: true,
        user,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "User not found with this name",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "User not found with this name",
    });
  }
};
const followUser = async (req, res) => {
  try {
    const { name, id } = req.body;
    const user = await User.findOne({name})
    const result1 = await User.findByIdAndUpdate(
      user._id,
      { $push: { followers: id }, $inc: { numFollowers: 1 } },
      { new: true }
    );

    const result2 = await User.findByIdAndUpdate(
      id,
      { $push: { following: user._id }, $inc: { numFollowing: 1 } },
      { new: true }
    )

    if (result1&&result2) {
      res.status(201).send({
        success: true,
        message: `You started following ${name}`,
      });
    }else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "User not found with this name",
    });
  }
};

const UnfollowUser = async (req, res) => {
  try {
    const { name, id } = req.body;
    const user = await User.findOne({name})
    const result1 = await User.findByIdAndUpdate(
      user._id,
      { $pull: { followers: id }, $inc: { numFollowers: -1 } },
      { new: true }
    );

    const result2 = await User.findByIdAndUpdate(
      id,
      { $pull: { following: user._id }, $inc: { numFollowing: -1 } },
      { new: true }
    )

    if (result1&&result2) {
      res.status(201).send({
        success: true,
        message: `You unfollow ${name}`,
      });
    }else {
      res.status(400).send({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "User not found with this name",
    });
  }
};

module.exports = { signUp, logIn, findUserId, followUser,UnfollowUser,find };
