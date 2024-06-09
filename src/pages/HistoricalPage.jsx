import { redirect } from "react-router-dom";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import ErrorJSON from "../assets/lottie/codes/error.json";
import LoaderJSON from "../assets/lottie/codes/Loader.json";
import Moto from "../assets/moto.png";
import Table from '../components/HistoricalTable'
export default function HistoricalPage() {
  const [data, setData] = useState([]);
  const [comp, setComp] = useState(1);
  const [message, setMessage] = useState("");
  const loaderData = useLoaderData();
  const { type } = useParams();
  const heading =
    type === "1" ? "Weekly Historical Data" : "Daily Historical Data";
  console.log(loaderData);
  useEffect(() => {
    if (loaderData && loaderData.fail === true) {
      setMessage(loaderData.error);
      setComp(2);
    }
    if (loaderData && loaderData.fail === false) {
      setData(loaderData.data);
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
          <h2 className="text-xl text-gray-200 font-bold font-sans mt-2 lg:text-3xl lg:mt-5">{heading}</h2>
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
            <Table data={loaderData.data.data} prefix={type==='1'?'Day':'Hour'}></Table>
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

export async function loader({ params }) {
  let latitude = localStorage.getItem("latitude");
  let longitude = localStorage.getItem("longitude");

  if (!latitude || !longitude) {
    return redirect("/");
  }

  let url;
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get the current date
  const currentDate = new Date();

  // Get the previous day
  const previousDate = new Date();
  previousDate.setDate(previousDate.getDate() - 1);

  const previousWeekDate = new Date();
  previousWeekDate.setDate(previousWeekDate.getDate() - 7);
  // Format dates
  const CurrentDate = formatDate(currentDate);
  const PreviousDate = formatDate(previousDate);
  const PreviousWeekDate = formatDate(previousWeekDate);
  if (params.type === "1") {
    url = `https://api.weatherbit.io/v2.0/history/daily?lat=${latitude}&lon=${longitude}&start_date=${PreviousWeekDate}&end_date=${CurrentDate}&tz=local&key=b5c69ab7e327472ba2a9cf60ca0aebbd`;
  } else {
    url = `https://api.weatherbit.io/v2.0/history/hourly?lat=${latitude}&lon=${longitude}&start_date=${PreviousDate}&end_date=${CurrentDate}&tz=local&key=b5c69ab7e327472ba2a9cf60ca0aebbd`;
  }

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    return { data: "", error: "Failed to fetch data", fail: true };
  }
  const data = await response.json();
  return { data: data, error: "", fail: false };
}
