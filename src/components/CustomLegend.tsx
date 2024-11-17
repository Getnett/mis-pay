import { FC } from "react";
import { ILegend } from "../types/legend";

const CustomLegend: FC<{ payload: ILegend[] }> = ({ payload }) => {
  return (
    <div className="flex justify-center items-center ml-8">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex  items-center my-2 mr-4">
          <div
            className={`flex w-5 h-4  mr-2 gap-2`}
            style={{
              backgroundColor: entry.color,
            }}
          />
          <span className="text-sm">
            {entry.dataKey === "estimatedDiameterMin"
              ? "Min estimated Diameter (km)"
              : "Max estimated Diameter (km)"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
