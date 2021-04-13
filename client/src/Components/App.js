import { useEffect, useMemo, useState } from 'react';

import WebSocketClient from '../Net/WebSocketClient';
import Fieldset from './Common/Fieldset';
import { stringify } from '../utils';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [prevCheckboxState, setPrevCheckboxState] = useState({});
    const [checkboxState, setCheckboxState] = useState({});
    const ws = useMemo(
        () => new WebSocketClient().init(setPrevCheckboxState),
        [],
    );

    useEffect(() => {
        ws.checkboxState = checkboxState;
        if (ws.socket.readyState === WebSocket.OPEN)
            ws.socket.send(stringify(checkboxState));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkboxState]);

    const setCheckboxValue = (evt, date) => {
        const { checked, name, value } = evt.target;
        setCheckboxState((prevState) => ({
            ...prevState,
            [value]: {
                checked: checked,
                listType: name,
                timestamp: date,
            },
        }));
    };

    return (
        <div className='container-center'>
            <Fieldset
                values={[1, 2, 3]}
                name='first'
                onClick={setCheckboxValue}
                checkboxState={prevCheckboxState}
            />
            <Fieldset
                values={['a', 'b']}
                name='second'
                onClick={setCheckboxValue}
                checkboxState={prevCheckboxState}
            />
        </div>
    );
}

export default App;
