import React from 'react';
import Button from './Button';
import './Question.css';

export default function Question({children, text, onContinue}) {
    return (
        <div className="Question">
            <div className="Question-Text">
                {text}
            </div>
            <div className="Question-Main">
                {children}
            </div>
            <Button onClick={() => {onContinue();}}>
                Continue
            </Button>
        </div>
    );
}