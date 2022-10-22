//Willmil11 is the owner && creator of WebServerjs 1.0 and this free software is under license !
//
//Put your html files in the Files folder
//
//To customise 404 error message: Replace the default page in the 404 folder with a custom 404 page
//[The custom 404 page must be named '404.html' to work]
//
//To run the server execute in a cmd 'node webserver.js' while being in the Webserver directory, you need to run this as root [Don't worry, I patched every security problems :)]
//
//If you have trouble using the Webserver:
//-Email: willmil1110@gmail.com
//-Dm me on Discord: willmil11#8988
//
//Enjoy !
//
//


const http = require("http");
const fs = require('fs').promises;

const requestListener = function (req, res) {
    requested = req.url;
    console.info("[Request] Requested url: '" + req.url + "' [From ip: " + req.connection.remoteAddress + "]");
    if (requested === "/404.html"){
        fs.readFile(__dirname + "/404/404.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
    }
    else{
        if (requested === "/"){
            fs.readFile(__dirname + "/Files/index.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                console.error("[Error] An error has occured, " + err);
                if (!`${err}`.includes("no such file or directory")){
                    res.writeHead(500);
                    res.end("<!doctype html><html><header><title>Error, " + err + "</title></header><body style='background-color: rgb(40, 40, 40)'><font color='white' face='arial'><center>[Webserver] Sorry an error has occured, " + err + "</center></font></body></html>");
                    return;
                }
                else{
                    res.writeHead(404);
                    res.end("<!doctype html><html><header><title>Redirecting...</title></header><body style='background-color: black;'></body></html><script>location.href = '/404.html';</script>")
                }
            });
        }
        else{
            fs.readFile(__dirname + "/Files" + requested)
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                console.error("[Error] An error has occured, " + err );
                if (!`${err}`.includes("no such file or directory")){
                    res.writeHead(500);
                    res.end("<!doctype html><html><header><title>Error, " + err + "</title></header><body style='background-color: rgb(40, 40, 40)'><font color='white' face='arial'><center>[Webserver] Sorry an error has occured, " + err + "</center></font></body></html>");
                    return;
                }
                else{
                    res.writeHead(404);
                    res.end("<!doctype html><html><header><title>Redirecting...</title></header><body style='background-color: black;'></body></html><script>location.href = '/404.html';</script>")
                }
            });
        }
    };
}

const host = '0.0.0.0';
const port = 80;

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.info(`[Webserver] Server running on port ${port}...`);
});