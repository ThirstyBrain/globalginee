import { useContext, useState, useEffect } from "react";
import { heightContext } from "../../../hooks/heightHook";
//import { weightContext } from "../../../hooks/weightHook";
import { IdealWeightRangeComponent } from "./IdealWeightStyles";

export function IdealWeightRange() {
  //const [weight] = useContext(weightContext);
  const [height] = useContext(heightContext);
  const [idealWeightRange, setIdealWeightRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });

  useEffect(() => {
    function calcIdealWeightRange(userHeight: number) {
      const heightInMeter = userHeight / 100;
      const minWeight = 18.5 * (heightInMeter * heightInMeter);
      const maxWeight = 24.9 * (heightInMeter * heightInMeter);
      setIdealWeightRange({ min: minWeight, max: maxWeight });
    }

    calcIdealWeightRange(Number(height));
  }, [height]);


  return (
    <IdealWeightRangeComponent>
        <div className="IdealWeight-info-container">
          <div className="IdealWeight-info">
            <h2> Your ideal weight range is between </h2>
            <h2> {idealWeightRange.min.toFixed(2)} kg and {idealWeightRange.max.toFixed(2)} kg.Consider setting a gradual goal to reach this range.</h2>
          </div>
        </div>
    </IdealWeightRangeComponent>
      

  );
}
