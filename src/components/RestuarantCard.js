import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData?.data;
  return (
    <div className="m-4 p-4 w-[250px] bg-gray-300 rounded-lg hover:bg-gray-400 shadow-2xl" >
      <img
        className="rounded-lg my-4"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-1 text-lg">{name}</h3>
      <h4 className="font-semibold">{cuisines.join(", ")}</h4>
      <h4 className="font-semibold bg-blue-300 w-20 text-center my-1 p-1 rounded-md">{avgRating} ⭐</h4>
      <h4 className="font-semibold my-1">{costForTwo / 100} FOR TWO</h4>
      <h4 className="font-semibold my-1">{deliveryTime} minutes</h4>
    </div>
  );
};

export const withPromotedLabel= (RestaurantCard)=>{
  return(props) =>{
    return(
      <div>
      <label className="absolute bg-black text-white  p-1 rounded-md">Promoted</label>
      <RestaurantCard {...props}/>
      </div>
    )
  }
}

export default RestaurantCard;
