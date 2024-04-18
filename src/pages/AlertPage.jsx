import { redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import ErrorJSON from "../assets/lottie/codes/error.json";
import LoaderJSON from "../assets/lottie/codes/Loader.json";
import Moto from "../assets/moto.png";
import AlertCard from "../components/AlertCard";
export default function AlertPage() {
  const [comp, setComp] = useState(1);
  const [message, setMessage] = useState("");
  const [alerts, setAlerts] = useState([]);
  const loaderData = useLoaderData();
  useEffect(() => {
    if (loaderData && loaderData.fail === true) {
      setMessage(loaderData.error);
      setComp(2);
    }
    if (loaderData && loaderData.fail === false) {
      setAlerts(loaderData.data.alerts);
      setComp(0);
    } else {
      setComp(1);
    }
  }, [loaderData]);

  return (
    <div className="w-screen min-h-screen pt-4 pb-8 flex flex-col items-center bg-blue-700 lg:overflow-x-hidden">
      {comp === 0 && (
        <>
          <img
            src={Moto}
            alt="MeteorMate"
            className="object-scale-down max-h-10 drop-shadow-md rounded-md mt-3"
          />
          <h2 className="text-2xl text-white font-bold font-serif tracking-wider mt-3 lg:text-3xl">
            Alerts
          </h2>

          {alerts.length === 0 && (
            <h2 className="text-xl text-white font-bold font-serif text-center tracking-wider mt-3 lg:text-2xl">
              No current weather alerts in you area!!
            </h2>
          )}
          {alerts.length > 0 && (
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
              {alerts.map((alert, index) => {
                return <AlertCard key={index} data={alert}></AlertCard>;
              })}
            </section>
          )}
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

  const url = `https://api.weatherbit.io/v2.0/alerts?lat=${latitude}&lon=${longitude}&key=f99f01ee4bc241f9bcb04e52054fef37`;

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    return { data: "", error: "Failed to load data", fail: true };
  }

  const data = await response.json();
  return { data: data, error: "", fail: false };
}
