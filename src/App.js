import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from "./pages/editor"

import TimestampsStore from "./stores/timestamps"

function App() {
  return (
    <div className="App">
      <Editor></Editor>
    </div>
  );
}

export default App;
