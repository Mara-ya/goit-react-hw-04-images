import { useState, useEffect } from "react";
import { fetchImages } from "services/Pixabay-api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Searchbar } from "./Searchbar/Searchbar";
import { Wrapper } from "./App.styled";
import { BtnLoadMore } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";

export default function App () {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    async function getImages () {
      try {
        setLoading(true)
        const resultinImages = await fetchImages (searchQuery, page);
        const necessaryDataImg = resultinImages.map(({id, webformatURL, largeImageURL, tags}) => ({id, webformatURL, largeImageURL, tags}));
        setImages(prevImages => [...prevImages, ...necessaryDataImg]);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      };
    };

    if(searchQuery !== ''){
      getImages();
    }
  },[searchQuery, page])


  function handleClick () {
    setPage(prevState => prevState + 1)
  }

  async function handleSubmit (data) {
    setPage(1);
    setImages([]);
   if (data){
    setSearchQuery(data);
   }
  }

  function openModal ({largeImageURL, tags}) {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  function closeModal () {
    setShowModal(false);
  }

  return (
    <Wrapper>
      {showModal && 
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      }
      <Searchbar onSubmit={handleSubmit}/>
      {images.length > 0 && 
        <ImageGallery>
          <ImageGalleryItem images={images} openModal={openModal}/>
        </ImageGallery>
      }
      {images.length > 0 && !loading && <BtnLoadMore onClick={handleClick}/>}
      {loading && <Loader/>}
    </Wrapper>
  );
}