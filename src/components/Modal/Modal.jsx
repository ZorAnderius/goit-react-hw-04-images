import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

import modalCSS from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggleModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  });

  const hendleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const hendleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={modalCSS.backdrop} onClick={hendleBackDropClick}>
      <div className={modalCSS.content}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: propTypes.func.isRequired,
};
