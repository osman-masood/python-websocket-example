# coding: utf-8
from subprocess import Popen, PIPE
import json

def handle_websocket(ws):
    while True:
        message = ws.receive()
        if message is None or json.loads(message)['output'] != 'ENTER PASSWORD HERE':
            break

        (message, stderr) = Popen(["top", "-b", "-p",  "1", "-n", "1"], stdout=PIPE).communicate()
	if stderr:
	    message = "An error occurred"

	ws.send(json.dumps({'output': message}))


