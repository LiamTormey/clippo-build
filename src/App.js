import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from "./pages/editor"

//we need to create out stores -_-
import TimestampsStore from "./stores/timestamps"
import VideoStore from "./stores/video"

function App() {
  return (
    <div className="App">
      <Editor></Editor>
    </div>
  );
}

export default App;
