import { Component } from 'react';
import { createPortal } from 'react-dom';

import modalCSS from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Закрити модалку');
      this.props.toggleModal();
    }
  };

  hendleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={modalCSS.backdrop} onClick={this.hendleBackDropClick}>
        <div className={modalCSS.content}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
