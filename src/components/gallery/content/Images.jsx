import { useSelector, useDispatch } from "react-redux";
import ImageCard from "./ImageCard";
import { setRefinedData } from "../../../store/stateSlice";
import { useEffect } from "react";

const Images = () => {
    const dispatch = useDispatch()
    const { photos } = useSelector(
        (state) => state.app
    );

    const {data} = photos
    const refinedData = data.map((item) => {
        const alt = item.alt_description
        const image = item.urls.regular;
        const tags = item.tags.map((tag) => tag.title);

        return {
            image,
            tags,
            alt
        };
    });

    useEffect(()=>{
        dispatch(setRefinedData(refinedData))
    },[])

  return (
      <div className="grid grid-cols-2  gap-3 sm:grid-cols-4 w-full h-auto">
          {refinedData.map((item, index) => (
              <ImageCard key={index} item={item} />
          ))}
      </div>

  )
}

export default Images
