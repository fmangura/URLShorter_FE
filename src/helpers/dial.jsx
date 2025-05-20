import React, {useState, useEffect} from 'react'

export default function Dial({min=1, max=60}) {
    const [number, setNumber] = useState(30);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [tick, setTick] = useState(false);
    const [n, setN] = useState(Math.floor(max/2))

    let dialDigits = {
        1:n-1,
        2:'|',
        3:'|',
        4:'|',
        5:n,
        6:'|',
        7:'|',
        8:'|',
        9:n+1,
    }

    const [dial, setDial] = useState(dialDigits)

    const moveDialLeft = () => {
        let dialChange = dial;
        if(dialChange[5] == max) return;

        Object.keys(dialChange).forEach((digit) => {
            digit = Number(digit);
            if(!!dialChange[digit+1]) {
                dialChange[digit] = dialChange[digit+1];
            } else if (dialChange[1] == max - 1) {
                dialChange[digit] = '';
            } else {
                (dialChange[1] == n) ? dialChange[9] = dialChange[5]+1 : dialChange[9] = '|';
            }
            if(typeof dialChange[5] == 'number') setN(dialChange[5]);
        })
        setDial(dialChange);
        // if (dialChange[1] == n && typeof dialChange[5] == 'number') setN(dialChange[5]);

        console.log(dial)
    }

    const moveDialRight = () => {
        let dialChange = dial;

        if(dialChange[5] == min) return;

        Object.keys(dialChange).reverse().forEach((digit) => {
            digit = Number(digit);
            if(typeof dialChange[5] == 'number') setN(dialChange[5]);

            if(!!dialChange[digit-1]) {
                dialChange[digit] = dialChange[digit-1];

            } else if (dialChange[9] == min + 1) {
                dialChange[digit] = '';
            } else {
                (dialChange[9] == n) ? dialChange[1] = dialChange[5]-1 : dialChange[1] = '|';
            }
        })
        setDial(dialChange);
        console.log(n)
        // if (dialChange[9] == n && typeof dialChange[5] == 'number') setN(dialChange[5]);
        console.log(dial)
    }

    const handleMouseDown = (e) => {
        setDragging(true);
        setStartX(e.clientX);
    }

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const currX = e.clientX;
        const change = startX - currX;
        if (change > 0) moveDialLeft();
        if (change < 0) moveDialRight();
        let newVal = number + change ;

        newVal = Math.floor(Math.max(min, Math.min(max, newVal)));

        setNumber(n);
        setStartX(currX);
        setTick(!tick);
    }

    const handleMouseUp = () => {
        setDragging(false);
    }

    const handleMouseLeave = () => {
        setDragging(false);
    }

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('mouseleave', handleMouseLeave);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    },[dragging, handleMouseMove, handleMouseUp, handleMouseLeave]);

    return (
        <div className='dial' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} draggable='false' style={{cursor:"default", userSelect:'none', width:'100px'}}>
            <span style={{display:'flex', flexDirection:'row', justifyContent:'center', justifyContent:'space-between', alignItems:'center'}}>
                {Object.values(dial).map((value) => 
                    <small>{value}</small>
                )}
            </span>
            <small>{number}</small>
        </div>
    )
}