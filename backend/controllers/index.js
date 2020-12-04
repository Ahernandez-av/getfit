const Workout = require("../models/Workout")
const Exercise = require("../models/Exercise")

exports.getExercises = async (req, res) => {
  const exercises = await Exercise.find()
  res.status(200).json(exercises)
}

exports.getExercisesQuery = async (req, res) => {
    // const {exercise} = 
}

exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find().populate('workout.set.exercises')

//   console.log(workouts[0].workout.set.exercises)
  res.status(200).json(workouts)
}
