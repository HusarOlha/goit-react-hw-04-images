import { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { Toaster } from 'react-hot-toast';
import getImage from './services/getImage';
import { toast } from 'react-hot-toast';

export function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!value) return;
        setStatus('pending');
        setPage(1);

        const data = await getImage({ value, page });
        setData(data.images);
        setTotalHits(data.totalHits);
        setLoading(false);

        if (data.totalHits >= 1) {
          toast.success(`Found ${data.totalHits} images`);
        } else {
          toast.error('Sorry, we can not find any pictures');
        }
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        toast.error('Failed to fetch images. Please try again later.');
      }
    }

    fetchData();
  }, [value]);

  async function handleLoad() {
    try {
      setLoading(true);

      const newData = await getImage({ value, page: page + 1 });
      setData(prevData => [...prevData, ...newData.images]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
      toast.error('Failed to fetch images. Please try again later.');
    }
  }

  function toggleModal(imgUrl) {
    setImgUrl(imgUrl);
    setShowModal(prevShowModal => !prevShowModal);
  }

  function handleSubmit(newValue) {
    setValue(newValue);
    setPage(1);
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: 'white',
            color: 'black',
          },
          success: {
            duration: 500,
          },
        }}
      ></Toaster>
      <SearchBar onSearch={handleSubmit}></SearchBar>
      <ImageGallery
        onModal={toggleModal}
        data={data}
        status={status}
        loading={loading}
        totalHits={totalHits}
        onLoad={handleLoad}
      ></ImageGallery>

      {showModal && <Modal onClose={toggleModal} img={imgUrl}></Modal>}
    </>
  );
}
