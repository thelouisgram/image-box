/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import ImageCard from "./ImageCard";
import { setImageData } from "../../../store/stateSlice";
import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Component for each sortable image item
const SortableItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={item.id}
    >
      <ImageCard item={item} />
    </div>
  );
};

// Main Images component
const Images = () => {
  const dispatch = useDispatch();
  const { photos, tag, isAuthenticated } = useSelector((state) => state.app);

  const { data } = photos;
  const imageData = data.map((item) => {
    const alt = item.alt_description;
    const image = item.urls.regular;
    const tags = item.tags.map((tag) => tag.title);
    const id = item.id;

    return {
      image,
      tags,
      alt,
      id,
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

  // Callback when dragging ends
  const onDragEnd = (event) => {
    const { active, over } = event;

    if (!isAuthenticated) {
      // Display a message when the user is not authenticated
      alert("Please log in to use drag and drop.");
      return;
    }

    if (active.id === over.id) {
      return;
    }

    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <div className="w-full px-3 xs:px-5 md:px-0 md:w-[1100px] mx-auto h-full pb-5">
      {message && (
        <div className="h-full w-full flex justify-center items-center mb-3 font-[500] text-[18px]">
          <h3>{message}</h3>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full h-auto">
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items.map((item) => (
                <SortableItem key={item.id} item={item} />
              ))}
            </SortableContext>
          </DndContext>
      </div>
    </div>
  );
};

export default Images;
