import { redirect } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import ErrorJSON from "../assets/lottie/codes/error.json";
import LoaderJSON from "../assets/lottie/codes/Loader.json";
import Moto from "../assets/moto.png";
import Table from "../components/ClimateTable";
export default function ClimatePage() {
  const [data, setData] = useState([]);
  const [comp, setComp] = useState(1);
  const [message, setMessage] = useState("");
  const loaderData = useLoaderData();
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
          <h2 className="text-2xl text-white font-bold font-serif tracking-wider mt-3 lg:text-3xl">
            Climate Normals
          </h2>
          <Table data={data.data}></Table>
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
  function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  }

  function getStartAndEndDate() {
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setMonth(startDate.getMonth() - 3);

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(currentDate);

    return {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  }

  const { startDate, endDate } = getStartAndEndDate();
  if (!latitude || !longitude) {
    return redirect("/");
  }
  const url = `https://api.weatherbit.io/v2.0/normals?lat=${latitude}&lon=${longitude}&start_day=${startDate}&end_day=${endDate}&tp=daily&key=f99f01ee4bc241f9bcb04e52054fef37`;

  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    return { data: "", error: "Failed to fetch data", fail: true };
  }
  const data = await response.json();
  return { data: data, error: "", fail: false };
}