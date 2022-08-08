import { getStart, getError, getSuccess } from "./wordSlice";
import axios from "axios";

export const getWords = async (word, dispatch) => {
    dispatch(getStart());
    try {
        const res = await axios.get("words/wordsByParameters/default")
        dispatch(getSuccess(res.data))

    } catch (err) {
        dispatch(getError())
    }

}