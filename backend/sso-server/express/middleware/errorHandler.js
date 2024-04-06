import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
    const { FORBIDDEN, NOT_FOUND, UNAUTHORIZED, VALIDATION_ERROR, SERVER_ERROR } = constants
    const statusCode = res.statusCode ?? SERVER_ERROR;

    switch (statusCode) {
        case FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                tackTrace: err.stack
            })
            break;
        case UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                tackTrace: err.stack
            })
            break;
        case VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                tackTrace: err.stack
            })
            break;

        case NOT_FOUND:
            res.json({
                title: "Not found",
                message: err.message,
                tackTrace: err.stack
            })
            break;

        case SERVER_ERROR:
            res.json({
                title: "Server error",
                message: err.message,
                tackTrace: err.stack
            })
            break;
        default:
            console.log("No Error, All good!!!");
            break;
    }
}

export default errorHandler;