import { Component } from 'react';
import React from 'react';
import { axiosAPI } from 'api/pixabay_api';

import imageGallaryCSS from './ImageGallery.module.css';
import { ImageGallaryItem } from 'components/ImageGallaryItem/ImageGallaryItem';
import { Modal } from '../Modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallary extends Component {
  state = {
    images: [],
    showModal: false,

    img: {
      largeImage: '',
      descrip: '',
    },

    page: 1,
    per_page: 40,
    totalPages: 0,

    error: null,
    status: 'idle',
  };
  hasMorePages = () => {
    const { totalPages, page, per_page } = this.state;
    const pages = Math.ceil(totalPages / per_page);
    return page < pages;
  };

  getImages = async (imageName, page = 1, per_page = 40) => {
    try {
      this.setState({ status: 'pending' });
      const { data } = await axiosAPI(imageName, page, per_page);
      if (!data.total) {
        throw new Error('No matches found. The data may not be valid');
      }

      this.setState({
        images: [...data.hits],
        totalPages: data.totalHits,
        page: page,
        status: 'resolved',
      });
    } catch (error) {
      this.setState({
        error: error.message,
        status: 'rejected',
      });
    }
  };

  addImages = async () => {
    const { page, per_page } = this.state;
    const { imageName } = this.props;
    const newPage = page + 1;

    try {
      this.setState({ status: 'pending' });
      const { data } = await axiosAPI(imageName, page, per_page);
      if (!data.total) {
        return new Error('Oops! Something went wrong');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalPages: data.totalHits,
        page: newPage,
        status: 'resolved',
      }));
    } catch (error) {
      console.log(' error.message', error.message);
      this.setState({ error, status: 'rejected' });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImgData = (largeImage, descrip) => {
    this.setState({ img: { largeImage, descrip } });
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    if (imageName !== prevProps.imageName) {
      this.getImages(imageName);
    }
  }

  render() {
    const {
      images,
      showModal,
      img: { largeImage, descrip },
      error,
      status,
    } = this.state;
    console.log('error', error);

    const hasMoreImg = this.hasMorePages();

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

          {hasMoreImg && <Button addImages={this.addImages} />}

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
