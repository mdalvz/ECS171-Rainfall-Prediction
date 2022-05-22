import React from 'react';
import './Choice.css';

export default function Choice({choices, value, onChange}) {
    return (
        <div className="Choice">
            {choices.map((x, i) => {
                return (
                    <div key={i} className={"Choice-Entry" + (value == x ? " On" : "")} onClick={()=>{onChange(x);}}>
                        {x}
                    </div>
                );
            })}
        </div>
    );
}