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
} = require('../sequelize');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Create Car
// @route   POST /api/car
// @access  Private/Admin
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

// @desc    Add Image for Car
// @route   POST /api/car/:id/image
// @access  Private/Admin
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

// @desc    Get All Cars
// @route   POST /api/car
// @access  Public
exports.getAllCars = asyncHandler(async (req, res, next) => {
    const cars = await Car.findAll();

    res.status(200).json({ success: true, data: cars });
});

// @desc    Get Car By Id
// @route   GET /api/car/:id
// @access  Public
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

// @desc    Update Car By Id
// @route   PUT /api/car/:id
// @access  Private/Admin
exports.updateCar = asyncHandler(async (req, res, next) => {
    await Car.update(req.body, {
        where: { id: req.params.id },
    });

    const car = await Car.findByPk(req.params.id);

    res.status(200).json({ success: true, data: car });
});

exports.updateSizeCar = asyncHandler(async (req, res, next) => {
    return updateComptCar(Size, req, res, next);
});

exports.updateEngineCar = asyncHandler(async (req, res, next) => {
    return updateComptCar(Engine, req, res, next);
});

exports.updateExteriorCar = asyncHandler(async (req, res, next) => {
    return updateComptCar(Exterior, req, res, next);
});

exports.updateInteriorCar = asyncHandler(async (req, res, next) => {
    return updateComptCar(Interior, req, res, next);
});

exports.updateSafeSystemCar = asyncHandler(async (req, res, next) => {
    return updateComptCar(SafeSystem, req, res, next);
});

const updateComptCar = async (model, req, res, next) => {
    const compt = await model.findOne({
        where: { car_id: req.params.id },
    })

    if (!compt) {
        return next({
            message: `No component found for Car's ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    await compt.update(req.body)

    res.json({ success: true, data: { compt } });
}

// @desc    Calculator fee for car
// @route   GET /api/car/:id/fee
// @access  Public
exports.getFeeCar = asyncHandler(async (req, res, next) => {
    const car = await Car.findByPk(req.params.id);

    if (!car) {
        return next({
            message: `No car found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    const fee = await Fee.findOne({
        where: { car_id: req.params.id }
    });

    car.setDataValue('fee', fee);

    res.status(200).json({ success: true, data: car });
});

// @desc    Compare two cars
// @route   GET /api/car/compare
// @access  Public
exports.compareCar = asyncHandler(async (req, res, next) => {
    const cars = await Car.findAll({
        where: {
            id: {
                [Op.in]: req.body.cars
            }
        }
    });

    cars.forEach(async (car, index) => {
        const size = await Size.findOne({
            where: { car_id: car.id }
        });

        const engine = await Engine.findOne({
            where: { car_id: car.id }
        });

        const exterior = await Exterior.findOne({
            where: { car_id: car.id }
        });

        const interior = await Interior.findOne({
            where: { car_id: car.id }
        });

        const safesystem = await SafeSystem.findOne({
            where: { car_id: car.id }
        });

        car.setDataValue('size', size);
        car.setDataValue('engine', engine);
        car.setDataValue('exterior', exterior);
        car.setDataValue('interior', interior);
        car.setDataValue('safesystem', safesystem);

        if (index === cars.length - 1) {
            return res.status(200).json({ success: true, data: cars });
        }
    });
})