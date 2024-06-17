require('dotenv')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');

const notFoundMiddleware = require('./src/middlewares/not-found');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const authRouter = require('./src/routes/auth-route');
const userRouter = require('./src/routes/user-route');
const albumRouter = require('./src/routes/album-route');
const commentRouter = require('./src/routes/comment-route');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/public/images', express.static("public/images"));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/album', albumRouter);
app.use('/comment', commentRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 9000;
app.listen(PORT, (req, res, next) => console.log(`server is running on port: ${PORT}`))