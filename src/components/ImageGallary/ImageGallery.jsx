import { useState } from 'react';
import propTypes from 'prop-types';

import imageGallaryCSS from './ImageGallery.module.css';
import { ImageGallaryItem } from 'components/ImageGallaryItem/ImageGallaryItem';
import { Modal } from '../Modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const ImageGallary = ({
  images,
  status,
  error,
  hasMorePages,
  changePage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [description, setDescription] = useState(null);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const getLargeImgData = (largeImage, description) => {
    setLargeImage(largeImage);
    setDescription(description);
  };

  const hasMoreImg = hasMorePages();

  if (status === 'idle') {
    return;
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return <div className={imageGallaryCSS.error}>{error}</div>;
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className={imageGallaryCSS.gallary_list}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGallaryItem
              key={id}
              originateImg={webformatURL}
              largeImage={largeImageURL}
              descrip={tags}
              onImgClick={toggleModal}
              getLargeImgData={getLargeImgData}
            />
          ))}
        </ul>
        {hasMoreImg && <Button changePage={changePage} />}
        {showModal && (
          <Modal toggleModal={toggleModal}>
            <img
              className={imageGallaryCSS.large_img}
              src={largeImage}
              alt={description}
            />
            <button
              className={imageGallaryCSS.close_btn}
              type="button"
              onClick={toggleModal}
            >
              <AiOutlineClose className={imageGallaryCSS.close_icon} />
            </button>
          </Modal>
        )}
      </>
    );
  }
};

ImageGallary.propTypes = {
  images: propTypes.arrayOf(propTypes.shape).isRequired,
  status: propTypes.string.isRequired,
  error: propTypes.string.isRequired,
  hasMorePages: propTypes.func.isRequired,
  changePage: propTypes.func.isRequired,
};
