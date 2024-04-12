import { Chart } from "react-google-charts";
export default function ChartComp({ data }) {
  let dataSet = [["Minute", "Precipitation", "Snow", "Temperature"]];
  dataSet = dataSet.concat(data);
  console.log(dataSet);
  const options = {
    chart: {
      title: "Precipitation",
      subtitle: "Hourly Values",
    },
  };
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={dataSet}
      options={options}
    />
  );
}
