import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";

const fakeFIRData = [
  { district: "Amritsar", cases: 100 },
  { district: "Barnala", cases: 75 },
  { district: "Bathinda", cases: 50 },
  { district: "Faridkot", cases: 80 },
  { district: "Fatehgarh Sahib", cases: 60 },
  { district: "Fazilka", cases: 70 },
  { district: "Ferozepur", cases: 90 },
  { district: "Gurdaspur", cases: 55 },
  { district: "Hoshiarpur", cases: 85 },
  { district: "Jalandhar", cases: 65 },
];

const Dummy2 = () => {
  return (
    <div style={{width:"500px",height:"500px", display:"flex" , justifyContent:"center",alignItems:"center", marginLeft:"500px",marginBottom:"500px"}}>

    <VictoryChart domainPadding={20}>
      <VictoryAxis tickFormat={["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar"]}
      style={{
        tickLabels: {
          angle: -90,
          verticalAnchor: "middle",
          textAnchor: "end",
        },}} />
      <VictoryAxis dependentAxis />
      <VictoryBar data={fakeFIRData} x="district" y="cases" />
    </VictoryChart>
    </div>
  );
};

export default Dummy2;
