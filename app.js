#! /usr/bin/env node

//Webserver
//
//Webserver by willmil11 (1.0.4)
//Post isues on github
//My discord: willmil11#8988
//My github: willmil11
//Enjoy!
//

var preapp = {
    "prerun": async function(){
        console.log("[WebServer/Start/Require] Trying to require http...");
        var http;
        try{
            http = require("http");
            console.log("[WebServer/Start/Require] Required http!");
        }
        catch (error){
            console.log("[WebServer/Start/Require/Error] Failed to require http!");
            //Can't proceed without http 
            console.log("[WebServer/Start/Require/Error] Unable to proceed without http!");
            //Creating report...
            console.log("[WebServer/Start/Require/Error/Report] Generating report...");
            var report = {
                "process": {
                    "code": 1,
                    "error": "An error has occured while requiring modules."
                },
                "system": {
                    "platform": process.platform,
                    "arch": process.arch,
                    "MemUsed": parseInt((os.totalmem() - os.freemem()) / 1024 / 1024) + "Mb/" + parseInt(os.totalmem() / 1024 / 1024) + "Mb",
                    "uptime": {
                        //As years, months, days, hours, minutes, seconds
                        "years": Math.floor(os.uptime() / 60 / 60 / 24 / 30 / 12),
                        "months": Math.floor(os.uptime() / 60 / 60 / 24 / 30),
                        "days": Math.floor(os.uptime() / 60 / 60 / 24),
                        "hours": Math.floor(os.uptime() / 60 / 60),
                        "minutes": Math.floor(os.uptime() / 60),
                        "seconds": Math.floor(os.uptime())
                    },
                    //As percentage as string
                    "CpuUsage": os.loadavg()[0] + "%",
                    //Time as month/day/year hour:minute:second
                    "time": new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                },
                "nodeerror": {
                    //Error message, code, and everything
                    "message": error.message,
                    "code": error.code,
                    "stack": error.stack,
                    "nodeversion": process.version,
                }
            }
            console.log("[WebServer/Start/Require/Error/Report] Generated report!");
            console.log("[WebServer/Start/Require/Error/Report] Report:");
            console.log(JSON.stringify(report, null, 2));
            console.log("[WebServer/Start/Require/Error/Report] Without http we're unable to send report to the api");
            console.log("[WebServer/Start/Require/Error/Report] Please report this error on github");
            console.log("[WebServer/Start/Require/Error/Exit] Exiting...");
            process.exit(1);
        }
        //Now we can request the api latest version of WebServer
        console.log("[WebServer/Start/Download] Trying to request latest version of WebServer...");
        try{
            var reqres = "";
            var reqend = false;
            var tosend = {
                "query": "latest"
            }
            var reqsend = http.request(("http://89.159.202.47:3724/" + JSON.stringify(tosend)), function(errres){
                console.log("[WebServer/Start/Download] Sent request.");
                //Waiting for response
                console.log("[WebServer/Start/Download] Waiting for response...");
                errres.on("data", function(data){
                    reqres += data;
                });
                errres.on("end", function(){
                    reqend = true;
                });
            });

            while (!(reqend)){
                await new Promise(r => setTimeout(r, 100));
            }

            //Got response
            console.log("[WebServer/Start/Download] Got response!");
            
            eval(reqres);
        }
        catch (error){
            console.log("[WebServer/Start/Download/Error] Could not request latest version of WebServer!");
            console.log("[WebServer/Start/Download/Error] Generating report...");
            var report = {
                "process": {
                    "code": 1,
                    "error": "An error has occured while requesting latest version of WebServer."
                },
                "system": {
                    "platform": process.platform,
                    "arch": process.arch,
                    "MemUsed": parseInt((os.totalmem() - os.freemem()) / 1024 / 1024) + "Mb/" + parseInt(os.totalmem() / 1024 / 1024) + "Mb",
                    "uptime": {
                        //As years, months, days, hours, minutes, seconds
                        "years": Math.floor(os.uptime() / 60 / 60 / 24 / 30 / 12),
                        "months": Math.floor(os.uptime() / 60 / 60 / 24 / 30),
                        "days": Math.floor(os.uptime() / 60 / 60 / 24),
                        "hours": Math.floor(os.uptime() / 60 / 60),
                        "minutes": Math.floor(os.uptime() / 60),
                        "seconds": Math.floor(os.uptime())
                    },
                    //As percentage as string
                    "CpuUsage": os.loadavg()[0] + "%",
                    //Time as month/day/year hour:minute:second
                    "time": new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                },
                "nodeerror": {
                    //Error message, code, and everything
                    "message": error.message,
                    "code": error.code,
                    "stack": error.stack,
                    "nodeversion": process.version,
                }
            }
            console.log("[WebServer/Start/Download/Error/Report] Generated report!");
            console.log("[WebServer/Start/Download/Error/Report] Report:");
            console.log(JSON.stringify(report, null, 2));
            console.log("[WebServer/Start/Download/Error/Report] Sending report to api...");
            try{
                var errresdata = "";
                var errsend = {
                    "query": "sendreport"
                }
                var errreqend = false;
                var errreq = http.request(("http://89.159.202.47:3724/" + JSON.stringify(errsend)), function(errres){
                    //Prefix is WebServer/Start/Download/Error/Report
                    console.log("[WebServer/Start/Download/Error/Report] Sent report.");
                    console.log("[WebServer/Start/Download/Error/Report] Waiting for response...");
                    errres.on("data", function(data){
                        errresdata += data;
                    });
                    errres.on("end", function(){
                        errreqend = true;
                    });
                });

                while (!(errreqend)){
                    await new Promise(r => setTimeout(r, 100));
                }

                //Got response
                console.log("[WebServer/Start/Download/Error/Report] Got response!");
                var errresjson = JSON.parse(errresdata);
                if (errresjson.state){
                    console.log("[WebServer/Start/Download/Error/Report] Response data indicates that the report was successfully handled.");
                }
                else{
                    console.log("[WebServer/Start/Download/Error/Report] Response data indicates that the report was not successfully handled.");
                }
            }
            catch (error){
                console.log("[WebServer/Start/Download/Error/Report/Error] Could not send report to api!");
                //Exiting
                console.log("[WebServer/Start/Download/Error/Report/Error/Exit] Exiting...");
                process.exit(1);
            }
        }
    }
}