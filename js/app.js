// js/app.js

/*global m */

import {MainView} from './views/main-view';

m.route(document.querySelector('.todoapp'), '/', {
  '/': MainView,
  '/:filter': MainView
});
