import { useEffect, useState } from 'react';
import { Header } from './Header/Header';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallary } from './ImageGallary/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { axiosAPI } from 'api/pixabay_api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [searchName, setSearchName] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  const per_page = 100;

  useEffect(() => {
    const getImages = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosAPI(searchName, per_page);
        if (!data.total) {
          throw new Error('No matches found. The data may not be valid');
        }
        setImages([...data.hits]);
        setTotalPages(data.totalHits);
        setIsLoading(false);
        setStatus('resolved');
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        setStatus('rejected');
      }
    };
    if (searchName) {
      getImages(searchName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [per_page, searchName]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    const addImages = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosAPI(searchName, per_page, page);
        if (!data.total) {
          throw new Error('No matches found. The data may not be valid');
        }
        setImages(prevImg => [...prevImg, ...data.hits]);
        setIsLoading(false);
        setStatus('resolved');
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        setStatus('rejected');
      }
    };
    if (searchName) {
      addImages(searchName);
    }
  }, [page, per_page, searchName]);

  const onSearchFormImg = newSearchName => {
    if (page === 1) {
      setSearchName(newSearchName);
    } else if (searchName.toLowerCase() !== newSearchName.toLowerCase()) {
      setSearchName(newSearchName);
      setPage(1);
    }
  };
  const hasMorePages = () => {
    const pages = Math.ceil(totalPages / per_page);
    return page < pages;
  };

  const addImages = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Header>
        <Searchbar onSubmit={onSearchFormImg} />
      </Header>
      <ImageGallary
        images={images}
        status={status}
        error={error}
        hasMorePages={hasMorePages}
        changePage={addImages}
      />
      {isLoading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
