// Error middleware NEXT function

const errorMiddleware = async (err, req, res, next) => {
    console.log(err);

    const defaultErrorObj = {
        statusCode: 500,
        message: err,
    };

    // missing field error
    if (err.name === "ValidationError") {
        defaultErrorObj.statusCode = 400;
        defaultErrorObj.message = Object.values(err.errors).map((item) => item.message).join(",");
    }

    // duplicate error
    if (err.code === 11000) {
        defaultErrorObj.statusCode = 400;
        defaultErrorObj.message = `${Object.keys(err.keyValue)} field has to be unique`;
    }

    res.status(defaultErrorObj.statusCode).json({ message: defaultErrorObj.message });
};

export default errorMiddleware;