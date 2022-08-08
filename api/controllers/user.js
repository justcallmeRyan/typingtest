import User from "../models/User.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(11);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {password: hash}, {new: true});
        res.status(200).json(updatedUser);

    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");

    } catch (err) {
        next(err);
    }
}

export const findUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}

export const findUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        // const {password, isAdmin, ...otherDetails} = users._doc;
        // res.status(200).json({...otherDetails});
        res.status(200).json(users);

    } catch (err) {
        next(err);
    }
}

export const findUserProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.params.name});
        res.status(200).json([user.username, user.createdAt, user.highScoreEnglish, user.highScoreRussian]);
    } catch (err) {
        next(err)
    }

}

export const updateHighScore = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(req.body)

    } catch (err) {
        next(err);
    }
}

export const findUsersEnglish = async (req, res, next) => {
    try {
        const usersa = await User.find().sort({highScoreEnglish: -1}).limit(20).select("username").select("createdAt").select("highScoreEnglish");
        // const {password, isAdmin, ...otherDetails} = users._doc;
        // res.status(200).json({...otherDetails});
        res.status(200).json(usersa);

    } catch (err) {
        next(err);
    }
}

export const findUsersRussian = async (req, res, next) => {
    try {
        const usersa = await User.find().sort({highScoreRussian: -1}).limit(20).select("username").select("createdAt").select("highScoreRussian");
        // const {password, isAdmin, ...otherDetails} = users._doc;
        // res.status(200).json({...otherDetails});
        res.status(200).json(usersa);

    } catch (err) {
        next(err);
    }
}