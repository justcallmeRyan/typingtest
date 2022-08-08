import Word from "../models/Word.js";

export const createWord = async (req,res,next) => {
    const newWord = new Word(req.body)
    try {
        const savedWord = await newWord.save();
        res.status(200).json(savedWord);

    } catch(err) {
        next(err);
    }
}

export const updateWord = async (req,res,next) => {
    try {
        const updatedWord = await Word.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedWord)

    } catch(err) {
        next(err);
    }
}

export const deleteWord = async (req,res,next) => {
    try {
        const deletedWord = await Word.findByIdAndDelete(req.params.id)
        res.status(200).json("Word has been deleted")

    } catch(err) {
        next(err);
    }
}

export const findWord = async (req,res,next) => {
    try {
        const word = await Word.findById(req.params.id);
        res.status(200).json(word)

    } catch(err) {
        next(err);
    }
}

export const findWords = async (req,res,next) => {
    try {
        const words = await Word.find();
        res.status(200).json(words)

    } catch(err) {
        next(err);
    }
}

export const wordsByParameters = async (req,res,next) => {
    try {

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array
        }
        const word = await Word.find({name:req.params.name});

        const array = word[0].words.split(" ")
        const shuffledArray = await shuffleArray(array)
        res.status(200).json(shuffledArray)

    } catch(err) {
        next(err);
    }
}