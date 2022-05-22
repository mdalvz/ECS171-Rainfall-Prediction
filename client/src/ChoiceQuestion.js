import React from 'react';
import Choice from './Choice';
import Question from './Question';

export default function ChoiceQuestion({text, choices, value, onChange, onContinue}) {
    return (
        <Question text={text} onContinue={()=>{onContinue();}}>
            <Choice
                choices={choices}
                value={value}
                onChange={onChange}
            />
        </Question>
    );
}