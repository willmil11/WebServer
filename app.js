#! /usr/bin/env node

//Webserver
//
//Webserver by willmil11 (2.0.0)
//Post isues on github
//My discord: willmil11#8988
//My github: willmil11
//Enjoy!
//

//Require http module
var http = require('http');
//Require fs module
var fs = require('fs');

//Require child process
var exec = require('child_process').exec;

//Get process args
var args = process.argv.slice(2);

//Get port from agrs
var port = args[1];
//Get path from args
var path = args[0];

console.log("[Webserver] Started Webserver...");

function savelog(IsError, log){
    var date = (Date().slice(4, -42));
    var date_arr = date.split(" ");
    var date = date_arr[1] + "-" + date_arr[2] + "-" + date_arr[3] + ":" + date_arr[4];
    var date_transform = date.slice(0, -10);
    var date = date_transform;
    var loop = true;
    while (loop === true){
        if (IsError){
            if (fs.existsSync("/home/Webserver/")){
                if (fs.existsSync("/home/Webserver/Log/")){
                    if (fs.existsSync("/home/Webserver/Log/Error/")){
                        fs.closeSync(fs.openSync(("/home/Webserver/Log/Error/" + date + ".json"), 'w'));
                        fs.writeFileSync(("/home/Webserver/Log/Error/" + date + ".json"), `${JSON.stringify(log)}`, "utf8");
                        loop = false;
                    }
                    else{
                        fs.mkdirSync("/home/Webserver/Log/Error/");
                        fs.closeSync(fs.openSync(("/home/Webserver/Log/Error/" + date + ".json"), 'w'));
                        fs.writeFileSync(("/home/Webserver/Log/Error/" + date + ".json"), `${(JSON.stringify(log))}`, 'utf8');
                        loop = false;
                    }
                }
                else{
                    fs.mkdirSync("/home/Webserver/Log/");
                }
            }
            else{
                fs.mkdirSync("/home/Webserver/");
            }
        }
        else{
            if (fs.existsSync("/home/Webserver/")){
                if (fs.existsSync("/home/Webserver/Log/")){
                    if (fs.existsSync("/home/Webserver/Log/Request/")){
                        fs.closeSync(fs.openSync(("/home/Webserver/Log/Request/" + date + ".json"), 'w'));
                        fs.writeFileSync(("/home/Webserver/Log/Request/" + date + ".json"), `${JSON.stringify(log)}`, "utf8");
                        loop = false;
                    }
                    else{
                        fs.mkdirSync("/home/Webserver/Log/Request/");
                        fs.closeSync(fs.openSync(("/home/Webserver/Log/Request/" + date + ".json"), 'w'));
                        fs.writeFileSync(("/home/Webserver/Log/Request/" + date + ".json"), `${(JSON.stringify(log))}`, 'utf8');
                        loop = false;
                    }
                }
                else{
                    fs.mkdirSync("/home/Webserver/Log/");
                }
            }
            else{
                fs.mkdirSync("/home/Webserver/");
            }
        }
    }
}

//Define GenProcessId
function GenProcessId(length){
    var id = "";
    var index = 0;
    while (index < length){
        //Gen random integer
        var random = Math.floor(Math.random() * 10);
        //Add random integer to id
        id += random;
        //Add 1 to index
        index += 1;
    }
    return id;
}

//Try to create server
try {
    if (isNaN(port)) {
        throw "undefined";
    }
    if (!fs.existsSync(path)) {
        throw "undefined";
    }
    var server = http.createServer(function(req, res) {
        var log = {
            type: "request",
            status: undefined,
            processid: undefined,
            detail: {
                filetype: undefined,
                url: req.url,
                method: req.method,
                headers: req.headers,
                ip: undefined,
                http_status: undefined,
            }
        }
        console.log("[Webserver/Request] Request recieved");
        console.log("[Webserver/Request] Generating process id...");
        log.processid = GenProcessId(5);
        console.log("[Webserver/" + log.processid + "] Process id generated");
        console.log("[Webserver/" + log.processid + "] Getting ip...");
        log.detail.ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress
        console.log("[Webserver/" + log.processid + "] Ip recieved (" + log.detail.ip + ")");
        console.log("[Webserver/" + log.processid + "] Requested url: '" + log.detail.url + "'");
        if ((req.method === "GET")) {
            console.log("[Webserver/" + log.processid + "] Getting file type...");
        var filetype = req.url.split(".");
        log.detail.filetype = filetype[filetype.length - 1];
        console.log("[Webserver/" + log.processid + "] File type recieved (" + log.detail.filetype + ")");
        console.log("[Webserver/" + log.processid + "] Getting file...");
        try {
            if (log.detail.url === "/"){
                log.detail.url = "/index.html";
                log.detail.filetype = "html";
            }
            var file = fs.readFileSync((path + log.detail.url), "utf8");
            console.log("[Webserver/" + log.processid + "] File recieved");
            console.log("[Webserver/" + log.processid + "] Sending file...");
            //Depending on file type send different headers
            if (log.detail.filetype === "html"){
                res.writeHead(200, {"Content-Type": "text/html"});
            }
            else{
                if (log.detail.filetype === "css"){
                    res.writeHead(200, {"Content-Type": "text/css"});
                }
                else{
                    if (log.detail.filetype === "js"){
                        res.writeHead(200, {"Content-Type": "text/javascript"});
                    }
                    else{
                        if (log.detail.filetype === "png"){
                            res.writeHead(200, {"Content-Type": "image/png"});
                        }
                        else{
                            if (log.detail.filetype === "jpg"){
                                res.writeHead(200, {"Content-Type": "image/jpg"});
                            }
                            else{
                                if (log.detail.filetype === "jpeg"){
                                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                                }
                                else{
                                    if (log.detail.filetype === "gif"){
                                        res.writeHead(200, {"Content-Type": "image/gif"});
                                    }
                                    else{
                                        if (log.detail.filetype === "svg"){
                                            res.writeHead(200, {"Content-Type": "image/svg+xml"});
                                        }
                                        else{
                                            if (log.detail.filetype === "ico"){
                                                res.writeHead(200, {"Content-Type": "image/x-icon"});
                                            }
                                            else{
                                                if (log.detail.filetype === "json"){
                                                    res.writeHead(200, {"Content-Type": "application/json"});
                                                }
                                                else{
                                                    if (log.detail.filetype === "xml"){
                                                        res.writeHead(200, {"Content-Type": "application/xml"});
                                                    }
                                                    else{
                                                        if (log.detail.filetype === "pdf"){
                                                            res.writeHead(200, {"Content-Type": "application/pdf"});
                                                        }
                                                        else{
                                                            res.writeHead(200, {"Content-Type": "text/plain"});
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //Send the file
            res.end(file);
            log.status = "success";
            log.detail.http_status = 200;
            console.log("[Webserver/" + log.processid + "] File sent");
            console.log("[Webserver/" + log.processid + "/Sucess] Request successfully completed");
            console.log("[Webserver/" + log.processid + "/Sucess] ");
            console.log("[Webserver/" + log.processid + "/Sucess] Saving request to new log file...");
            console.log("[Webserver/" + log.processid + "/Sucess] What will be logged:");
            console.log("[Webserver/" + log.processid + "/Sucess] ");
            console.log("[Webserver/" + log.processid + "/Sucess] " + JSON.stringify(log));
            console.log("[Webserver/" + log.processid + "/Sucess] ");
            try{
                savelog(false, log);
                console.log("[Webserver/" + log.processid + "/Sucess] Log file saved to " + ("/home/Webserver/logs/Sucess"));
            }
            catch (error){
                console.log("[Webserver/" + log.processid + "/Sucess] Error while saving log file");
                console.log("[Webserver/" + log.processid + "/Sucess] Error: " + error);
            }
        }
        catch (error){
            console.log("[Webserver/" + log.processid + "/Error] An error has occured:");
            console.log("[Webserver/" + log.processid + "/Error] ");
            console.log("[Webserver/" + log.processid + "/Error] Unable to process the request");
            console.log("[Webserver/" + log.processid + "/Error] Diagnosying error...");
            //If error is file not found
            if (`${error}`.includes("no such file or directory")){
                console.log("[Webserver/" + log.processid + "/Error] File not found");
                console.log("[Webserver/" + log.processid + "/Error] ");
                console.log("[Webserver/" + log.processid + "/Error] Sending 404 error...");
                res.writeHead(404, {"Content-Type": "text/html"});
                //Checking if custom 404 page exists
                if (fs.existsSync(path + "/404.html")){
                    console.log("[Webserver/" + log.processid + "/Error] Custom 404 page found");
                    console.log("[Webserver/" + log.processid + "/Error] Sending custom 404 page...");
                    var file = fs.readFileSync((path + "/404.html"), "utf8");
                    res.end(file);
                }
                else{
                    console.log("[Webserver/" + log.processid + "/Error] Custom 404 page not found");
                    console.log("[Webserver/" + log.processid + "/Error] Sending default 404 page...");
                    res.end("<html><header><title>404 - Not found</title></header><body><font color='white' face='arial'>404 - Not found</font></body></html><script>document.body.style.backgroundColor = 'rgb(11, 11, 10)'</script>");
                }
                log.status = "error";
                log.detail.http_status = 404;
                console.log("[Webserver/" + log.processid + "/Error] 404 error sent");
                console.log("[Webserver/" + log.processid + "/Error] ");
                console.log("[Webserver/" + log.processid + "/Error] Saving error to new log file...");
                console.log("[Webserver/" + log.processid + "/Error] What will be logged:");
                console.log("[Webserver/" + log.processid + "/Error] ");
                console.log("[Webserver/" + log.processid + "/Error] " + JSON.stringify(log));
                console.log("[Webserver/" + log.processid + "/Error] ");
                try{
                    savelog(true, log);
                    console.log("[Webserver/" + log.processid + "/Error] Log file saved to " + ("/home/Webserver/logs/Error"));
                }
                catch (error){
                    console.log("[Webserver/" + log.processid + "/Error] Error while saving log file");
                    console.log("[Webserver/" + log.processid + "/Error] Stack trace: " + error);
                }

            }
            else{
                console.log("[Webserver/" + log.processid + "/Error] Unknown error");
                console.log("[Webserver/" + log.processid + "/Error] ");
                console.log("[Webserver/" + log.processid + "/Error] Sending 500 error...");
                res.writeHead(500, {"Content-Type": "text/html"});
                //Checking if custom 500 page exists
                if (fs.existsSync(path + "/500.html")){
                    console.log("[Webserver/" + log.processid + "/Error] Custom 500 page found");
                    console.log("[Webserver/" + log.processid + "/Error] Sending custom 500 page...");
                    var file = fs.readFileSync((path + "/500.html"), "utf8");
                    res.end(file);
                }
                else{
                    console.log("[Webserver/" + log.processid + "/Error] Custom 500 page not found");
                    console.log("[Webserver/" + log.processid + "/Error] Sending default 500 page...");
                    res.end("<html><header><title>500 - Internal server error</title></header><body><font color='white' face='arial'>500 - Internal server error</font></body></html><script>document.body.style.backgroundColor = 'rgb(11, 11, 10)'</script>");
                }
                log.status = "error";
                log.detail.http_status = 500;
                console.log("[Webserver/" + log.processid + "/Error] 500 error sent");
                console.log("[Webserver/" + log.processid + "/Error] ");
                console.log("[Webserver/" + log.processid + "/Error] Saving error to new log file...");
                console.log("[Webserver/" + log.processid + "/Error] What will be logged:");
                console.log("[Webserver/" + log.processid + "/Error] ");
                console.log("[Webserver/" + log.processid + "/Error] " + JSON.stringify(log));
                console.log("[Webserver/" + log.processid + "/Error] ");
                try{
                    savelog(true, log);
                    console.log("[Webserver/" + log.processid + "/Error] Log file saved to " + ("/home/Webserver/logs/Error"));
                }
                catch (error){
                    console.log("[Webserver/" + log.processid + "/Error] Error while saving log file");
                    console.log("[Webserver/" + log.processid + "/Error] Stack trace: " + error);
                }
            }
        }
        }
        else{
            log.status = "error";
            console.log("[Webserver/" + log.processid + "/Error] An error has occured:");
            console.log("[Webserver/" + log.processid + "/Error] ");
            console.log("[Webserver/" + log.processid + "/Error] Unable to process the request");
            console.log("[Webserver/" + log.processid + "/Error] Diagnosying error...");
            console.log("[Webserver/" + log.processid + "/Error] Method not supported: " + log.detail.method);
            console.log("[Webserver/" + log.processid + "/Error] ");
            log.detail.http_status = 405;
            console.log("[Webserver/" + log.processid + "/Error] Sending error code 405");
            res.writeHead(405, {"Content-Type": "text/html"});
            res.end("Error 405: Method not supported");
            console.log("[Webserver/" + log.processid + "/Error] Error code sent");
            console.log("[Webserver/" + log.processid + "/Error] ");
            console.log("[Webserver/" + log.processid + "/Error] Saving error to a new log file...");
            console.log("[Webserver/" + log.processid + "/Error] What will be logged:");
            console.log("[Webserver/" + log.processid + "/Error] ");
            console.log("[Webserver/" + log.processid + "/Error] " + JSON.stringify(log));
            console.log("[Webserver/" + log.processid + "/Error] ");
            try{
                savelog(true, log);
                console.log("[Webserver/" + log.processid + "/Error] Error log saved to " + ("/home/Webserver/Log/Error/"));
            }
            catch (error){
                console.log("[Webserver/" + log.processid + "/Error] Unable to log the request to a new log file...");
                console.log("[Webserver/" + log.processid + "/Error] Stack trace: " + error);
            }
        }
    }).listen(port);
}
catch (error){
    var log = {
        type: {
            type: "error",
            detail: "Could not create server"
        },
        detail: undefined,
        stack_trace: error
    };
    console.log("[Webserver/Error] An error has occured:");
    console.log("[Webserver/Error]");
    console.log("[Webserver/Error] Unable to create server");
    console.log("[Webserver/Error] Diagnosying error...");
    //If port is already in use
    if (`${error}`.includes("EADDRINUSE")){
        console.log("[Webserver/Error] Port is already in use");
        log.detail = "Port is already in use";
    }
    else{
        //If port permission is denied
        if (`${error}`.includes("EACCES")){
            console.log("[Webserver/Error] Port permission denied");
            log.detail = "Port permission denied";
        }
        else{
            if (`${error}`.includes("EADDRNOTAVAIL")){
                console.log("[Webserver/Error] Port is not available");
                log.detail = "Port is not available";
            }
            else{
                if (isNaN(port)){
                    console.log("[Webserver/Error] Port arg is not a number");
                    log.detail = "Port arg is not a number";
                }
                else{
                    if (!fs.existsSync(path)){
                        console.log("[Webserver/Error] Path does not exist");
                        log.detail = "Path does not exist";
                    }
                    else{
                        console.log("[Webserver/Error] Unknown error");
                        log.detail = "Unknown error";
                    }
                }
            }
        }
    }
    console.log("[Webserver/Error]");
    console.log("[Webserver/Error] Stack trace: " + error);
    console.log("[Webserver/Error]");
    console.log("[Webserver/Error] Saving error to a new log file...");
    console.log("[Webserver/Error] What will be logged: ");
    console.log("[Webserver/Error]");
    console.log("[Webserver/Error] " + JSON.stringify(log));
    console.log("[Webserver/Error]");
    //Save error to error.log
    try{
        savelog(true, log);
        console.log("[Webserver/Error] Error log saved to " + ("/home/Webserver/Log/Error/"));
    }
    catch(error){
        console.log("[Webserver/Error] Unable to log the error to a new log file...");
        console.log("[Webserver/Error] Stack trace: " + error);
    }}