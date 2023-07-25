import { Component } from 'react';
import React from 'react';

import imageGallaryCSS from './ImageGallery.module.css';
import { ImageGallaryItem } from 'components/ImageGallaryItem/ImageGallaryItem';
import { Modal } from '../Modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallary extends Component {
  state = {
    showModal: false,
    img: {
      largeImage: '',
      descrip: '',
    },
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImgData = (largeImage, descrip) => {
    this.setState({ img: { largeImage, descrip } });
  };

  render() {
    const {
      showModal,
      img: { largeImage, descrip },
    } = this.state;
    const { images, status, error, hasMorePages, changePage } = this.props;

    console.log('images', images);
    console.log('status', status);
    const hasMoreImg = hasMorePages();
    console.log('largeImage', largeImage);
    console.log(' descrip', descrip);

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
                onImgClick={this.toggleModal}
                getLargeImgData={this.getLargeImgData}
              />
            ))}
          </ul>

          {hasMoreImg && <Button changePage={changePage} />}

          {showModal && (
            <Modal toggleModal={this.toggleModal}>
              <img
                className={imageGallaryCSS.large_img}
                src={largeImage}
                alt={descrip}
              />
              <button
                className={imageGallaryCSS.close_btn}
                type="button"
                onClick={this.toggleModal}
              >
                <AiOutlineClose className={imageGallaryCSS.close_icon} />
              </button>
            </Modal>
          )}
        </>
      );
    }
  }
}
