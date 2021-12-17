const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./models/User');
const CarModel = require('./models/Car');
const BooktestModel = require('./models/Booktest');
const ShowroomModel = require('./models/Showroom');
const CategoryModel = require('./models/Category');
const ImageModel = require('./models/Image');
const OrderModel = require('./models/Order');
const ServicesModel = require('./models/Services');
const PostModel = require('./models/Post');
const QuestionModel = require('./models/Question');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize, DataTypes)
const Car = CarModel(sequelize, DataTypes)
const Booktest = BooktestModel(sequelize, DataTypes)
const Showroom = ShowroomModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Image = ImageModel(sequelize, DataTypes)
const Order = OrderModel(sequelize, DataTypes)
const Services = ServicesModel(sequelize, DataTypes)
const Post = PostModel(sequelize, DataTypes)
const Question = QuestionModel(sequelize, DataTypes)

// Association car
Car.belongsTo(Category, { foreignKey: "category" });
Car.hasMany(Image, {
    foreignKey: "car_id"
});

// Association Order
Order.belongsTo(User, { foreignKey: "user_id" });
Order.belongsTo(Car, { foreignKey: "car_id" });
Order.belongsTo(Showroom, { foreignKey: "showroom_id" });

// Association Services
Services.belongsTo(User, { foreignKey: "user_id" });
Services.belongsTo(Car, { foreignKey: "car_id" });
Services.belongsTo(Showroom, { foreignKey: "showroom_id" });

// Association Book test
Booktest.belongsTo(User, { foreignKey: "user_id" });
Booktest.belongsTo(Car, { foreignKey: "car_id" });
Booktest.belongsTo(Showroom, { foreignKey: "showroom_id" });

// Association Question
Question.belongsTo(User, { foreignKey: "user_id" });
Question.belongsTo(Car, { foreignKey: "car_id" });

module.exports = {
    User,
    Car,
    Booktest,
    Showroom,
    Category,
    Image,
    Order,
    Services,
    Post,
    Question
}