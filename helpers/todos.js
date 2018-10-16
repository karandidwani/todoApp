var db = require('../models');

exports.getTodos = function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
        
    });
}

exports.createTodo = function(req, res){
    db.Todo.create(req.body)
    .then(function(newToDo){
        res.status(201).json(newToDo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.getTodo = function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTodo = function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.removeTodo = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(todo){
        res.send('record deleted');
    })
    .catch(function(err){
        res.send(err);
    })
}