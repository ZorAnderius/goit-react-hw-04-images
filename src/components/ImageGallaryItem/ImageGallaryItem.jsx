import propTypes from 'prop-types';

import imgGallaryItemCSS from './ImageGalleryItem.module.css';

export const ImageGallaryItem = ({
  originateImg,
  largeImage,
  descrip,
  onImgClick,
  getLargeImgData,
}) => {
  return (
    <li className={imgGallaryItemCSS.photo_card}>
      <img
        className={imgGallaryItemCSS.photo_card_img}
        src={originateImg}
        alt={descrip}
        loading="lazy"
        onClick={() => {
          onImgClick();
          getLargeImgData(largeImage, descrip);
        }}
      />
    </li>
  );
};

ImageGallaryItem.propTypes = {
  originateImg: propTypes.string.isRequired,
  largeImage: propTypes.string.isRequired,
  descrip: propTypes.string.isRequired,
  onImgClick: propTypes.func.isRequired,
  getLargeImgData: propTypes.func.isRequired,
};
