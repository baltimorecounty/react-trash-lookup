import "./App.css";

import React, { Component } from "react";

import TrashLookUp from "./components/TrashLookup";

class App extends Component {
  render() {
    return (
      <main className="container">
        <TrashLookUp />
      </main>
    );
  }
}

export default App;
