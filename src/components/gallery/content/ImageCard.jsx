/* eslint-disable react/prop-types */
const ImageCard = ({item}) => {
  return (
    <div className="w-full h-[250px] ">
          <img src={item.image} alt={item.alt} className="w-full h-full object-cover"/>
    </div>
  )
}

export default ImageCard
