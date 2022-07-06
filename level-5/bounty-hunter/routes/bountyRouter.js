const express = require("express")
// const { send } = require("express/lib/response")
const bountyRouter = express.Router()
// const { v4: uuidv4 } = require('uuid')
const Bounty = require('../models/bounties')

//Routes
bountyRouter.route("/")
    //Get All
    .get((req, res, next) => {
        Bounty.find((err, bounties) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(bounties)
        })
    })

    //Post One
    .post((req, res, next) => {
        const newBounty = new Bounty(req.body)
        newBounty.save((err, savedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedBounty)
        })
    })

// //Get One (using params)
bountyRouter.route("/:bountyId") // this is the parameter <:>
    .get((req, res, next) => {
        const bountyId = req.params.bountyId
        Bounty.findById(bountyId, (err, bounty) => {
            if (!bountyId) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(bounty)
        })
    })

//Get by type (using query string) to filter results
bountyRouter.route("/search/type") // localhost:9000/bounties/search/type?type=Jedi
    .get((req, res, next) => {
        Bounty.find({ type: req.query.type }, (err, bounties) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(bounties)
        })
    })

//Delete one
bountyRouter.delete("/:bountyId", (req, res, next) => {
    Bounty.findOneAndDelete({ _id: req.params.bountyId }, (err, deletedBounty) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedBounty.firstName} ${deletedBounty.lastName} from the database`)
    })
})

//Update One
bountyRouter.put("/:bountyId", (req, res, next) => {
    Bounty.findOneAndUpdate(
        { _id: req.params.bountyId }, //find this one to update
        req.body, //update the object with this data
        { new: true },//send back the updated version please
        (err, updatedBounty) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedBounty)
        })
})

module.exports = bountyRouter
