const express = require('express');

const router = express.Router();

//Getting data from database
router.get('/ninjas', function(req,res,next){
     res.send("Welcome");
});
//Adding a new ninja
router.post('/ninjas',function(req,res,next){
		res.send(req.body);
});
//update a ninja data
router.put('/ninjas/:id', function(req,res,next){
     res.send(req.params.id);
});
//Delete a ninja from a database
router.delete('/ninjas/:id', function(req,res,next){
    res.send(req.params.id);
});

export default router;