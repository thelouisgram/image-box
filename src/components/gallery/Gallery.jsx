import Images from "./content/Images"
import Hero from "./hero/Hero"
import {useSelector} from 'react-redux'
import Loading from "./Loading"
import Error from "./Error"

const Gallery = () => {
  const {photos} = useSelector((state) => state.app)
  const {loading, error, success} = photos

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : success ? (
        <div className='w-full xl:w-[1440px] mx-auto font-Poppins'>
          <Hero />
          <Images />
        </div>
      ) : null}
    </>

  )
}

export default Gallery
