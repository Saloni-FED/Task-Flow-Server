import express from "express";
import { signin, signup } from "../controllers/users.js"
import { googleSignUp, googleSignIn } from "../controllers/googleAuth.js"
const route = express.Router()

// File Upload
route.post('/signin', signin);
route.post('/signup', signup);

route.post('/signup/google', googleSignUp)
route.post('/signin/google', googleSignIn)

export default route;

