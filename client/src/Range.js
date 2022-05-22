import React, {useRef} from 'react';
import './Range.css';

export default function Range({min, max, step, value, onChange}) {
    const input = useRef(null);
    return (
        <input ref={input} className="Range" type="range" min={min} max={max} step={step} value={value} onInput={()=>{onChange(input.current.value);}}/>
    );
}