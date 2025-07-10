import {useState} from 'react';

function useForm(form) {
    const [formData, setFormData] = useState(form);

    function handleChange(e) {
        const {name, value} = e.target;
        if (name == 'url') {
            let rgx = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)*([a-zA-Z0-9-]+)(?=\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)/
            let root = value.match(rgx);
            root = root ? root[1] : ''
            setFormData(data => ({...data, ['tag']: root}))
        }
        setFormData(data => ({...data, [name]: value}))
    }

    const resetForm = () => {
        setFormData(form);
    }

    return {formData, handleChange, resetForm, setFormData };
}

export default useForm;