var WEBSOCKET_PASSWORD = "ENTER PASSWORD HERE";

$(function() {

    if ("WebSocket" in window) {
        ws = new WebSocket("ws://" + document.domain + ":8000/websocket");
        ws.onmessage = function (msg) {
            var message = JSON.parse(msg.data);
	    var output = message.output.replace(/\n/g, '<br/>').replace(/  /g, '&nbsp;&nbsp;');
            $("p#log").html(output);
        };
    };

    $("#chat_form").on('submit', function(e){
        e.preventDefault();

        ws.send(JSON.stringify({'output': WEBSOCKET_PASSWORD}));
    });


    window.onbeforeunload = function() {
        ws.onclose = function () {};
        ws.close()
    };
});

