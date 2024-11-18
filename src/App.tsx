import { useEffect, useState } from "react";
import DisplayChart from "./components/DisplayChart";
import { NasaNEO } from "./types/nasaNEO";
import { apiConfig } from "./config/apiConfig";
import "./App.css";
import DropDown from "./components/DropDown";

function App() {
  const [nasaNEOData, setNasaNEOData] = useState<NasaNEO[]>([]);
  const [selectedOrbitalBody, setSelectedOrbitalBody] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredNasaNEOData = nasaNEOData.filter((item) =>
    selectedOrbitalBody
      ? item.orbitingBody.toLowerCase() === selectedOrbitalBody.toLowerCase()
      : item
  );

  const handleSelectedOrbitalBody = (value: string) => {
    setSelectedOrbitalBody(value);
  };
  useEffect(() => {
    async function fetchNasaNEOData() {
      try {
        const res = await fetch(apiConfig.nasaNeoAPI);
        const data = await res.json();
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
      <DropDown
        options={nasaNEOData}
        selectedOrbitalBody={selectedOrbitalBody}
        setSelectedOrbitalBody={handleSelectedOrbitalBody}
      />
      <DisplayChart data={filteredNasaNEOData} />
    </>
  );
}

export default App;
