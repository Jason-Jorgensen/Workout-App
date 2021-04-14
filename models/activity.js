const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const activitySchema = new Schema(
    {
        day:{
            type:Date,
            default:Date.now
        },
        excercises: [
            {
            type: {
                type: String,
                required: true,
                trim: true
                },
            name: {
                type:String,
                trim:true,
            },
            duration: Number,
            distance: {
                type:Number,
                default:0,
            },
            
            weight: {
                type: Number,
                default:0,
            },
            reps: {
                type:Number,
                default:0,
            },
            sets: {
                type:Number,
                default:0,
            },
            }
        ],
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;