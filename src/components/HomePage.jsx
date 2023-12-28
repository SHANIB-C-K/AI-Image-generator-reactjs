import React from "react";
import.meta.env.VITE_MY_API_KEY;
import def_img from "../assets/default_image.svg";

const HomePage = () => {
  return (
    <>
      <div className="h-screen w-screen bg-gray-800 flex items-center justify-center">
        <div className="h-96 w-96 flex flex-col items-center justify-center">
          <h1 className="text-white">
            Ai Image <span>Generator</span>
          </h1>
          <img src={def_img} alt="" />
          <div className="pt-5">
            <input type="text" />
            <input type="submit" className="bg-green-800" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
