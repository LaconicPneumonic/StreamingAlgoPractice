import React from 'react';
import './App.css';
import { FaucetStreamHandler } from "./components/FaucetStreamHandler";

function App() {
  return (
    <div className="App">
      <React.StrictMode><FaucetStreamHandler /></React.StrictMode>
    </div>
  );
}

export default App;
