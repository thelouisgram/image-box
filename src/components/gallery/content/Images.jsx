import { useSelector } from "react-redux";
import ImageCard from "./ImageCard";

const Images = () => {
    const { photos } = useSelector(
        (state) => state.app
    );

    console.log(photos)
    const {data} = photos
    const mappedData = data.map((item) => {
        const alt = item.alt_description
        const image = item.urls.regular;
        const tags = item.tags.map((tag) => tag.title);

        return {
            image,
            tags,
            alt
        };
    });

  return (
      <div className="grid grid-cols-2  gap-3 sm:grid-cols-4 w-full h-auto">
          {mappedData.map((item, index) => (
              <ImageCard key={index} item={item} />
          ))}
      </div>

  )
}

export default Images
