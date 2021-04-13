import { parse, stringify } from '../utils';
import {
    RECONNECT_ATTEMPTS,
    WS_EVENT_CLOSE_CODE,
    INIT_KEY,
    WS_HOST_URL,
} from '../consts';

export default class WebSocketClient {
    reconnectAttempt = 0;
    currentState = null;

    set checkboxState(state) {
        this.currentState = state;
    }

    init(setCheckboxState) {
        this.setState = setCheckboxState;
        this.socket = new WebSocket(`ws://${WS_HOST_URL}`);
        this.socket.onopen = this.handleWSOpen;
        this.socket.onerror = this.handleWSError;
        this.socket.onclose = this.handleWSClose;
        this.socket.onmessage = this.handleWSMessage;
        return this;
    }

    handleWSOpen = () => {
        if (this.socket.readyState === WebSocket.OPEN) {
            if (this.reconnectAttempt) {
                this.currentState && this.send(stringify(this.currentState));
                this.reconnectAttempt = 0;
            }
            this.send(INIT_KEY);
        }
    };

    handleWSError = () => {
        this.socket.close();
    };

    handleWSMessage = ({ data }) => {
        const parsedData = parse(data);
        this.setState(parsedData);
    };

    handleWSClose = ({ code }) => {
        if (code === WS_EVENT_CLOSE_CODE.CLOSE_ABNORMAL) {
            if (this.reconnectAttempt <= RECONNECT_ATTEMPTS) {
                this.reconnect();
            }
            this.reconnectAttempt++;
        }
    };

    send = (data) => {
        this.socket.send(data);
    };

    reconnect = () => {
        setTimeout(() => {
            this.init(this.setState);
        }, 3000);
    };
}
