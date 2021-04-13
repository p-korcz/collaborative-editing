const WebSocket = require('ws');
const TimestampUtils = require('./utils/timestamp-utils');
const { parse, stringify } = require('./utils/parse-utils');

class WebSocketServer {
    constructor() {
        this.state = {};
        this.socket = new WebSocket.Server({ port: process.env.PORT });
        this.socket.on('connection', (ws) => {
            ws.onmessage = this.handleWSMessage;
        });
    }

    handleWSMessage = ({ data }) => {
        if (data === 'init') return this.send(stringify(this.state));

        const parsedMessage = parse(data);

        const currentDate = TimestampUtils.setTimestampList(this.state);
        const newDate = TimestampUtils.setTimestampList(parsedMessage);

        TimestampUtils.removeOutdatedData(currentDate, newDate, parsedMessage);
        this.state = { ...this.state, ...parsedMessage };
        return this.send(stringify(this.state));
    };

    send = (data) => {
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };
}

new WebSocketServer();
