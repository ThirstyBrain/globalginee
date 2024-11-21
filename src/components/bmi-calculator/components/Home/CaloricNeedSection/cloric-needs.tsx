import { useContext, useState, useEffect } from "react";
import { heightContext } from "../../../hooks/heightHook";
import { weightContext } from "../../../hooks/weightHook";
import { CaloricNeedsComponent } from "./CaloricNeedsStyles";
import { WaterBottleImg } from "../../../svgs/WaterBottleImg";

export function CaloricNeeds() {
  const [weight] = useContext(weightContext);
  const [height] = useContext(heightContext);
  const [caloricNeeds, setCaloricNeeds] = useState<number>(0);

  useEffect(() => {
    function calcCaloricNeeds(userWeight: number, userHeight: number) {
      const bmr = 10 * userWeight + 6.25 * userHeight - 5 * 33 + 5; // Mifflin-St Jeor formula for men
      const maintenanceCalories = bmr * 1.55; // Moderate activity
      const weightLossCalories = maintenanceCalories - 500; // Deficit for weight loss
      setCaloricNeeds(weightLossCalories);
    }

    calcCaloricNeeds(Number(weight), Number(height));
  }, [weight, height]);

  return (
    <CaloricNeedsComponent>
        <div className="cloric-info-container">
          <div className="cloric-info">
            <h2>Your Daily Caloric Needs</h2>
            <h2> For maintenance, you need approximately</h2>
            <h1> <strong>{caloricNeeds.toFixed(0)} kcal</strong> per day.</h1>
            <WaterBottleImg />
            <h2>For weight loss, aim for{" "}</h2>
            <h2><strong>{(caloricNeeds - 500).toFixed(0)} kcal</strong> per day.</h2>
          </div>
        </div>
    </CaloricNeedsComponent>

  );
}
