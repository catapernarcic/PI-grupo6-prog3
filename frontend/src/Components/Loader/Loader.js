import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
  render(){
    return (
      <div className="loader__wrap">
        <div className="loader__spinner"></div>
        <p className="loader__text">Cargando…</p>
      </div>
    );
  }
}

export default Loader;