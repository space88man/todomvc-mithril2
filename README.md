# Todomvc updated for Mithril 2

The existing example in the todomvc repo https://github.com/tastejs/todomvc
is based on Mithril 0.2.5. This example is updated for Mithril 2.

In this repo we have extracted out the support files (CSS, JS) instead 
of git'ing `node_modules/`. The source files (relative to the Todomvc repo) are:

* `learn.json`: `./learn.json`
* `css/base.css`: `./node_modules/todomvc-common/base.css`
* `js/base.js`: `./node_modules/todomvc-common/base.js`
* `css/index.js`: `./node_modules/todomvc-app-css/index.css`


The Mithril JS file `js/mithril.js` is taken from `mithril@2.0.3`.


This repo uses native Javascript modules and downloads the JS files from your webserver
without the `.js` suffix; make sure your webserver does suitable URL rewriting. 


