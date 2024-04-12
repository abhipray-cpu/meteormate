import { Player } from "@lottiefiles/react-lottie-player";
import ErrorJSON from "../assets/lottie/codes/error.json";
import { useState, useEffect } from "react";
import Logo from "../assets/icon.png";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const [comp, setComp] = useState(0);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          localStorage.setItem("latitude", latitude);
          localStorage.setItem("longitude", longitude);
          navigate("/home");
        },
        () => {
          setComp(1);
          setMessage("Please allow geolocation permissions");
        }
      );
    } else {
      setComp(1);
      setMessage("Geolocation is not supported by this browser");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getLocation();
    }, 2000);
  });

  return (
    <div className="w-screen min-h-screen pt-4 pb-4 flex flex-col items-center overflow-hidden">
      {comp === 0 && (
        <>
          <img
            src={Logo}
            alt="MeteorMate"
            className="object-scale-down max-h-28 drop-shadow-md rounded-md mt-40"
          />
          <h2 className="text-gray-700 font-sans font-medium text-2xl lg:text-4xl mt-7 tracking-wide">
            Meteor Mate
          </h2>
          <p className="mt-4 text-xl text-gray-500 text-center">
            Get weather insights at your fingertips! Introducing MeteorMate -
            your go-to for accurate forecasts and sunny days ahead.
          </p>
        </>
      )}
      {comp === 1 && (
        <div className="flex flex-col pt-40 items-center">
          <Player
            src={ErrorJSON}
            loop
            autoplay
            speed={3}
            style={{ height: "200px", width: "200px" }}
          />
          <h2 className="mt-4 text-xl text-gray-500 text-center">{message}</h2>
        </div>
      )}
    </div>
  );
}
