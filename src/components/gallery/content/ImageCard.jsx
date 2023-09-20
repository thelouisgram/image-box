/* eslint-disable react/prop-types */
const ImageCard = ({item}) => {
  return (
    <div className="w-full h-full image bg-gray-200">
          <img src={item.image} alt={item.alt} className="w-full h-full object-cover"/>
    </div>
  )
}

export default ImageCard
