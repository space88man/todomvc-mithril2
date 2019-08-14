// js/models/storage.js
const STORAGE_ID = 'todos-mithril';

export default {
    get: function () {
	return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },
    put: function (todos) {
	localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }
}

