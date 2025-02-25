import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.get('/duypham27', (req, res) => {
        return res.send('this is sercet from duypham27')
    });
    //rest api


    return app.use("/", router);
}

module.exports = initWebRoutes;