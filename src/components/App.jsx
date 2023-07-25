import { Component } from 'react';
import { Header } from './Header/Header';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallary } from './ImageGallary/ImageGallery';
import { ToastContainer } from 'react-toastify';
import { axiosAPI } from 'api/pixabay_api';

export class App extends Component {
  state = {
    searchName: null,
    images: [],

    page: 1,
    per_page: 12,
    totalPages: 0,
    error: null,
    status: 'idle',
  };

  getImages = async () => {
    const { searchName, page, per_page } = this.state;
    try {
      this.setState({ status: 'pending' });
      const { data } = await axiosAPI(searchName, page, per_page);
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
    const { searchName, page, per_page } = this.state;
    const newPage = page + 1;
    try {
      this.setState({ status: 'pending' });
      const { data } = await axiosAPI(searchName, newPage, per_page);
      if (!data.total) {
        return new Error('Oops! Something went wrong');
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        page: newPage,
        totalPages: data.totalHits,
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  onSearchFormImg = searchName => {
    this.setState({ searchName });
  };

  hasMorePages = () => {
    const { totalPages, page, per_page } = this.state;
    const pages = Math.ceil(totalPages / per_page);
    return page < pages;
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName } = this.state;
    if (searchName !== prevState.searchName) {
      this.getImages();
    }
  }

  render() {
    const { images, status, error } = this.state;
    return (
      <div>
        <Header>
          <Searchbar onSubmit={this.onSearchFormImg} />
        </Header>
        <ImageGallary
          images={images}
          status={status}
          error={error}
          hasMorePages={this.hasMorePages}
          changePage={this.addImages}
          onImgClick={this.toggleModal}
        />
        ;
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
  }
}
