import propTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    document.querySelector('#portal')
  );
};

Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};
