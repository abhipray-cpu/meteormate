import { redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import ErrorJSON from "../assets/lottie/codes/error.json";
import LoaderJSON from "../assets/lottie/codes/Loader.json";
import FewClouds from "../assets/lottie/weather/FewClouds.json";
import Mist from "../assets/lottie/weather/Mist.json";
import OvercastClouds from "../assets/lottie/weather/OvercastClouds.json";
import ShowerRain from "../assets/lottie/weather/ShoweRain.json";
import Snow from "../assets/lottie/weather/Snow.json";
import SnowShower from "../assets/lottie/weather/SnowShower.json";
import Sun from "../assets/lottie/weather/Sun.json";
import Thunder from "../assets/lottie/weather/Thunder.json";
import ThunderRain from "../assets/lottie/weather/ThunderRain.json";
import ThunderStorm from "../assets/lottie/weather/ThunderStorm.json";
import Rain from "../assets/lottie/weather/Rain.json";
import Moto from "../assets/moto.png";
import Table from '../components/ForecastTable'
export default function ForecastPage() {
  const [data, setData] = useState([]);
  const [comp, setComp] = useState(1);
  const [message, setMessage] = useState("");
  const[day,setDay] = useState([])
  const iconMap = {
    200: ThunderStorm,
    201: ThunderStorm,
    202: ThunderStorm,
    230: Thunder,
    231: Thunder,
    232: Thunder,
    233: Thunder,
    300: Rain,
    301: Rain,
    302: Rain,
    500: Rain,
    501: Rain,
    502: Rain,
    511: Rain,
    520: ShowerRain,
    521: ShowerRain,
    522: ShowerRain,
    600: Snow,
    601: Snow,
    602: Snow,
    610: Snow,
    611: SnowShower,
    612: SnowShower,
    621: SnowShower,
    622: SnowShower,
    623: SnowShower,
    700: Mist,
    711: Mist,
    721: Mist,
    731: Mist,
    741: Mist,
    751: Mist,
    800: Sun,
    801: FewClouds,
    802: FewClouds,
    803: FewClouds,
    804: OvercastClouds,
    900: ThunderRain,
  };
  const loaderData = useLoaderData();
  useEffect(() => {
    if (loaderData && loaderData.fail === true) {
      setMessage(loaderData.error);
      setComp(2);
    }
    if (loaderData && loaderData.fail === false) {
      setData(loaderData.data);
      setDay(loaderData.data.data.map(el => el.weather));
      setComp(0);
    } else {
      setComp(1);
    }
  }, [loaderData]);
  return (
    <div className="w-screen min-h-screen pt-4 pb-8 flex flex-col items-center bg-blue-700 lg:overflow-x-hidden ">
      {comp === 0 && (
        <>
          <img
            src={Moto}
            alt="MeteorMate"
            className="object-scale-down max-h-7 drop-shadow-md rounded-md mt-3"
          />
          <h2 className="text-xl text-gray-200 font-bold font-sans mt-2 lg:text-3xl lg:mt-5">16 Days Weather Forecast</h2>
          <section className="flex flex-col w-[96vw] items-center justify-center lg:w-[60vw]">
          <div className="container flex w-screen flex-col justify-center items-center mt-5 lg:flex-row lg:flex-wrap lg:w-[60vw]">
                <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
                  City:
                  <strong className="font-serif font-bold  text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                    {loaderData.data.city_name}
                  </strong>{" "}
                </span>
                <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
                  Country-Code:
                  <strong className="font-serif font-bold  text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                    {loaderData.data.country_code}
                  </strong>{" "}
                </span>
                <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
                  TimeZone:
                  <strong className="font-serif font-bold  text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                    {loaderData.data.timezone}
                  </strong>{" "}
                </span>
              </div>
               <section className="flex flex-row gap-3 w-[96vw] lg:w-[90vw] overflow-x-auto mt-5">
                  {day.map((value,index)=>(
                    <div key={index}>
                    <Player
            src={iconMap[value.code]?iconMap[value.code] : iconMap[900]}
            loop
            autoplay
            speed={2}
            style={{ height: "150px", width: "150px" }}
          />
          <h3 className="text-lg text-gray-200 text-center font-medium font-mono lg:text-xl">{value.description}</h3>
          <h3 className="text-lg text-gray-200 text-center font-medium font-mono lg:text-xl">Day{index+1}</h3>
                    </div>
                  ))}
               </section>
            <Table data={data.data}></Table>
          </section>
        </>
      )}
      {comp === 1 && (
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
      {comp === 2 && (
        <div className="flex flex-col items-center mt-40">
          <Player
            src={ErrorJSON}
            loop
            autoplay
            speed={2}
            style={{ height: "200px", width: "200px" }}
          />
          <h2 className="mt-4 text-xl text-gray-200 text-center">{message}</h2>
        </div>
      )}
    </div>
  );
}

export async function loader() {
  let latitude = localStorage.getItem("latitude");
  let longitude = localStorage.getItem("longitude");

  if (!latitude || !longitude) {
    return redirect("/");
  }
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=b5c69ab7e327472ba2a9cf60ca0aebbd`;
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    return { data: "", error: "Failed to fetch data", fail: true };
  }
  const data = await response.json();
  return { data: data, error: "", fail: false };
}
