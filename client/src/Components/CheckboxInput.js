import React, { useLayoutEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

export const CheckboxInput = ({ name, value, checkboxState, onClick }) => {
    const checkedProp = (checkboxState[value] || { checked: false }).checked;
    const [checked, setChecked] = useState(checkedProp);

    const onChange = (evt) => {
        onClick(evt, new Date());
        setChecked(evt.target.checked);
    };

    useLayoutEffect(() => {
        setChecked(checkedProp);
    }, [checkedProp]);

    return (
        <Form.Check
            className='px-5 py-1'
            type='checkbox'
            name={name}
            label={value}
            value={value}
            defaultChecked={checkedProp}
            checked={checked}
            onChange={onChange}
        />
    );
};
