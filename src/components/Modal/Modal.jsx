import { Overlay, ModalEl } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ onClose, img }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalEl>
        <img src={img} alt={img} />
      </ModalEl>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
};

export default Modal;
