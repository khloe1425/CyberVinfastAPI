require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');

const { logger } = require('./config/logModule');

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');
const showroomRoutes = require('./routes/showroomRoutes');
const booktestRoutes = require('./routes/booktestRoutes');
const orderRoutes = require('./routes/orderRoutes');
const questionRoutes = require('./routes/questionRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

if (process.env.NODE_ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/car', carRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/post', postRoutes);
app.use('/api/showroom', showroomRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/booktest', booktestRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/question', questionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`[LOG=SERVER] Server started on port ${PORT}`);
});