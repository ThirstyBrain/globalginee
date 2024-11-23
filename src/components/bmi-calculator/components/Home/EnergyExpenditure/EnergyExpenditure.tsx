import { useContext, useState, useEffect } from "react";
import { weightContext } from "../../../hooks/weightHook";
import { EnergyExpenditureComponent } from "./EnergyExpenditureStyles";

export function EnergyExpenditure() {
  const [weight] = useContext(weightContext);
  const [energyExpenditure, setEnergyExpenditure] = useState<number>(0);

  useEffect(() => {
    function calcEnergyExpenditure(userWeight: number) {
      const calorieDeficitForFatBurn = 7700; // 1kg of fat = 7700 calories
      setEnergyExpenditure(calorieDeficitForFatBurn);
    }

    calcEnergyExpenditure(Number(weight));
  }, [weight]);

  return (
    <EnergyExpenditureComponent>
        <div className="EnergyExpenditure-info-container">
          <div className="fbp-info">
            <h2>Energy Expenditure</h2>
            <h2> To burn 1 kg of fat, you need to create a deficit of<strong>{energyExpenditure} kcal</strong>.Regular physical activity and a balanced diet can help you achieve this goal.</h2>
          </div>
        </div>
      <p> </p>
      <p></p>
    
    </EnergyExpenditureComponent>

  );
}
