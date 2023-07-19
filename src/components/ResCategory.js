import { useState } from "react";
import ItemList from "./ItemList"
const ResCategory = ({data,showItems,setShowIndex}) => {
    
    // console.log(data);
    const handleClick = () =>{
       setShowIndex()
    }
    return (
      <div>
        <div className="w-6/12 mx-auto my-4 bg-gray-200 shadow-xl p-4  ">
          <div className="flex justify-between cursor-pointer" onClick={handleClick}>
            <span className="font-medium">
              {data.title} ({data.itemCards.length})
            </span>
            <span>⬇️</span>
          </div>
          {showItems && <ItemList items={data.itemCards} />}
        </div>
      </div>
    );
}

export default ResCategory