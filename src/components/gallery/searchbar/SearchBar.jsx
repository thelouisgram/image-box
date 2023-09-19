const SearchBar = () => {
  return (
    <div className='w-full h-full md:w-[1100px] mx-auto flex flex-col gap-3 justify-center items-center'>
      <h1 className="text-[18px] md:text-[30px] font-[700] text-white">Welcome to ImageBox</h1>
      <form className='w-full flex items-center justify-between border-[1px] rounded-[6px] text-white p-3 border-white '>
        <input 
        className='w-full outline-none border-none bg-transparent placeholder:text-white'
          placeholder='Search for a tag'/>
              <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
  )
}

export default SearchBar
