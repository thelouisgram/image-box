import SearchBar from "../searchbar/SearchBar"
import Navbar from "./Navbar"

const Hero = () => {
  return (
    <div className='w-full xl:w-[1440px] mb-3'>
      <div className='w-full h-[250px] sm:h-[350px] px-3 xs:px-5 md:px-0 bg'>
        <Navbar />
        <SearchBar />
      </div>
    </div>
  )
}

export default Hero
