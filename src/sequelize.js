const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./models/User');
const CarModel = require('./models/Car');
const BooktestModel = require('./models/Booktest');
const ShowroomModel = require('./models/Showroom');
const CategoryModel = require('./models/Category');
const ImageModel = require('./models/Image');
const OrderModel = require('./models/Order');
const ServiceModel = require('./models/Service');
const PostModel = require('./models/Post');
const QuestionModel = require('./models/Question');
const EngineModel = require('./models/Engine');
const ExteriorModel = require('./models/Exterior');
const InteriorModel = require('./models/Interior');
const SizeModel = require('./models/Size');
const SafeSystemModel = require('./models/SafeSystem');
const FeeModel = require('./models/Fee');

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
const Service = ServiceModel(sequelize, DataTypes)
const Post = PostModel(sequelize, DataTypes)
const Question = QuestionModel(sequelize, DataTypes)
const Engine = EngineModel(sequelize, DataTypes)
const Exterior = ExteriorModel(sequelize, DataTypes)
const Interior = InteriorModel(sequelize, DataTypes)
const Size = SizeModel(sequelize, DataTypes)
const SafeSystem = SafeSystemModel(sequelize, DataTypes)
const Fee = FeeModel(sequelize, DataTypes)

// Association car
Car.belongsTo(Showroom, { foreignKey: "showroom_id" });
Car.belongsTo(Category, { foreignKey: "category" });
Car.hasMany(Image, {
    foreignKey: "car_id"
});

// Association Order
Order.belongsTo(User, { foreignKey: "user_id" });
Order.belongsTo(Car, { foreignKey: "car_id" });
Order.belongsTo(Showroom, { foreignKey: "showroom_id" });

// Association Services
Service.belongsTo(User, { foreignKey: "user_id" });
Service.belongsTo(Car, { foreignKey: "car_id" });
Service.belongsTo(Showroom, { foreignKey: "showroom_id" });

// Association Book test
Booktest.belongsTo(User, { foreignKey: "user_id" });
Booktest.belongsTo(Car, { foreignKey: "car_id" });
Booktest.belongsTo(Showroom, { foreignKey: "showroom_id" });

// Association Question
Question.belongsTo(User, { foreignKey: "user_id" });
Question.belongsTo(Car, { foreignKey: "car_id" });

// Reference to car
Engine.belongsTo(Car, { foreignKey: "car_id" });
Size.belongsTo(Car, { foreignKey: "car_id" });
Exterior.belongsTo(Car, { foreignKey: "car_id" });
Interior.belongsTo(Car, { foreignKey: "car_id" });
SafeSystem.belongsTo(Car, { foreignKey: "car_id" });
Fee.belongsTo(Car, { foreignKey: "car_id" });

module.exports = {
    User,
    Car,
    Booktest,
    Showroom,
    Category,
    Image,
    Order,
    Service,
    Post,
    Question,
    Engine,
    Size,
    Exterior,
    Interior,
    SafeSystem,
    Fee
}