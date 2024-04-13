import React, { useRef, useEffect,useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import Moto from "../assets/moto.png";
import LoaderJSON from "../assets/lottie/codes/Loader.json";
import ErrorJSON from "../assets/lottie/codes/error.json";

export default function SearchPage() {
  const [comp, setComp] = useState(0);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [loader,setLoader] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  async function makeReq(){
        const inputValue = inputRef.current.value;
        let uri =  `https://api.locationiq.com/v1/autocomplete?key=pk.ba64f7dd65060bf70718b162dbe07521&q=${inputValue}&limit=25&dedupe=1&`
        setLoader(true);
        const response = await fetch(uri,{method:"GET"})
        setLoader(false);
        if(!response.ok){
            setResults([])
        }
        const data = await response.json()
        setResults(data)
  }

  function setCoordinates(latitude,longitude){
        localStorage.setItem('latitude',latitude);
        localStorage.setItem('longitude',longitude);
        navigate('/home');
  }
  return (
    <>
      {comp === 0 && (
        <div className="w-screen min-h-screen pt-4 pb-8 flex flex-col items-center bg-blue-700 lg:overflow-x-hidden ">
          <img
            src={Moto}
            alt="MeteorMate"
            className="object-scale-down max-h-7 drop-shadow-md rounded-md mt-3"
          />
          <input
            type="text"
            placeholder="search"
            className="bg-white rounded-lg px-4 py-2 mt-5 text-lg font-sans text-gray-500 font-normal w-[90vw] lg:text-xl lg:w-[30vw] focus:outline-none"
            ref={inputRef}
            onChange = {makeReq}
          />
          {loader === true && (
        <div className="flex flex-col items-center mt-40">
          <Player
            src={LoaderJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "300px", width: "300px" }}
          />
        </div>
      )}
        {results.length === 0 && (<h2 className="text-white font-medium font-sans mt-5 text-lg lg:text-xl">No result to show!</h2>)}
        {results.length >0 && (<section className="flex flex-col mt-3 w-[90vw] items-center py-2 bg-white gap-3 rounded-lg lg:w-[30vw]">
            {results.map((val,index)=>(
                <h1 className="text-center cursor-pointer font-medium font-sans text-gray-700 hover:text-blue-600" key={index}
                onClick={()=>{setCoordinates(val.lat,val.lon)}}>{val.display_name}</h1>
            ))}
        </section>)}
        </div>
      )}

      

      {comp === 2 && (
        <div className="flex flex-col items-center mt-40">
          <Player
            src={ErrorJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "200px", width: "200px" }}
          />
          <h2 className="mt-4 text-xl text-gray-500 text-center">{message}</h2>
        </div>
      )}
    </>
  );
}
