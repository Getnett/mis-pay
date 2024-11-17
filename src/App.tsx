import { useEffect, useState } from "react";
import "./App.css";
import { NasaNEO } from "./types/nasaNEO";
import { apiConfig } from "./config/apiConfig";
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
      }
    }
    fetchNasaNEOData();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Fetched the data</h1>
    </>
  );
}

export default App;
