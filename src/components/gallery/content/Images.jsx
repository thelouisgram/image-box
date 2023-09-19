/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import ImageCard from "./ImageCard";
import { setImageData } from "../../../store/stateSlice";
import { useEffect } from "react";

const Images = () => {
    const dispatch = useDispatch();
    const { photos, tag } = useSelector((state) => state.app);

    const { data } = photos;
    const imageData = data.map((item) => {
        const alt = item.alt_description;
        const image = item.urls.regular;
        const tags = item.tags.map((tag) => tag.title);

        return {
            image,
            tags,
            alt,
        };
    });

    useEffect(() => {
        dispatch(setImageData(imageData));
    }, []);

    const photosWithDesiredTag = imageData.filter((photo) => {
        return photo.tags.some((photoTag) => photoTag.includes(tag));
    });

    const message = tag
        ? photosWithDesiredTag.length === 0
            ? `No image found with tag '${tag}'`
            : `${photosWithDesiredTag.length} image${photosWithDesiredTag.length !== 1 ? "s" : ""
            } found with tag '${tag}'`
        : "";

    return (
        <div className="w-full px-3 xs:px-5 md:px-0 md:w-[1100px] mx-auto h-full">
            {message && (
                <div className="h-full w-full flex justify-center items-center mb-3 font-[500] text-[18px]">
                    <h3>{message}</h3>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full h-auto">
                {(tag ? photosWithDesiredTag : imageData).map((item, index) => (
                    <ImageCard key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Images;
