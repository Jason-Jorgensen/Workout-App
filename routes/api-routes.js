const router = require("express").Router();
const db = require("../models");
const{ json } = require ("express");

router.get("/api/workouts", (req,res) => {
    db.Activity.find({})
    .sort({ day: 1})
    .then(lastWorkout => {
        res.json(lastWorkout);
    })
    .catch(err => {
        res.status (400).json(err);
    });
});

//add to most recent workout
router.put("/api/workouts/:id", (req,res) => {
    db.Activity.findOneAndUpdate(
        {
            _id:req.params.id
        },
        {
            $push: { exercises: req.body }
        },
    ).then(dbActivity => {
        res.json(dbActivity)
    })
        .catch(err => {
            res.json(err);
        });
});

//add workout
router.post("/api/workouts", ({ data },res) => {
    console.log(JSON.stringify(data));
    db.Activity.create(data)
    .then(dbActivity => {
        console.log(dbActivity);
        res.json(dbActivity);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req,res) => {
    console.log(req.params.id)
    db.Activity.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $push: { excercies: req.body },
        },
    )
    .catch(err => {
        res.json(err);
    });
})


module.exports = router;
