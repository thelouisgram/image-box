import Images from "./content/Images"
import Hero from "./hero/Hero"

const Gallery = () => {
  return (
    <div className='w-full xl:w-[1440px] mx-auto font-Poppins'>
      <Hero />
      <Images />
    </div>
  )
}

export default Gallery
