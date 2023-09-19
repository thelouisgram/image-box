/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import ImageCard from "./ImageCard";
import { setImageData } from "../../../store/stateSlice";
import { useEffect, useState } from "react";

const Images = () => {
    const dispatch = useDispatch();
    const { photos, tag, isAuthenticated } = useSelector((state) => state.app);

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

    // State to manage the order of images
    const [items, setItems] = useState([]);

    const photosWithDesiredTag = tag
        ? imageData.filter((photo) =>
            photo.tags.some((photoTag) => photoTag.includes(tag))
        )
        : [];

    useEffect(() => {
        // Set the state based on whether 'tag' is present or not
        const stateToSet = tag ? photosWithDesiredTag : imageData;
        setItems(stateToSet);

        // Dispatch the image data to the store
        dispatch(setImageData(stateToSet));
    }, [tag]);

    const message = tag
        ? photosWithDesiredTag.length === 0
            ? `No image found with tag '${tag}'`
            : `${photosWithDesiredTag.length} image${photosWithDesiredTag.length !== 1 ? "s" : ""
            } found with tag '${tag}'`
        : "";

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(item));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
        const updatedItems = [...items];
        const oldIndex = updatedItems.findIndex(
            (item) => item.alt === draggedItem.alt
        );
        updatedItems.splice(targetIndex, 0, updatedItems.splice(oldIndex, 1)[0]);
        setItems(updatedItems);
    };

    return (
        <div className="w-full px-3 xs:px-5 md:px-0 md:w-[1100px] mx-auto h-full pb-5">
            {message && (
                <div className="h-full w-full flex justify-center items-center mb-3 font-[500] text-[18px]">
                    <h3>{message}</h3>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full h-auto">
                {items.map((item, index) => (
                    !isAuthenticated ? (
                        // Render a normal div if isAuthenticated is true
                        <div key={item.alt}>
                            <ImageCard item={item} />
                        </div>
                    ) : (
                        // Render a draggable div if isAuthenticated is false
                        <div
                            key={item.alt}
                            draggable={!isAuthenticated}
                            onDragStart={(e) => handleDragStart(e, item)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            <ImageCard item={item} />
                        </div>
                    )
                ))}
            </div>
        </div>
    );

};

export default Images;
