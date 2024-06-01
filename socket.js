
var atatus = require("atatus-nodejs");
atatus.start({
    licenseKey: "lic_apm_01141fb12c8c468f953fd6c94b631d98",
    appName: "socket-source-map",
});
// var atatus = require("atatus-nodejs");

// atatus.start({
//     licenseKey: "lic_apm_01141fb12c8c468f953fd6c94b631d98",
//     appName: "socket-source-map",
//     enabled:true,
//     notifyHost:"10.40.30.105",
//     notifyPort:"8091",
//     useSSL:false,
//     analytics:true,
//     analyticsCaptureOutgoing: true,
//     logBody: 'all',    
// });
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path=require('path');

port=5555;



app.get('/', function(req, res){
	const filePath = path.join(__dirname, 'public', 'index.html');

   	res.sendFile(filePath);});

users = [];
io.on('connection', function(socket){
   console.log('A user connected');
   socket.on('setUsername', function(data){
      console.log(data);
      if(users.indexOf(data) > -1){
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
   socket.on('disconnect',function(){
   	console.log("user DisConnected");
   })
});

http.listen(port, function(){
   console.log(`listening on localhost:3000`);
});