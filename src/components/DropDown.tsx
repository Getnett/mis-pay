import { FC } from "react";
import { NasaNEO } from "../types/nasaNEO";

interface DropDownProps {
  options: NasaNEO[];
  selectedOrbitalBody: string;
  setSelectedOrbitalBody: Function;
}
const DropDown: FC<DropDownProps> = ({
  options,
  selectedOrbitalBody,
  setSelectedOrbitalBody,
}) => {
  const handleDropDown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrbitalBody(e.target.value);
  };
  return (
    <div className="mb-6">
      <label htmlFor="orbiting-body" className="mr-4">
        Orbiting Body:
      </label>
      <select
        id="orbiting-body"
        value={selectedOrbitalBody}
        onChange={handleDropDown}
      >
        <option value="">All</option>
        {[...new Set(options.map((neo) => neo.orbitingBody))]?.map(
          (orbitalBody) => (
            <option key={orbitalBody} value={orbitalBody}>
              {orbitalBody}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default DropDown;
