import express from 'express';
import userRouter from './routes/user.routes.js';
import urlRouter from './routes/url.route.js';
import { authenticationMiddleware } from './middlewares/auth.middleware.js';

const app = express();

const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    return res.json({ status: 'Server is running!'})
});


app.use('/user', userRouter);
app.use(urlRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
