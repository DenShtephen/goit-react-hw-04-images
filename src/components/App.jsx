import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages as getPhotos } from './Services/Services';
import '../styles.css';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchImages = () => {
      setIsLoading(true);

      getPhotos(query, page)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
          setTotalHits(response.data.totalHits);
        })
        .catch(error => console.error('Error fetching images:', error))
        .finally(() => setIsLoading(false));
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = image => {
    setLargeImageUrl(image.largeImageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setLargeImageUrl('');
    setShowModal(false);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onItemClick={handleImageClick} />
      {isLoading && <Loader />}
      {!isLoading &&
        images.length % 12 === 0 &&
        page <= Math.ceil(totalHits / 12) && (
          <Button onClick={handleLoadMore}>Load more</Button>
        )}
      {showModal && (
        <Modal onClose={handleCloseModal} largeImageUrl={largeImageUrl} />
      )}
    </div>
  );
}
