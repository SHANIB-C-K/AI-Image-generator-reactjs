// This is HomePage
// This is importinng section
import React, { useRef, useState } from "react";
import def_img from "../assets/default_image.svg";
const key = import.meta.env.VITE_MY_API_KEY;
import Tilt from "react-parallax-tilt";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  const [Image, setImage] = useState("/");
  const [IsLoading, setIsLoading] = useState(false);
  let inputRef = useRef(null);

  const ImageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`, //${key} add your api key
          "User-Agent": "Brave",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    setIsLoading(false);
    let data_array = data.data;
    setImage(data_array[0].url);
    setIsLoading(false);
  };
  return (
    <>
      <div className="h-screen w-screen bg-gray-800 flex items-center justify-center">
        <div className="h-96 w-96 flex flex-col items-center justify-cente bg-black bg-opacity-30 rounded-2xl pt-5 shadow-2xl shadow-green-900">
          <h1 className="text-white font-bold text-3xl">
            AI Image{" "}
            <span className="text-red-800">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  " ",
                  1000,
                  "Generator",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "1.875rem", display: "inline-block" }}
                repeat={Infinity}
              />
            </span>
          </h1>
          {IsLoading ? (
            <div className="h-64 w-80 flex flex-col items-center justify-center">
              <div
                className="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-blue-500 border-t-transparent"
              ></div>
              <div className="pt-5">
                <p className="text-gray-500">
                  Please wait until your image is ready
                </p>
              </div>
            </div>
          ) : (
            <div className="py-5">
              <Tilt>
                <img
                  src={Image === "/" ? def_img : Image}
                  alt=""
                  className="w-52 h-52 rounded-xl"
                />
              </Tilt>
            </div>
          )}

          <div className="pt-5 flex flex-row pb-5">
            <input
              type="text"
              ref={inputRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type which image you want"
              required
            />
            <button
              onClick={() => {
                ImageGenerator();
                setIsLoading(true);
              }}
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
