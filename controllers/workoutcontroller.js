const router = require('express').Router();
const workout = require('../db').import('../models/workout');

const validateSession = require('../middleware/validate-session');

router.get('/log', (req, res) => {
    workout.findAll()
    .then(workouts => res.status(200).json(workouts))
    .catch(err => res.status(500).json({error: err}))
});

router.post('/create', validateSession, (req, res) => {
    const workoutFromRequest = {
        nameOfExercise: req.body.name,
        muscleGroup: req.body.group,
        numberOfSets: req.body.sets,
        numberOfReps: req.body.reps,
        isCardio: req.body.cardio,
        isStrength: req.body.strength
    }

    workout.create(workoutFromRequest)
    .then(workouts => res.status(200).json(workouts))
    .catch(err => res.status(500).json({error: err}))
});

router.get('/log', (req, res) => {
    workout.findAll()
    .then(workouts => res.status(200).json(workouts))
    .catch(err => res.status(500).json({error: err}))
});

router.get('/log/:id', (req, res) => {
    workout.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(workouts => res.status(200).json(workouts))
    .catch(err => res.status(500).json({error: err}))
});

router.put("/log/:id", validateSession, (req, res) => {
    workout.update(req.body, {
        where: { id: req.params.id }
    })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({error:err}))
});

router.delete('/:id', validateSession, (req, res) => {
    workout.destroy({
        where: { id: req.params.id }
    })
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;