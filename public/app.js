/* global $ */

$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos)
    
    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
    
    $('.list').on('click', 'span', function(event){
        event.stopPropagation();
        removeTodo($(this).parent());
    });
    
    $('.list').on('click','li', function(){
        updateTodo($(this));
    })
});

function addTodos(todos){
     todos.forEach(function(todo){
         addTodo(todo);
     });
}

function addTodo(todo){
        var newTodo = $('<li class = "task">'+todo.name+'<span>X</span></li>');
        newTodo.data('id',todo._id);
        newTodo.data('completed', todo.completed);
        if(todo.completed){
            newTodo.addClass("done")
        }
        $('.list').append(newTodo);
}

function createTodo(){
    var userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo){
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err)
    })
}

function removeTodo(todo){
    var id = todo.data('id');
    var deleteURL = '/api/todos/'+id;
    
    $.ajax({
        method: 'DELETE',
        url: deleteURL
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTodo(todo){
    var updateURL = '/api/todos/'+ todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateURL,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass('done')
        todo.data({'completed':isDone})
        console.log(updatedTodo)
    })
}