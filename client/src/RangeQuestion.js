import React, {useState} from 'react';
import Question from './Question';
import Range from './Range';
import './RangeQuestion.css';

export default function RangeQuestion({min, max, step, value, text, format, onChange, onContinue}) {
    return (
        <Question text={text} onContinue={()=>{onContinue();}}>
            <div className="RangeQuestion-Value">
                {format(value)}
            </div>
            <Range min={min} max={max} step={step} value={value} onChange={onChange}/>
        </Question>
    );
}