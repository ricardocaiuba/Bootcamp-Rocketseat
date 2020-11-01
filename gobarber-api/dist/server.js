"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var upload_1 = __importDefault(require("./config/upload"));
var AppError_1 = __importDefault(require("./errors/AppError"));
require("./database");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/files", express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.use(function (err, req, res, _) {
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    console.log(err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});
var port = 3333;
app.listen(port, function () {
    console.log("\u2714 Server started on port " + port);
});
