import axios from "axios";
// const BASE = "http://192.168.103.14:3000";
const BASE = process.env.REACT_APP_BASE;
const VOTE = "/votes";
const UPDATE_VOTE = "/update-vote";

export const updateVote = ({ userId, score }) => {
  return axios.post(`${BASE}${VOTE}${UPDATE_VOTE}`, {
    userId: userId,
    score: score,
  });
};
