import React, {useState, useEffect, useContext} from 'react';
import useForm from '../components/useForm';
import LinkForm from '../components/LinkForm';
import { SessionContext } from '../context';
import backend from '../api';
import ChatCard from '../components/ChatCard';
import './Home.css';
import Logo from '../../public/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import LandingPage from '../components/LandingPage';
import DynamicLogo from '../components/Logo';


export default function Home () {
    const { allLinks, 
            isLoading, 
            getAllLinks,
            animatingTitle,
            makePop } = useContext(SessionContext);
    
    useEffect(() => {
        window.addEventListener('focus', () => getAllLinks());
    },[])

    return (
        <>
            {animatingTitle ? <div className={`animating-${animatingTitle}`}><LandingPage /></div> : <></>}
            <div className='home-body' style={{display:'flex', flexDirection:'column'}}>
                <DynamicLogo />
                <div className='box-1'>
                    {animatingTitle ? <></> : <LinkForm />}
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
        </>
    )
}