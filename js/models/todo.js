// js/models/todo.js
/*global m */

var uniqueId = (function () {
	var count = 0;
	return function () {
		return ++count;
	};
}());

// Todo Model
var Todo = function (data) {
	this.title = data.title;
	this.completed = data.completed || false;
	this.editing = data.editing || false;
	this.key = uniqueId();
};

export default Todo;
