import { RiskFactorsComponent } from "./RiskFactorStyles";
import { useContext, useState, useEffect } from "react";
import { bmiContext } from "../../../hooks/bmiHook";

export function RiskFactors() {
  const [bmi] = useContext(bmiContext);
  const [riskFactors, setRiskFactors] = useState<string>("");

  useEffect(() => {
    if (bmi >= 25 && bmi <= 29.9) {
      setRiskFactors("Increased risk of heart disease, diabetes, and hypertension. Joint and back pain due to additional weight.");
    } else if (bmi >= 30) {
      setRiskFactors("Increased risk of serious conditions like diabetes, heart disease, and sleep apnea.");
    } else {
      setRiskFactors("Lower risk of serious health issues. Keep up with healthy habits.");
    }
  }, [bmi]);

  return (
    <RiskFactorsComponent>
        <div className="RiskFactors-info-container">
          <div className="fbp-info">
            <h2>Your Health Risk Factors</h2>
            <h2>What can this cause:<strong> {riskFactors}</strong></h2>
          </div>
        </div>
    </RiskFactorsComponent>
   

  );
}
