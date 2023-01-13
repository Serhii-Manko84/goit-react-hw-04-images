import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Loader } from '../components/Loader/Loader';
import { Button } from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './services/api';
import css from './App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPictures = async () => {
      if (!query) {
        return;
      }
      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(query, page);

        if (totalHits === 0) {
          toast.error(`There is no result for your request ${query}`);
        }

        setImages(prev => (page === 1 ? hits : [...prev, ...hits]));

        setTotalHits(totalHits);
      } catch (error) {
        toast.error(`Something went wrong ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getPictures();
  }, [page, query]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {totalHits > images.length && <Button onLoadMore={handleLoadMore} />}
      <ToastContainer />
    </div>
  );
};
