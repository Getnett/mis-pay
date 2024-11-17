import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { NasaNEO } from "./types/nasaNEO";
import CustomLegend from "./components/CustomLegend";
import { ILegend } from "./types/legend";
import { apiConfig } from "./config/apiConfig";
import { DB } from "./db";
import "./App.css";

// import { DB } from "./db";

function App() {
  const [nasaNEOData, setNasaNEOData] = useState<NasaNEO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNasaNEOData() {
      try {
        const res = await fetch(apiConfig.nasaNeoAPI);
        const data = await res.json();

        // const data = DB; // maximum api hit reached use local data
        const nasaNEOFetchedData = data.near_earth_objects.map((neo: any) => ({
          name: neo.name,
          estimatedDiameterMin:
            neo.estimated_diameter.kilometers.estimated_diameter_min,
          estimatedDiameterMax:
            neo.estimated_diameter.kilometers.estimated_diameter_max,
          orbitingBody: neo.close_approach_data[0].orbiting_body,
        })) as NasaNEO[];

        // sort by  by average estimated diameter descending.
        nasaNEOFetchedData.sort(
          (neo1, neo2) =>
            (neo2.estimatedDiameterMin + neo2.estimatedDiameterMax) / 2 -
            (neo1.estimatedDiameterMin + neo1.estimatedDiameterMax) / 2
        );

        setNasaNEOData(nasaNEOFetchedData);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNasaNEOData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <BarChart
        width={600}
        height={500}
        data={nasaNEOData}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          label={{
            value: "Min Estimated Diameter(km)",
            position: "bottom",
            offset: -8,
          }}
        />
        <YAxis
          type="category"
          dataKey="name"
          label={{
            value: "NEO name",
            angle: -90,
            position: "insideLeft",
            offset: -15,
          }}
        />
        <Tooltip />
        <Legend
          verticalAlign="top"
          content={({ payload }) => (
            <CustomLegend payload={payload as ILegend[]} />
          )}
        />
        <Bar
          dataKey="estimatedDiameterMin"
          fill="#14389D"
          activeBar={<Rectangle fill="#14389D" stroke="#14389D" />}
        />
        <Bar
          dataKey="estimatedDiameterMax"
          fill="#C70039"
          activeBar={<Rectangle fill="#C70039" stroke="#C70039" />}
        />
      </BarChart>
    </>
  );
}

export default App;
