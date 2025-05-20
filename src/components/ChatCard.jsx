import React, {useState} from 'react'
import Timer from '../helpers/timer'
const APP_URL = process.env.VITE_APP_URL
import './ChatCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCircle, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import LinkCard from './linkCard'

export default function ChatCard({data, ifCompact}) {
    const {long_url, 
        short_url, 
        expiry, 
        click_counter, 
        msg,
        tag } = data;

    const [isCompact, setIsCompact] = useState(true);
    const [status, setStatus] = useState(true);
    const [shortLink, setShortLink] = useState(`${APP_URL}${short_url}`);

    async function copyTitle() {
        await navigator.clipboard.writeText(shortLink)
    }

    const isActive = (stat) => {
        setStatus(stat);
    }

    const expandCard = () => {
        setIsCompact(!isCompact);
    }
            
    return (
        <>
            {!isCompact ?
                <LinkCard data={data} expandCard={expandCard} shortLink={shortLink} isActive={isActive}/>
            :
            <div className={`linkCard compact-${isCompact}`}>
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
            }
        </>

    )
}