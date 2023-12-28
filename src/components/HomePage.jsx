import React, { useRef, useState } from "react";
import def_img from "../assets/default_image.svg";
const key = import.meta.env.VITE_MY_API_KEY;

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
          Authorization: `Bearer ${key}`,
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
        <div className="h-96 w-96 flex flex-col items-center justify-cente bg-black bg-opacity-30 shadow-5xl rounded-2xl">
          <h1 className="text-white font-bold text-2xl">
            Ai Image <span className="text-red-800">Generator</span>
          </h1>
          {IsLoading ? (
            <div>
              <p className="text-gray-500">Loading...</p>
              <p className="text-gray-500">
                Please wait until your image is ready
              </p>
            </div>
          ) : (
            <div className="py-5">
              <img
                src={Image === "/" ? def_img : Image}
                alt=""
                className="w-52 h-52"
              />
            </div>
          )}

          <div className="pt-5">
            <input type="text" ref={inputRef} />
            <input
              type="submit"
              className="bg-green-800"
              onClick={() => {
                setIsLoading(true);
                ImageGenerator();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
