import express from "express";
import {createWord, updateWord, deleteWord, findWord, findWords, wordsByParameters} from "../controllers/word.js";
import {verifyAdmin} from "../utils/verifyToken.js";


const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createWord);
//UPDATE
router.put("/:id", verifyAdmin, updateWord);
//DELETE
router.delete("/:id", verifyAdmin, deleteWord);
//GET
router.get("/:id", findWord);
//GET ALL
router.get("/", findWords);

router.get("/wordsByParameters/:name", wordsByParameters);



export default router;