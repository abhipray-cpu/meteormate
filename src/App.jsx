import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AlertPage, { loader as alertLoader } from "./pages/AlertPage";
import ClimatePage, { loader as climateLoader } from "./pages/ClimatePage";
import ForecastPage, { loader as forecastLoader } from "./pages/ForecastPage";
import HistoricalPage, {
  loader as historicalLoader,
} from "./pages/HistoricalPage";
import HomePage, { loader as homeLoader } from "./pages/HomePage";
import Precipitation, {
  loader as precipitationLoader,
} from "./pages/Precipitation";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    id: "index",
    index: true,
  },
  {
    path: "/home",
    element: <HomePage />,
    loader: homeLoader,
    id: "home",
  },
  {
    path: "/search",
    element: <SearchPage />,
    id: "search",
  },
  {
    path: "/alert",
    element: <AlertPage />,
    loader: alertLoader,
    id: "alert",
  },
  {
    path: "/climate",
    element: <ClimatePage />,
    loader: climateLoader,
    id: "climate",
  },
  {
    path: "/forecast/weather",
    element: <ForecastPage />,
    loader: forecastLoader,
    id: "forecast",
  },
  {
    path: "/historical/:type",
    element: <HistoricalPage></HistoricalPage>,
    loader: historicalLoader,
    id: "historical",
  },
  {
    path: "/precipitation",
    element: <Precipitation></Precipitation>,
    loader: precipitationLoader,
    id: "precipitation",
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
