$('#todos-load-btn').click(function(){
    loadTodos();
});

$('#insert-todo-form').submit(function(event){
    event.preventDefault();
    var action = $('#action').val(),
        dueDate = $('#date').val(),
        completed = $('#completed').is(':checked');
    var promise = Kinvey.DataStore.save('todo', {
        action  : action,
        duedate : dueDate,
        completed: completed
    });
    promise.then(function(model) {
        alert("Added todo with success");
        $('#insert-todo-form').each(function(){
            this.reset();
        });
    }, function(err) {
        console.log("error " + JSON.stringify(err));
        alert("Error: " + err.description);
    });
});

function loadTodos(query){
    //TODO change find call
    var promise = Kinvey.DataStore.find('todo', query);
    promise.then(function(entities) {
        var todosList = $('#todos-list');
        todosList.empty();
        $.each(entities, function(i, row) {
            todosList.append('<li data-id="' + row._id + '"><a>' + '<h3>' + row.action + '</h3> ' +'<p>' + row.duedate + '  ' + row.completed + '</p>' + '</li>');
        });
        todosList.listview('refresh');
    }, function(err) {
        alert("Error: " + err.description);
        console.log("fetch partners error " + JSON.stringify(err));
    });
}