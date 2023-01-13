
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Loader } from '../components/Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './services/api';
import css from './App.module.css';
import { useState } from 'react';

export const App =  () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  state = {
    images: [],
    page: 1,
    query: '',
    totalHits: null,
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

        if (totalHits === 0) {
          toast.error(
            `There is no result for your request ${this.state.query}`
          );
        }

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

  const handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  const handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading && <Loader />}
        {this.state.totalHits > this.state.images.length && (
          <Button onLoadMore={handleLoadMore} />
        )}
        <ToastContainer />
      </div>
    );
  }
