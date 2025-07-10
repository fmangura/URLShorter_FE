import React, {useState, useContext} from 'react'
import { SessionContext } from '../context'
import Timer from '../helpers/timer'
const APP_URL = process.env.VITE_APP_URL
import './ChatCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCircle, faUpRightAndDownLeftFromCenter, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ChatCard({data}) {
    const {long_url, 
        short_url, 
        expiry, 
        click_counter, 
        msg,
        tag } = data;

    const { handleDel, makePop } = useContext(SessionContext);

    const [isCompact, setIsCompact] = useState(true);
    const [status, setStatus] = useState(true);
    const [shortLink, setShortLink] = useState(`${APP_URL}${short_url}`);

    async function copyTitle() {
        makePop()
        await navigator.clipboard.writeText(shortLink);
    }

    const isActive = (stat) => {
        setStatus(stat);
    }

    const expandCard = () => {
        setIsCompact(!isCompact);
    }
            
    return (
        <>
        <div className={`link-container compact-${isCompact}`}>
            <div className={`linkCard`}>
                <div className='link-copy grid-1' style={{display:'flex', flexDirection:'row'}}> 
                    <div className='link-name'>{shortLink}</div>
                    <a onClick={copyTitle}>
                        <FontAwesomeIcon icon={faCopy} className='icon'/>
                    </a>
                </div>
                <div className='nickname grid-2'>{tag}</div>
                <div className='grid-3'><Timer startTime={expiry} isActive={isActive}/></div>
                <FontAwesomeIcon icon={faCircle} className={`icon active-${status} grid-4`}/>
                <a onClick={expandCard} className='grid-5 i-expand'>
                    <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className='icon'/>
                </a>
            </div>
            {!isCompact ? 
                <div style={{display:'flex', flexDirection:'column'}}>
                    <div className='og-link'>
                        <p className='tab'>Original Link:</p>
                        <p className='longurl'>{long_url}</p>
                    </div>
                    <div className='og-link'>
                        <p className='tab'>Msg:</p>
                        <p className='longurl'>{msg}</p>
                    </div>
                    <a onClick={() => handleDel(short_url)} style={{alignSelf:'end', fontSize:'12px', cursor:'pointer', paddingRight:'20px'}}><FontAwesomeIcon icon={faTrash} className='icon'/></a>
                </div>
            :
             <></>}
        </div>
        </>
    )
}