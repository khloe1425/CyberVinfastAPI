const { Op } = require('sequelize');
const {
    Car,
    Size,
    Engine,
    Image,
    Exterior,
    Interior,
    SafeSystem,
    Fee,
    Showroom
} = require('../../sequelize');
const asyncHandler = require('../../middleware/asyncHandler');
const Size = require('../../models/Size');

exports.createCar = asyncHandler(async (req, res, next) => {
    const car = await Car.create({
        ...req.body.car,
    });

    let size, engine, exterior, interior, safesystem, fee;

    if (req.body.size) {
        size = await Size.create({
            ...req.body.size,
            car_id: car.id
        });

        car.setDataValue('size', size);
    }

    if (req.body.engine) {
        engine = await Engine.create({
            ...req.body.engine,
            car_id: car.id
        });

        car.setDataValue('engine', engine);
    }

    if (req.body.exterior) {
        exterior = await Exterior.create({
            ...req.body.exterior,
            car_id: car.id
        });

        car.setDataValue('exterior', exterior);
    }

    if (req.body.interior) {
        interior = await Interior.create({
            ...req.body.interior,
            car_id: car.id
        });

        car.setDataValue('interior', interior);
    }

    if (req.body.safesystem) {
        safesystem = await SafeSystem.create({
            ...req.body.safesystem,
            car_id: car.id
        });
        
        car.setDataValue('safeSystem', safesystem);
    }

    if (req.body.fee) {
        fee = await Fee.create({
            ...req.body.fee,
            car_id: car.id
        });
        
        car.setDataValue('fee', fee);
    }

    if (size && engine && exterior && interior && safesystem && fee) {
        await Car.update({ isComplete: true }, { where: { id: car.id } });
    }

    res.status(200).json({ success: true, data: car });
});

exports.addImage = asyncHandler(async (req, res, next) => {
    const car = await Car.findByPk(req.params.id);

    if (!car) {
        return next({
            message: `No car found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    const image = await Image.create({
        type: req.body.type,
        url: req.body.url,
        car_id: req.params.id,
    });

    res.status(200).json({ success: true, data: image });
});

exports.getAllCars = asyncHandler(async (req, res, next) => {
    const cars = await Car.findAll();

    res.status(200).json({ success: true, data: cars });
});

exports.getCar = asyncHandler(async (req, res, next) => {
    const car = await Car.findByPk(req.params.id, {
        include: [
            {
                model: Showroom,
                attributes: ["id", "name", "province"],
            },
        ],
    });

    if (!car) {
        return next({
            message: `No car found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    const images = await car.getImages({
        order: [["createdAt", "DESC"]],
        attributes: ["id", "type", "url", "createdAt"],
    });

    const size = await Size.findOne({
        where: { car_id: req.params.id }
    });

    const engine = await Engine.findOne({
        where: { car_id: req.params.id }
    });

    const exterior = await Exterior.findOne({
        where: { car_id: req.params.id }
    });

    const interior = await Interior.findOne({
        where: { car_id: req.params.id }
    });

    const safesystem = await SafeSystem.findOne({
        where: { car_id: req.params.id }
    });

    car.setDataValue('images', images);
    car.setDataValue('size', size);
    car.setDataValue('engine', engine);
    car.setDataValue('exterior', exterior);
    car.setDataValue('interior', interior);
    car.setDataValue('safesystem', safesystem);

    res.status(200).json({ success: true, data: car });
});