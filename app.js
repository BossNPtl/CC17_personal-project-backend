require('dotenv')
const express = require('express');

const notFoundMiddleware = require('./src/middlewares/not-found');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const authRouter = require('./src/routes/auth-route');

const app = express();

app.use(express.json());

app.use('/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 9000;
app.listen(PORT, (req, res, next) => console.log(`server is running on port: ${PORT}`))