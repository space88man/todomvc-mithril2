# Todomvc updated for Mithril 2

The existing example in the todomvc repo https://github.com/tastejs/todomvc
is based on Mithril 0.2.5. This example is updated for Mithril 2.

In this repo we have extracted out the support files (CSS, JS) instead
of git'ing `node_modules/`. The source files (relative to the Todomvc repo) are:

* `learn.json`: `./learn.json`
* `css/base.css`: `./node_modules/todomvc-common/base.css`
* `js/base.js`: `./node_modules/todomvc-common/base.js`
* `css/index.css`: `./node_modules/todomvc-app-css/index.css`


The Mithril JS file `js/mithril.js` is taken from `mithril@2.0.3`.


This repo uses native Javascript modules and downloads the JS files from your webserver
without the `.js` suffix; make sure your webserver does suitable URL rewriting.


## Example lighttpd configuration to serve this repo

```
# --- cut here ---
# save this file to todomvc.conf
# lighttpd -f todomvc.conf -D
server.document-root = "."
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
