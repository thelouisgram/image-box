import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNewTag } from "../../../store/stateSlice";

const SearchBar = () => {
  const [tag, setTag] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const newTag = e.target.value.toLowerCase(); // Store the new tag value
    setTag(newTag); // Update the tag state
    dispatch(setNewTag(newTag)); // Dispatch the new tag value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full h-full md:w-[1100px] mx-auto flex flex-col gap-3 justify-center items-center'>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[18px] md:text-[30px] font-[700] text-white">Welcome to ImageBox</h1>
        <p className="text-white font-[500] ">The internet’s source for visuals.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full flex items-center justify-between bg-white rounded-[3px] text-gray-500 p-3'>
        <input
          onChange={handleInputChange}
          className='w-full outline-none border-none bg-transparent placeholder:text-gray-500'
          placeholder='Search for a tag...'
          value={tag}
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
