import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
await connectDB();


app.post('/test', (req, res) => {
  console.log('Test route hit!');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  res.json({ success: true, message: "Test route working!" });
});


app.use('/api/user', userRouter);
app.get('/', (req, res) => 
    res.send('API working fine'));


app.listen(PORT, '0.0.0.0',() =>
    console.log('Server running on port ' + PORT));
