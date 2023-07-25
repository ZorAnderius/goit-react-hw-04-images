import { IconButton } from 'components/IconButton/IconButton';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import searchBarCSS from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg';

export class Searchbar extends Component {
  state = {
    imgName: '',
  };

  onChangeImgName = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase() });
  };

  onSubmitImg = e => {
    e.preventDefault();
    const { imgName } = this.state;
    if (imgName.trim() === '') {
      toast.error('Please enter valid search data');
      return;
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  render() {
    return (
      <div className={searchBarCSS.form_wrapper}>
        <form onSubmit={this.onSubmitImg} className={searchBarCSS.formSearch}>
          <input
            className={searchBarCSS.inputSearch}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imgName}
            onChange={this.onChangeImgName}
          />

          <IconButton>
            <SearchIcon type={'submit'} width="36" height="36" />
          </IconButton>
        </form>
      </div>
    );
  }
}
