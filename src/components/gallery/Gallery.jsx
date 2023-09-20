import Images from "./content/Images";
import Hero from "./hero/Hero";
import { useSelector } from 'react-redux';
import Loading from "./Loading";
import Error from "./Error";

const Gallery = () => {
  // Select relevant state from the Redux store
  const { photos } = useSelector((state) => state.app);
  const { loading, error, success } = photos;

  return (
    <>
      {loading ? ( // Display loading component if 'loading' is true
        <Loading />
      ) : error ? ( // Display error component if 'error' is true
        <Error />
      ) : success ? ( // Display content if 'success' is true
        <div className='w-full xl:w-[1440px] mx-auto font-Poppins'>
          <Hero /> {/* Render Hero component */}
          <Images /> {/* Render Images component */}
        </div>
      ) : null}
    </>
  );
}

export default Gallery;
