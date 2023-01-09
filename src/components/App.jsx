import { Component } from 'react';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Loader } from '../components/Loader/Loader';
import { Button } from './Button/Button';
import { fetchImages } from './services/api';
import css from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    totalHits: null,
    largeImageURL: '',
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        isLoading: true,
      });

      try {
        const { hits, totalHits } = await fetchImages(
          this.state.query,
          this.state.page
        );
        this.setState({
          images:
            this.state.page === 1 ? hits : [...this.state.images, ...hits],
          totalHits: totalHits,
        });
      } catch (error) {
        this.setState({
          error: error,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading && <Loader />}
        {this.state.totalHits > this.state.images.length && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
