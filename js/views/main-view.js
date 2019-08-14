// js/views/main-view.js

import Data from "../models/Data"
import Footer from "./footer-view"

// View utility

const ENTER_KEY = 13;
const ESC_KEY = 27;

function watchInput(onenter, onescape) {
  return function (e) {
    // m.redraw.strategy('none');
    if (e.keyCode === ENTER_KEY) {
      onenter();
      // m.redraw.strategy('diff');
    } else if (e.keyCode === ESC_KEY) {
      onescape();
    }
  }
};


export function MainView() {
  Data.load();

  return {

    view: function (vnode) {

      return [
	m('header.header',
          [
            m('h1', 'todos'),
            m('input.new-todo[placeholder="What needs to be done?"][autofocus]',
	      {
		onkeyup: watchInput(Data.add, Data.clearTitle),
		oninput: (e) => {Data.newTitle = e.target.value;},
		value: Data.newTitle,
              })
          ]),
	!Data.isEmpty() && m('section.main',
			     [
			       m('input#toggle-all.toggle-all[type=checkbox]',
				 {
				   checked: Data.allCompleted(),
				   onclick: () => Data.completeAll(),
				 }),
			       m('label', {
				 for: 'toggle-all'
			       }),
			       m('ul.todo-list', Data.visible(vnode.attrs.filter || '').map(function(task, index) {
				 return m('li', {
				   class: '' + (task.completed ? 'completed' : '') + (task.editing ? ' editing' : ''),
				   key: task.key
				 }, [
				   m('.view', [
				     m('input.toggle[type=checkbox]', {
				       checked: task.completed,
				       onclick: () => Data.complete(task),
				     }),
				     m('label', {
				       ondblclick: () => {Data.edit(task);},
				     }, task.title),
				     m('button.destroy', {
				       onclick: () => {Data.remove(index)},
				     }),
				   ]),
				   m('input.edit', {
				     value: task.title,
				     onupdate: v => {
				       if (task.editing)
					 v.dom.focus();
				     },
				     oninput: e => { task.title = e.target.value; },
				     onkeyup: watchInput(
				       () => Data.doneEditing(task, index),
				       () => Data.cancelEditing(task)
				     ),
				     onblur: () => Data.doneEditing(task, index),
				   })
				 ]);
			       }))
			     ]),
	Data.isEmpty() ? '' : m(Footer, {filter: vnode.attrs.filter || ''}),
      ];
    },
  }
}

