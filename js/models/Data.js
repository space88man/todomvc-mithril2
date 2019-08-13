// js/models/Data.js

import Storage from './storage'
import Todo from './todo'

var Data = {
    list: [],
    load: function() {
	Data.list = Storage.get();
    },

    visible: function(attrs) {
	if (!('filter' in attrs)) {
	    return Data.list;
	} else {
	    return Data.list.filter(function(item) {
		if (attrs.filter === 'completed') {
		    return item.completed;
		}
		else {
		    return !item.completed;
		}
	    });
	}
    },

    isEmpty: function() {
	return Data.list.length == 0;
    },
    
    add: function(e) {
	var title = e.target.value.trim();
	if (title) {
	    Data.list.push(new Todo({title: title}));
	    Storage.put(Data.list);
	}
	e.target.value = '';
    },

    complete: function(task) {
	task.completed = !task.completed;
	Storage.put(Data.list);
    },

    edit: function(todo) {
	todo.previousTitle = todo.title;
	todo.editing = true;
    },

    doneEditing: function(todo, index) {
	if (!todo.editing) {
	    return;
	}

	todo.editing = false;
	todo.title = todo.title.trim();

	if (!todo.title) {
	    Data.list.splice(index, 1);
	}
	Storage.put(Data.list);
    },

    cancelEditing: function(todo) {
	todo.title = todo.previousTitle;
	todo.editing = false;
    },

    clearTitle: function(e) {
	e.target.value = '';
    },

    remove: function(index) {
	Data.list.splice(index, 1);
	Storage.put(Data.list);
    },

    clearCompleted: function() {
	var list = Data.list;

	for (var i = list.length - 1; i >= 0; i--) {
	    if (list[i].completed) {
		list.splice(i, 1);
	    }
	}
	Storage.put(list);
    },

    amountCompleted: function() {
	return Data.list.filter(e => e.completed).length
    },

    amountActive: function() {
	return Data.list.filter(e => !e.completed).length
    },

    allCompleted: function() {
	return Data.list.filter(e => !e.completed).length == 0;
    },

    completeAll: function() {
	var allCompleted = Data.allCompleted();
	Data.list.map(item => {item.completed = !allCompleted;});
	Storage.put(Data.list);
    },
};

export default Data;
