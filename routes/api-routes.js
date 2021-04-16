const router = require("express").Router();
const db = require("../models");
const { json } = require ("express");

router.get("/api/workouts", (req,res) => {
    db.Activity.aggregate([
        {
            $addFields : {
                totalDuration: { $sum: "$exercises.duration" },
            }
        },
    ])
    .sort({ day: 1 })
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

router.get("/api/workouts/range", (req,res) => {
    db.Activity.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration"}
            }
        },
        // {
        //     "$sort": { day: -1 }
        // },
        // {
        //     "$limit": 7
        // }
    ])
    .sort( {day: -1})
    .limit(7)
    .then(workoutRange => {
        res.json(workoutRange)
    })
    .catch(err => {
        res.status(400).json(err);
    });
})


module.exports = router;
