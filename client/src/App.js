import React, {useState} from 'react';
import QuestionSequence from './QuestionSequence';
import Choice from './Choice';
import './App.css';

function App() {
    const [val, setVal] = useState("ABC");
    return (
        <div className="App">
            <header className="App-Header">
                <a href="/" className="App-Header-Link">
                    Home
                </a>
            </header>
            <main className="App-Main">
                <QuestionSequence onComplete={(x)=>{alert(JSON.stringify(x))}}/>
            </main>
        </div>
    );
}

export default App;
