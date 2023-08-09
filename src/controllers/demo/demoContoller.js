const APIResponseFormat = require('../../utils/APIResponseFormat.js');
const DemoService = require('../../services/demo/demoServices.js');


const demo = async (req, res) => {
    try {
        const demo = await DemoService.demo();
        return APIResponseFormat._ResDataFound(res, demo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const addDemo = async (req, res) => {
    try {
        const newDemo = await DemoService.addDemo(req.body);
        return APIResponseFormat._ResDataFound(res, newDemo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const updateDemo = async (req, res) => {
    try {
        let id = req.headers.id;
        const updatedDemo = await DemoService.updateDemo(id, req.body);
        return APIResponseFormat._ResDataUpdated(res, updatedDemo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const deleteDemo = async (req, res) => {
    try {
        let id = req.headers.id;
        const deletedDemo = await DemoService.deleteDemo(id);
        return APIResponseFormat._ResDataDeleted(res, deletedDemo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

module.exports = {
    demo,
    addDemo,
    updateDemo,
    deleteDemo
}