import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

export default userRouter

//https://bookish-lamp-g4qp7wrxqjj9fwvx7-4000.app.github.dev/api/user/register
//http://bookish-lamp-g4qp7wrxqjj9fwvx7-4000.app.github.dev/api/user/login