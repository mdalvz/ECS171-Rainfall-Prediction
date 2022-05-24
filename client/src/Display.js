import React, {useEffect, useState} from 'react';
import './Display.css';

export default function Display({input}) {
    const [isLoading, setIsLoading] = useState(true);
    const [result, setResult] = useState(null);
    useEffect(() => {
        (async () => {
            let res = await fetch('/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            });
            if (res.ok) {
                let obj = await res.json();
                setResult(obj);
            }
            setIsLoading(false);
        })();
    },[]);
    if (isLoading) {
        return (
            <div className="Display-Loader">
                Loading...
            </div>
        );
    }
    else if (result >= 0.5) {
        return (
            <div className="Display">
                Result:&nbsp;
                <span style={{color: 'lime'}}>
                    YES ({result.toFixed(2)})
                </span>
            </div>
        );
    }
    else {
        return (
            <div className="Display">
                Result:&nbsp;
                <span style={{color: 'red'}}>
                    NO ({result.toFixed(2)})
                </span>
            </div>
        );
    }
}