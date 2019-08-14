// js/views/footer-view.js

function Footer(data, filter) {
    var amountCompleted = data.amountCompleted();
    var amountActive = data.amountActive();

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
		     onclick: () => data.clearCompleted(),
		 }, 'Clear completed')
	     ]
	    );
};

export default Footer;
