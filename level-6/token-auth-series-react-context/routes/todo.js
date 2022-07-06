const express = require("express");
const todoRouter = express.Router();
const Todo = require("../models/todo");

//GET All Todos
todoRouter.get("/", (req, res, next) => {
    Todo.find((err, todos) => { //AUTH with user property
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(todos);
    });
});

// ADD NEW TODO
todoRouter.post("/", (req, res, next) => {
    const todo = new Todo(req.body);
    // Set the user property of a todo to req.user._id (logged-in user's `_id` property)
    todo.user = req.user._id; //AUTH
    todo.save((err, newTodo) => {
        if (err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(newTodo);
    });
});

// get todos by user id
todoRouter.get("/user", (req, res, next) => {
    Todo.find({ user: req.user._id }, (err, todos) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(todos)
    })
})


// AUTH: Change to findOne and include the search criteria for users NOT SURE YET 
// todoRouter.get("/:todoId", (req, res, next) => {

//     Todo.findOne({_id: req.params.todoId, user: req.user._id}, (err, todo) => {
//         if (err) {
//             res.status(500);
//             return next(err);
//         };
//         if (!todo) {
//             res.status(404);
//             return next(new Error("No todo item found."));
//         };
//         return res.send(todo);
//     });
// });

//DELETE Todo
todoRouter.delete("/:todoId", (req, res, next) => {
    // Addition: Change to findOneAndRemove and include the search criteria for users
    Todo.findOneAndRemove(
        { _id: req.params.todoId, user: req.user._id },
        (err, deletedTodo) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            return res.status(200).send(`Successfully delete todo: ${deletedTodo.title}`);
        });
});

//UPDATE Todo
todoRouter.put("/:todoId", (req, res, next) => {

    // Addition: Change to findOneAndUpdate and include the query for users
    Todo.findOneAndUpdate(
        // Updated query to include user
        { _id: req.params.todoId, user: req.user._id },
        req.body,
        { new: true },
        (err, updatedTodo) => {
            if (err) {
                res.status(500)
                return next(err);
            };
            return res.status(200).send(updatedTodo);
        }
    );
});


module.exports = todoRouter;
