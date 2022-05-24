import React, {useState} from 'react';
import QuestionSequence from './QuestionSequence';
import Display from './Display';
import './App.css';

function Main() {
    const [isDone, setIsDone] = useState(false);
    const [input, setInput] = useState(null);
    if (!isDone) {
        return (
            <QuestionSequence
                onComplete={(x) => {
                    setInput(x);
                    setIsDone(true);
                }}
            />
        );
    }
    else {
        return (
            <Display
                input={input}
            />
        );
    }
}

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
                <Main/>
            </main>
        </div>
    );
}

export default App;
