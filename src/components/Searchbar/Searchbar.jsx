import { IconButton } from 'components/IconButton/IconButton';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';

import searchBarCSS from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';

export const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const onChangeImgName = e => {
    setImgName(e.currentTarget.value.toLowerCase());
  };

  const onSubmitImg = e => {
    e.preventDefault();
    if (imgName.trim() === '') {
      toast.error('Please enter valid search data');
      return;
    }
    onSubmit(imgName);
    setImgName('');
  };

  return (
    <div className={searchBarCSS.form_wrapper}>
      <form onSubmit={onSubmitImg} className={searchBarCSS.formSearch}>
        <input
          className={searchBarCSS.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imgName}
          onChange={onChangeImgName}
        />

        <IconButton type={'submit'}>
          <SearchIcon width="36" height="36" />
        </IconButton>
      </form>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
