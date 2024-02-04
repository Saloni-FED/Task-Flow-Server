import express from "express";
import { signin, signup } from "../controllers/users.js"

const route = express.Router()

// File Upload
route.post('/signin', signin);
route.post('/signup', signup);



export default route;

