// js/views/footer-view.js
import Data from '../models/Data';

function Footer(initialVnode) {

  return {
    view: vnode => {
      var filter = vnode.attrs.filter;
      var amountActive = Data.amountActive();

      return m('footer.footer',
	       [
		 m('span.todo-count', [
		   m('strong', amountActive), ' item' + (amountActive !== 1 ? 's' : '') + ' left'
		 ]),
		 m('ul.filters', [
		   m('li', [
		     m(m.route.Link, {
		       href: "/",
		       class: filter === '' ? 'selected' : ''
		     }, 'All')
		   ]),
		   m('li', [
		     m(m.route.Link, {
		       // config: m.route,
		       href: "/active",
		       class: filter === 'active' ? 'selected' : ''
		     }, 'Active')
		   ]),
		   m('li', [
		     m(m.route.Link, {
		       href: "/completed",
		       class: filter === 'completed' ? 'selected' : ''
		     }, 'Completed')
		   ])
		 ]),
		 m('button.clear-completed', {
		   onclick: () => Data.clearCompleted(),
		 }, 'Clear completed')
	       ])
    },
  }
};

export default Footer;
