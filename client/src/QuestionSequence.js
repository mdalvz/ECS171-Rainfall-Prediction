import React, {useState} from 'react';
import RangeQuestion from "./RangeQuestion";
import ChoiceQuestion from './ChoiceQuestion';

function cToF(celsius) {
    return Math.round(parseFloat(celsius) * 9 / 5 + 32);
}

export default function QuestionSequence({onComplete}) {
    const [index, setIndex] = useState(1);
    const [tmpc, setTmpc] = useState(10);
    const [dwpc, setDwpc] = useState(10);
    const [alti, setAlti] = useState(50);
    const [mslp, setMslp] = useState(1025);
    const [relh, setRelh] = useState(50);
    const [sped, setSped] = useState(35);
    const [vsby, setVsby] = useState(5);
    const SKYC1 = [ 'BKN', 'CB', 'CLR', 'FEW', 'OVC', 'SCT', 'SKC', 'TCU' ];
    const [skyc1, setSkyc1] = useState(SKYC1[0]);
    const MONTH = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ];
    const [month, setMonth] = useState(MONTH[0]);
    switch (index) {
        case 1:
            return (
                <RangeQuestion
                    text="What's the temperature?"
                    min={-30}
                    max={50}
                    step={1}
                    value={tmpc}
                    format={(x)=>`${x}°C (${cToF(x)}°F)`}
                    onChange={setTmpc}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 2:
            return (
                <RangeQuestion
                    text="What's the dew point?"
                    min={-30}
                    max={50}
                    step={1}
                    value={dwpc}
                    format={(x)=>`${x}°C (${cToF(x)}°F)`}
                    onChange={setDwpc}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 3:
            return (
                <RangeQuestion
                    text="What's the altitude?"
                    min={0}
                    max={100}
                    step={1}
                    value={alti}
                    format={(x)=>`${x}ft`}
                    onChange={setAlti}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 4:
            return (
                <RangeQuestion
                    text="What's the atmospheric pressure?"
                    min={1000}
                    max={1050}
                    step={1}
                    value={mslp}
                    format={(x)=>`${x}mb`}
                    onChange={setMslp}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 5:
            return (
                <RangeQuestion
                    text="What's the relative humidity?"
                    min={0}
                    max={100}
                    step={1}
                    value={relh}
                    format={(x)=>`${x}%`}
                    onChange={setRelh}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 6:
            return (
                <RangeQuestion
                    text="What's the wind speed?"
                    min={0}
                    max={70}
                    step={1}
                    value={sped}
                    format={(x)=>`${x}mph`}
                    onChange={setSped}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 7:
            return (
                <RangeQuestion
                    text="What's the visibility?"
                    min={0}
                    max={10}
                    step={1}
                    value={vsby}
                    format={(x)=>`${x}mi`}
                    onChange={setVsby}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 8:
            return (
                <ChoiceQuestion
                    text="What's the cloud class?"
                    choices={SKYC1}
                    value={skyc1}
                    onChange={setSkyc1}
                    onContinue={()=>{setIndex(index+1)}}
                />
            );
        case 9:
            return (
                <ChoiceQuestion
                    text="What's the month?"
                    choices={MONTH}
                    value={month}
                    onChange={setMonth}
                    onContinue={()=>{onComplete({
                        tmpc: parseInt(tmpc),
                        dwpc: parseInt(dwpc),
                        alti: parseInt(alti), 
                        mslp: parseInt(mslp), 
                        relh: parseInt(relh), 
                        sped: parseInt(sped), 
                        vsby: parseInt(vsby), 
                        skyc1, 
                        month: MONTH.indexOf(month) + 1
                    })}}
                />
            );
    }
}