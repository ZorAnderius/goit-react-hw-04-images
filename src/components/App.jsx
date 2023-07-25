import { Component } from 'react';
import { Header } from './Header/Header';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallary } from './ImageGallary/ImageGallery';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    imageName: null,
  };

  onSearchFormImg = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;
    return (
      <div>
        <Header>
          <Searchbar onSubmit={this.onSearchFormImg} />
        </Header>

        <ImageGallary imageName={imageName} onImgClick={this.toggleModal} />

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
