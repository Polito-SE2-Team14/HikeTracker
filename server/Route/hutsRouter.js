const express = require("express");
const router = express.Router();
const hutController = require("../Controller/HutController");
const { check, validationResult } = require("express-validator");
const { errorResponse, errorResponseJson } = require("./utils")

router.get('', async (req, res) => {
    await hutController.getHuts()
        .then(huts => { /* console.log("huts", huts) */; return res.status(200).json(huts) })
        .catch((err) => {
            return errorResponse(err, 500, res)
        });

});


router.post('',
    check(["name", "address", "province", "municipality"]).not().isEmpty().trim().escape(),
    check(["longitude", "latitude"]).isFloat().not().isEmpty().trim().escape(),
    check(["bedspace", "hutOwnerID"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
    async (req, res) => {


        const errors = validationResult(req);
        if (!errors.isEmpty())
            return errorResponseJson(errors.array(), 505, res)

        await hutController.createHut(req.body)
            .then(hut => res.status(204).json(hut))
            .catch((err) => {
                return errorResponse(err, 500, res)
            });
    });

router.put('',
    check(["pointID", "bedspace", "hutOwnerID"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
    check(["name", "address", "province", "municipality"]).not().isEmpty().trim().escape(),
    check(["latitude", "longitude"]).isFloat().not().isEmpty().trim().escape(),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return errorResponseJson(errors.array(), 505, res)

        await hutController.updateHut(req.body)
            .then(hut => res.status(204).send())
            .catch((err) => {
                return errorResponse(err, 500, res)
            });
    });


router.delete('/:hutID',
    check("hutID").not().isEmpty().isInt({ min: 0 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return errorResponseJson(errors.array(), 505, res)

        await hutController.deleteHut(req.params.hutID)
            .then(() => res.status(204).send())
            .catch((err) => {
                return errorResponse(err, 500, res)
            });
    })

module.exports = router;
