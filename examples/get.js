const coap       = require('coap')
     ,requestURI = 'coap://localhost/'
     ,url        = require('url').parse(requestURI + 'id/1/')
     ,req        = coap.request(url)
     ,bl         = require('bl');

req.setOption('Block2',  new Buffer([0x2]));
req.setHeader("Accept", "application/json");
req.on('response', function(res) {
	res.pipe(bl(function(err, data) {
		var json = JSON.parse(data);
		console.log(json);
	}));

});
req.end();

var req2 = coap.request(url);
req2.setHeader("Accept", "application/xml");
req2.on('response', function(res2) {
    res2.pipe(bl(function(err, data) {
        console.log("XML:" + data);
    }));

});

req2.end();