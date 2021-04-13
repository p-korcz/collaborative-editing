import { CheckboxInput } from '../CheckboxInput';

export default function Fieldset({ values, name, onClick, checkboxState }) {
    const checkboxes = values.map((value, index) => (
        <CheckboxInput
            key={index}
            name={name}
            value={value}
            onClick={onClick}
            checkboxState={checkboxState}
        />
    ));

    return (
        <fieldset className='border rounded justify-content-center d-flex w-40'>
            <legend className='w-auto mb-0 h6'>{name}</legend>
            {checkboxes}
        </fieldset>
    );
}
