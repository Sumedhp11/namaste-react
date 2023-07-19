import RestaurantCard from "./RestuarantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withPromotedLabel } from "./RestuarantCard";

const Body = () => {
  const [listOfRestuarants, setListOfRestuarants] = useState([]);
  const [filteredRestaurant, setFilteredRestuarant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardpromoted = withPromotedLabel(RestaurantCard);
  // console.log(listOfRestuarants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1866814&lng=72.8655789&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestuarants(json.data?.cards[2]?.data?.data?.cards);
    setFilteredRestuarant(json.data?.cards[2]?.data?.data?.cards);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return <h1>Looks Like You Are offline!! Please Check Your Internet</h1>;

  return listOfRestuarants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex ">
        <div className="m-4 ">
          <input
            type="text"
            className="border border-solid border-black rounded-md"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            value={searchText}
          />

          <button
            className="bg-green-300 px-4 m-4 py-1 rounded-lg"
            onClick={() => {
              console.log("triggered");
              const filteredRestuarants = listOfRestuarants.filter((res) =>
                res?.data?.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestuarant(filteredRestuarants);
            }}
          >
            Search
          </button>
        </div>
        <div className="m-2 p-2 flex items-center">
          <button
            className="px-4 py-1 bg-gray-400 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestuarants.filter(
                (res) => res.data.avgRating > 4
              );
              setFilteredRestuarant(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.data.id}
            to={"/restaurants/" + restaurant.data.id}
          >
            {
              restaurant.data.promoted? <RestaurantCardpromoted resData={restaurant}/>:
              <RestaurantCard key={restaurant.data.id} resData={restaurant} />
            }
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
