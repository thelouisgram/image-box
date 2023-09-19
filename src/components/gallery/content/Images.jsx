/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import ImageCard from "./ImageCard";
import { setImageData } from "../../../store/stateSlice";
import { useEffect, useState } from "react";

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

    // State to manage the order of images
    const [items, setItems] = useState(imageData);

    useEffect(() => {
        dispatch(setImageData(items));
    }, [items]);

    const photosWithDesiredTag = imageData.filter((photo) => {
        return photo.tags.some((photoTag) => photoTag.includes(tag));
    });

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
        const oldIndex = updatedItems.findIndex((item) => item.alt === draggedItem.alt);
        updatedItems.splice(targetIndex, 0, updatedItems.splice(oldIndex, 1)[0]);
        setItems(updatedItems);
    };

    const handleTouchStart = (e, item) => {
        e.preventDefault();
        // Implement touch start logic here
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        // Implement touch move logic here
    };

    const handleTouchEnd = (e, targetIndex) => {
        e.preventDefault();
        // Implement touch end logic here
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <div className="w-full px-3 xs:px-5 md:px-0 md:w-[1100px] mx-auto h-full pb-5">
            {message && (
                <div className="h-full w-full flex justify-center items-center mb-3 font-[500] text-[18px]">
                    <h3>{message}</h3>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full h-auto">
                {items.map((item, index) => (
                    <div
                        key={item.alt}
                        draggable={!isMobile}
                        onTouchStart={isMobile ? (e) => handleTouchStart(e, item) : undefined}
                        onTouchMove={isMobile ? handleTouchMove : undefined}
                        onTouchEnd={isMobile ? (e) => handleTouchEnd(e, index) : undefined}
                        onDragStart={!isMobile ? (e) => handleDragStart(e, item) : undefined}
                        onDragOver={!isMobile ? handleDragOver : undefined}
                        onDrop={!isMobile ? (e) => handleDrop(e, index) : undefined}
                    >
                        <ImageCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
