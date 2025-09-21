import React, { Component } from 'react';
import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app-footer"> 
        <div className="footer-inner">
          <p className="footer-text">
            Trabajo hecho por: <strong>Catalina Pernarcic</strong>, <strong>Agostina Paladino</strong> y <strong>Teodelina Lagos Marmol</strong>
          </p>
        </div>
      </footer>
    );
  }
}
