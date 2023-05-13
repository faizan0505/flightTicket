const express = require('express')
const axios = require('axios')
const { authenticate } = require('../middleware/authentication')
const { passengerModel } = require('../models/passengerModel')

const router = express.Router()

router.get('/places', async (req, res) => {
    try {
        const response = await axios.get(`https://636c0e84ad62451f9fc2ac5f.mockapi.io/cards`)
        const data = response.data;

        res.status(200).json({
            ok: true,
            data
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            ok: false,
            msg: 'Something Went wrong on Place'
        })
    }
})


router.get('/price', async (req, res) => {
    try {
        const { source, destination } = req.query;  //pass source & destination in query. E.g - ?source=Illinois&destination=Pennsylvania
        const response = await axios.get(`https://636c0e84ad62451f9fc2ac5f.mockapi.io/cards`);
        const data = response.data;

        const srcDis = [];
        const dstDis = [];
        const prices = [];

        data.forEach(elem => {
            source === elem.source ? (srcDis.push(elem.sourceDistance), prices.push(parseInt(elem.price))) : null;
            destination === elem.destination ? (dstDis.push(elem.destinationDistance), prices.push(parseInt(elem.price))) : null;
        });

        const totalDis = srcDis.reduce((acc, val) => acc + val, 0) + dstDis.reduce((acc, val) => acc + val, 0);
        const grossprice = prices.reduce((acc, val) => acc + val, 0);
        const indigo = ((grossprice * totalDis) / 10).toFixed(2);
        const airAsia = ((grossprice * totalDis) / 8).toFixed(2);
        const vistara = ((grossprice * totalDis) / 5).toFixed(2);

        res.status(200).json({
            ok: true,
            indigo,
            airAsia,
            vistara
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            ok: false,
            msg: 'Something went wrong on Price'
        });
    }
});

router.use(authenticate)

router.post('/book-flight', async (req, res) => {
    try {
        const booking = new passengerModel(req.body)
        //Put in req.body - source, destination, date, flight:[indigo,airAsia,vistara](choose any one), fare: from above api
        await booking.save()
        res.status(200).send({
            ok: true,
            msg: 'Flight has Booked'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            ok: false,
            msg: 'Something Went wrong on Booking'
        })
    }
})

router.get('/booking-details', async (req, res) => {
    try {
        const details = await passengerModel.find();
        res.status(200).send({
            ok: true,
            details
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            ok: false,
            msg: 'Something Went wrong on Booking-Details'
        })
    }
})

module.exports = router;