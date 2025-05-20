import React, {useState, useEffect, useContext} from 'react';
import useForm from '../components/useForm';
import { SessionContext } from '../context';
import backend from '../api';
import Timer from '../helpers/timer';
import LinkCard from '../components/linkCard'
import ChatCard from '../components/ChatCard'
import Dial from '../helpers/dial';
import './Home.css'
import Logo from '../../public/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faHourglassStart } from '@fortawesome/free-solid-svg-icons';


export default function Home () {
    const {formData, handleChange, resetForm} = useForm({url:'', timer:'', tag:'', msg:''});
    const {currSession, 
            allLinks, 
            setAllLinks, 
            isLoading, 
            getAllLinks } = useContext(SessionContext);
    const [errorMsg, setErrorMsg] = useState(null);
    const [inView, setInView] = useState(false);
    const [txtCount, setTxtCount] = useState(0);

    
    useEffect(() => {
        window.addEventListener('focus', () => getAllLinks());
    },[])

    async function handleSubmitLink(e) {
        e.preventDefault();
        try {
            await backend.convertLink(formData).then(res => {
                setAllLinks(allLinks => [...allLinks, res]);
            })
            getAllLinks();
            resetForm();
            setTxtCount(0);
        } catch (err) {

        }
    }

    async function handleMsgChange(e) {
        let {value} = e.target;
        setTxtCount(value.length);
        if (value.length >= 160) return;
        handleChange(e);
    }

    return (
        <div className='home-body' style={{display:'flex', flexDirection:'column'}}>
            <img src={Logo} alt="" style={{height:'160px', justifySelf:'center'}}/>
            <div className='box-1'>
                <div className='box-form'>
                    <h6>session: {currSession}</h6>
                    <h1>URLSH</h1>
                    <form className='convertInput' onSubmit={handleSubmitLink}>
                        <input type='text' name='url' id='url-input' onChange={handleChange} value={formData.url} placeholder='Insert URL here'></input>
                        <input type='text' name='tag' id='tag-input' onChange={handleChange} value={formData.tag} placeholder='Add nickname here'></input>
                        <input type='number' name='timer' min='1' max='60' id='timer-input' onChange={handleChange} value={formData.timer} placeholder='Timer'></input>
                        <button>Shorter</button>
                        <textarea name="msg" id='msg-input' onChange={handleMsgChange} value={formData.msg} placeholder='(Optional) Include message when re-routing'/>
                        <small>{`${txtCount}/160`}</small>
                    </form>
                </div>
                <div className='box-linkList'>
                    {isLoading ? 'Loading' :
                        <div className='allLinks'>
                            {allLinks.length > 0 ? 
                                <>
                                <div className='headers'>
                                    <h6 className='grid-1' id='h-short'>Short Link</h6>
                                    <h6 className='grid-2' id='h-tag'>Tag</h6>
                                    <h6 className='grid-3' id='h-timer'>Timer</h6>
                                    <h6 className='grid-4' id='h-status'>Status</h6>
                                    <div className='grid-5'></div>
                                </div>
                                {allLinks.map((chat) => 
                                    <ChatCard data={chat} />
                                )}
                                </>
                            : 
                            <div className='no-links'>
                                <FontAwesomeIcon icon={faCirclePlus} className='addIcon'/>
                                <text>No currently existing urls.</text>
                            </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}