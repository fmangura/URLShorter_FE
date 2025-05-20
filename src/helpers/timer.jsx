import React, {useState, useEffect} from 'react'

export default function Timer({startTime, isActive}) {

    let min = Math.floor(startTime / 60) % 60
    let sec = startTime%60

    const [timeDisplay, setTimeDisplay] = useState(`${min.toString().padStart(2,0)}:${sec.toString().padStart(2,0)}`)
    const [time, setTime] = useState(startTime)
    let timerId
    clearInterval(timerId);

    useEffect(() => {
        let currTimer = time
        
        if (currTimer > 0) {
            timerId = setInterval(() => {
                if (currTimer <= 0) {
                    setTimeDisplay("00:00");
                    isActive(false);
                    clearInterval(timerId);
                    return
                }

                min = Math.floor(currTimer / 60) % 60
                sec = currTimer%60

                setTimeDisplay((`${min.toString().padStart(2,0)}:${sec.toString().padStart(2,0)}`));

                currTimer = currTimer - 1
            }, 1000);
        }

    }, []);


    return (
        <div className='timer' style={{display:'flex', flexDirection:'column', fontSize:'12px'}}>
            <div className='timer-container'>
                <div>{timeDisplay}</div>
            </div>
        </div>
    )
}