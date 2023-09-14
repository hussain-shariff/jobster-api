import express from "express"
const authRoute = express.Router()
import { login, register } from "../controllers/auth.js"

authRoute.post("/login", login)
authRoute.post("/register", register)

export default authRoute
