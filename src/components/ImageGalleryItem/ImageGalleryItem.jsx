import React from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, ModalImg, onModal }) => {
  return (
    <GalleryItem>
      <GalleryItemImg
        src={image}
        alt=""
        onClick={() => {
          onModal(ModalImg);
        }}
      />
    </GalleryItem>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  ModalImg: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
