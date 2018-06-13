var request = require('request');

var dash_button = require('node-dash-button');
var dash = dash_button("50:f5:da:6b:5d:df", null, 6000); //address from step above

RedisSMQ = require("rsmq");
rsmq = new RedisSMQ({ host: "192.168.0.102", port: 6379, ns: "rsmq" });
rsmq.createQueue({ qname: "myqueue" }, (err, resp) => {
	if (resp === 1) { console.log("queue created") }
});

var sendmsg = (id, action) => {
	var msg = JSON.stringify({ id: id, action: action });
	rsmq.sendMessage({ qname: "myqueue", message: msg }, (err, resp) => {
		if (resp) { console.log("Message sent. ID:", resp); }
	});
};

dash.on("detected", function () {
	sendmsg(6, 'off');
});

