import express from 'express'
import { registerUser, loginUser, userCredits } from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)

export default userRouter

//https://bookish-lamp-g4qp7wrxqjj9fwvx7-4000.app.github.dev/api/user/register
//http://bookish-lamp-g4qp7wrxqjj9fwvx7-4000.app.github.dev/api/user/login