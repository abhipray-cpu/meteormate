import Moto from "../assets/moto.png";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import LoaderJSON from "../assets/lottie/codes/Loader.json";
import ErrorJSON from "../assets/lottie/codes/error.json";
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
import Alert from "../assets/icons/alert.png";
import Climate from "../assets/icons/climate.png";
import Forecast from "../assets/icons/forecast.png";
import Historical from "../assets/icons/historical.png";
import Table from "../components/Table";
export default function HomePage() {
  const [comp, setComp] = useState(1);
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherdata, setWeatherData] = useState({});
  const [minutelyData, setMinutelyData] = useState([]);

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
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  useEffect(() => {
    if (loaderData && loaderData.fail === true) {
      setMessage(loaderData.error);
      setComp(2);
    }
    if (loaderData && loaderData.fail === false) {
      setWeatherData(loaderData.data.data[0]);
      setMinutelyData(loaderData.data.minutely);
      setWeather(loaderData.data.data[0].weather["code"]);
      localStorage.setItem("city", loaderData.data.data[0].city_name);
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
          <div className="w-80  h-12 bg-white rounded-xl mt-5 cursor-pointer text-gray-400 font-mono flex flex-col justify-center text-xl pl-4">
            Search
          </div>
          <Player
            src={iconMap[weather] ? iconMap[weather] : iconMap[900]}
            loop
            autoplay
            speed={2}
            style={{ height: "200px", width: "200px" }}
          />
          <h2 className="text-gray-200 font-mono tracking-wider font-bold text-3xl lg:text-4xl">
            {weatherdata.weather["description"]}
          </h2>
          <div className="flex flex-row flex-wrap mt-4  justify-center gap-5 w-[90vw] lg:w-[60vw]">
            <div
              className="w-24 h-24 bg-white rounded-xl cursor-pointer flex flex-col items-center justify-center"
              onClick={() => navigate("/alert")}
            >
              <img src={Alert} alt="Alert" />
              <h5 className="text-base font-lg text-blue-700 mt-0">Alert</h5>
            </div>
            <div
              className="w-24 h-24 bg-white rounded-xl cursor-pointer flex flex-col items-center justify-center"
              onClick={() => navigate("/climate")}
            >
              <img src={Climate} alt="Climate" />
              <h5 className="text-base font-lg text-blue-700 mt-0">Climate</h5>
            </div>
            <div
              className="w-24 h-24 bg-white rounded-xl cursor-pointer flex flex-col items-center justify-center"
              onClick={() => navigate("/forecast/weather")}
            >
              <img src={Forecast} alt="Forecast" />
              <h5 className="text-base font-lg text-blue-700 mt-0">Weather</h5>
            </div>
            <div
              className="w-24 h-24 bg-white rounded-xl cursor-pointer flex flex-col items-center justify-center"
              onClick={() => navigate("/precipitation")}
            >
              <img src={Forecast} alt="Forecast" />
              <h5 className="text-base font-lg text-blue-700 mt-0">
                Precipitation
              </h5>
            </div>
            <div
              className="w-24 h-24 bg-white rounded-xl cursor-pointer flex flex-col items-center justify-center"
              onClick={() => navigate("/historical/1")}
            >
              <img src={Historical} alt="Historical" />
              <h5 className="text-base font-lg text-blue-700 mt-0">Daily</h5>
            </div>
            <div
              className="w-24 h-24 bg-white rounded-xl cursor-pointer flex flex-col items-center justify-center"
              onClick={() => navigate("/historical/2")}
            >
              <img src={Historical} alt="Historical" />
              <h5 className="text-base font-lg text-blue-700 mt-0">Hourly</h5>
            </div>
          </div>
          <div className="container flex w-screen flex-col justify-center items-center mt-5 lg:flex-row lg:flex-wrap lg:w-[60vw]">
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Temperature:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.temp}°C
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Apparent Temperature:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.app_temp}°C
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              AQI:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.aqi}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              CityName:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.city_name}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Clouds:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.clouds}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Relative Humidity:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.rh}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Dew Point:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.dewpt}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              DHI:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.dhi}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              DNI{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.dni}
              </strong>
              :{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Elevation Angle:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.elev_angle}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              GHI:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.ghi}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Precipitation:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.precip}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Snow:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.snow}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Solar Radiation:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.solar_rad}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Sunrise@{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.sunrise}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Sunset@{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.sunset}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Visibility:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.vis}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              UV index:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.uv}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Wind Direction:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.wind_cdir_full}
              </strong>{" "}
            </span>
            <span className="font-serif font-medium text-gray-200 mt-3 ml-3 mr-3 text-xl lg:text-2xl">
              {" "}
              Wind Speed:{" "}
              <strong className="font-serif font-bold ml-0 text-gray-100 mt-3 ml-3 mr-3 text-2xl lg:text-3xl">
                {weatherdata.wind_spd}kmph
              </strong>{" "}
            </span>
          </div>
          <h4 className="text-2xl text-gray-200 font-medium font-sans mt-7 mb-0">
            Hourly Data
          </h4>
          <Table data={minutelyData}></Table>
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
          <h2 className="mt-4 text-xl text-gray-500 text-center">{message}</h2>
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
  const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=f99f01ee4bc241f9bcb04e52054fef37&include=minutely`;
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    return { data: "", error: "Failed to load data", fail: true };
  }

  const data = await response.json();
  return { data: data, error: "", fail: false };
}
