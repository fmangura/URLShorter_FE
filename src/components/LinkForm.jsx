import React, {useState, useContext, useEffect} from 'react';
import { SessionContext } from '../context';
import useForm from '../components/useForm';
import ReCAPTCHA from 'react-google-recaptcha';
import backend from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './LinkForm.css';

const GOOGLE_SITE_KEY = `${process.env.VITE_GOOGLE_CLIENT_KEY}`
const recaptchaRef = React.createRef();


export default function LinkForm() {
    const {formData, handleChange, resetForm, setFormData} = useForm({url:'', timer:'', tag:'', msg:''});
    const { setAllLinks } = useContext(SessionContext);
    const [validForm, setValidForm] = useState(false);
    const [error, setError] = useState({url: false, tag: false, timer: false});
    const [txtCount, setTxtCount] = useState(0);
    const [aniButton, setAniButton] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({status:'',icon:''});

    async function handleSubmitLink(e) {
        e.preventDefault();

        Object.keys(formData).map((key) => {
            if (key in error && !formData[key]) {
                setError(error => ({...error, [key]: true}))
            } else {
                setError(error => ({...error, [key]: false}))
            }
        })

        try {
            let res = await backend.convertLink(formData);
            if (res.error) throw res;
            setSubmitStatus({status:'success', icon:faCheck});
            setAniButton((aniButton) => !aniButton);
            resetForm();
            setTxtCount(0);
            recaptchaRef.current.reset();
            setTimeout(() => {
                setAllLinks(allLinks => [...allLinks, res]);
                setAniButton((aniButton) => !aniButton);
            },2000)
        } catch (err) {
            setAniButton((aniButton) => !aniButton);
            setSubmitStatus({status:'fail', icon:faXmark});
            recaptchaRef.current.reset();
            setTimeout(() => {
                setAniButton((aniButton) => !aniButton);
                setSubmitStatus({status:'',icon:''});
            },2000)
        }
    }

    function handleMsgChange(e) {
        let {value} = e.target;
        setTxtCount(value.length);
        if (value.length >= 160) return;
        handleChange(e);
    }

    function handleTagChange(e) {
        let {value} = e.target;
        if (value.length >= 24) return;
        handleChange(e);
    }

    function onChange() {
        const recaptchaValue = recaptchaRef.current.getValue();
        setFormData(data => ({...data, 'CaptchaToken': recaptchaValue}))
    }

    return (
        <div className='box-form'>
            <form className={`convertInput animate-form-${aniButton}`} onSubmit={handleSubmitLink}>
                {submitStatus.status == 'success' 
                    ? 
                    <div className={`animate-success-${aniButton}`}>Success!</div> 
                    : 
                    <div className={`animate-fail-${aniButton}`}>An error has occurred.</div> 
                }
                <div className={`animate-form-${aniButton}`}>
                    <textarea name='url' id='url-input' className={`form-input err-${error.url}`} onChange={handleChange} value={formData.url} placeholder='Insert URL here'></textarea>
                    <input type='text' name='tag' id='tag-input' className={`form-input err-${error.tag}`} onChange={handleTagChange} value={formData.tag} placeholder='Add nickname here'></input>
                    <input type='number' name='timer' min='1' max='60' id='timer-input' className={`form-input err-${error.timer}`} onChange={handleChange} value={formData.timer} placeholder='Timer'></input>
                </div>
                <div id={`msg-container`} className={`animate-form-${aniButton}`}>
                    <textarea className={`animate-form-${aniButton} form-input`} name="msg" id='msg-input'  onChange={handleMsgChange} value={formData.msg} placeholder='(Optional) Include message when re-routing'/>
                    <small className={`animate-form-${aniButton}`}>{`${txtCount}/160`}</small>
                </div>
                <div className={`captcha-container animate-form-${aniButton}`}>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={GOOGLE_SITE_KEY}
                        onChange={onChange}
                        size='normal'
                    />
                </div>
                <div className='button-container'>
                    {!aniButton ?
                        <button className={`animate-${aniButton}`}>Short</button>
                        :
                        <div className={`${submitStatus.status} animate-${aniButton}`}><FontAwesomeIcon icon={submitStatus.icon} /></div>
                    }
                </div>
            </form>
        </div>
    )
}