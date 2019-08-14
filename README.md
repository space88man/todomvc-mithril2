# Todomvc updated for Mithril 2

The existing example in the todomvc repo https://github.com/tastejs/todomvc
is based on Mithril 0.2.5. This example is updated for Mithril 2.

This repo is ready-to-serve with any web server: the support files (CSS, JS) have been extracted
out. The original source files (relative to the Todomvc repo) are:

* `learn.json`: `./learn.json`
* `css/base.css`: `./node_modules/todomvc-common/base.css`
* `js/base.js`: `./node_modules/todomvc-common/base.js`
* `css/index.css`: `./node_modules/todomvc-app-css/index.css`


The Mithril JS file `js/mithril.js` is taken from `mithril@2.0.3`.


This repo uses native Javascript modules and downloads the JS files from your web server
without the `.js` suffix; ensure the web server does suitable URL rewriting.
I.e.,  when Javascript requests `import ... <some_module>`, the browser module loader will
do a `GET <some_module>`; if the files on the web server filesystem have the `.js`
suffix, then you will need to have a rewrite rule to locate the correct file. Native module
loading seems to be working with Chrome 77/Firefox 68.


## Development with Webpack

The Javascript files can also be bundled to avoid native module loading.
Use `index-dev.html` as the landing page. Note that the JS files are still using
a global `m` object.

```
# Use this to bundle or to avoid using native modules

npm install webpack webpack-cli --save-dev
node_modules/.bin/webpack js/app.js --output bin/app.js
```

Use your favourite development server (pointing to `index-dev.html`...).

## Example lighttpd configuration to serve this repo
The files can be served directly from this directory.
Use this to simulate a production webserver apache/nginx etc.

```
# --- cut here ---
# save this file to todomvc.conf
# lighttpd -f todomvc.conf -D
server.document-root = "FILL_IN_PATH_TO_THIS_DIRECTORY/"
var.conf_dir = "/etc/lighttpd"


server.port = 8080
# ssl.engine = "enable"
# ssl.pemfile = "my-server.pem"
# ssl.privkey = "my-server-key.pem"

mimetype.assign = (
  ".html" => "text/html",
  ".txt" => "text/plain",
  ".jpg" => "image/jpeg",
  ".png" => "image/png",
  ".css" => "text/css",
  ".js" => "application/javascript"
)


index-file.names   = ( "index.php", "index.html",
                                  "index.htm", "default.htm" )

server.modules = ( "mod_access",
  "mod_openssl",
  "mod_rewrite"
 )

url.rewrite-once = ("^/js/.*/.*\.js$" => "${url.path}",
  "^/js/.*/.*$" => "${url.path}.js")
# --- end cut ---
```
