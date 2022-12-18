# Webserver

## Description:

This is WebServer 1.0.4, it's a node.js based webserver,
if you don't know what's a webserver, it's something like
apache

## Run:
    npx @willmil11/webserver /path/to/files port

## 404 custom error page:
    The 404.html file must be in the root directory of the provided
    path. If it's not there, the default 404 page will be used.

## Update:

    npx clear-npx-cache

    Then the next time you run the webserver it will update

## Logs:
    This webserver log every request. You can find the logs at these paths:

    -Errors logs: /home/webserver/Error/
    -Success logs: /home/webserver/Request/