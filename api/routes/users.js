import express from "express";
import {
    updateUser,
    deleteUser,
    findUser,
    findUsers,
    findUserProfile,
    updateHighScore,
    findUsersEnglish, findUsersRussian
} from "../controllers/User.js";
import {verifyToken, verifyUser, verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("You are logged in")
// })
//
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged in and you can edit/delete")
// })
//
// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("You are logged in and you can edit/delete all accounts")
// })

//UPDATE
router.put("/:id", updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", findUser);
//GET ALL
router.get("/", verifyAdmin, findUsers);

//GET USER FOR PROFILE
router.get("/user/:name", findUserProfile);

//UPDATE HIGHSCORE
router.put("/result/:id", verifyUser, updateHighScore);

//GET ENGLISH HIGH SCORE
router.get("/english/get", findUsersEnglish)
//GET ENGLISH HIGH SCORE
router.get("/russian/get", findUsersRussian)


export default router;