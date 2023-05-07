import ImageGalleryItem from 'components/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader.jsx';
import { Gallery, ImageSection } from './ImageGallery.styled.jsx';

import { Button } from '../Button/Button';

const ImageGallery = ({
  data,
  status,
  loading,
  onModal,
  totalHits,
  onLoad,
}) => {
  return (
    <ImageSection>
      {status === 'pending' && <Loader></Loader>}

      {data !== null && data.length > 0 && status === 'resolved' && (
        <Gallery>
          {data.map((data, index) => (
            <ImageGalleryItem
              key={`${data.id}-${index}`}
              image={data.webformatURL}
              ModalImg={data.largeImageURL}
              onModal={onModal}
            />
          ))}
        </Gallery>
      )}
      {loading && <Loader />}
      {!loading && data.length < totalHits && status === 'resolved' && (
        <Button onClick={onLoad}>Load more</Button>
      )}
    </ImageSection>
  );
};

export default ImageGallery;
