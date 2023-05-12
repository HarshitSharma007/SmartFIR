import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";

const fakeFIRData = [
  { state: "Maharashtra", cases: 100 },
  { state: "Uttar Pradesh", cases: 75 },
  { state: "Karnataka", cases: 50 },
  { state: "Gujarat", cases: 80 },
  { state: "Bihar", cases: 60 },
  { state: "West Bengal", cases: 70 },
  { state: "Rajasthan", cases: 90 },
  { state: "Andhra Pradesh", cases: 55 },
  { state: "Tamil Nadu", cases: 85 },
  { state: "Madhya Pradesh", cases: 65 },
];

const Dummy3 = () => {
  return (
    <div style={{width:"500px",height:"500px", display:"flex" , justifyContent:"center",alignItems:"center", marginLeft:"500px",marginBottom:"500px"}}>

    <VictoryChart domainPadding={20}>
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        tickFormat={[
          "Maharashtra",
          "Uttar Pradesh",
          "Karnataka",
          "Gujarat",
          "Bihar",
          "West Bengal",
          "Rajasthan",
          "Andhra Pradesh",
          "Tamil Nadu",
          "Madhya Pradesh",
        ]}
        orientation="bottom"
        style={{
          tickLabels: {
            angle: -90,
            verticalAnchor: "middle",
            textAnchor: "end",
          },
        }}
      />
      <VictoryAxis dependentAxis />
      <VictoryBar data={fakeFIRData} x="state" y="cases" />
    </VictoryChart>
    </div>
  );
};

export default Dummy3;
