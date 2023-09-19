import SearchBar from "../searchbar/SearchBar"

const Hero = () => {
  return (
    <div className='w-full xl:w-[1440px] mb-3'>
      <div className='w-full h-[200px] sm:h-[300px] px-3 xs:px-5 md:px-0 bg'>
        <SearchBar />
      </div>
    </div>
  )
}

export default Hero
