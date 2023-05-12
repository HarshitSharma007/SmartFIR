import { Divider } from "@chakra-ui/react";
import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

const fakeFIRData = [
  { month: "Jan", count: 20 },
  { month: "Feb", count: 10 },
  { month: "Mar", count: 30 },
  { month: "Apr", count: 15 },
  { month: "May", count: 25 },
  { month: "Jun", count: 35 },
  { month: "Jul", count: 30 },
  { month: "Aug", count: 40 },
  { month: "Sep", count: 20 },
  { month: "Oct", count: 25 },
  { month: "Nov", count: 30 },
  { month: "Dec", count: 45 },
];

const Dummy = () => {
  return (
    <div style={{width:"500px",height:"500px", display:"flex" , justifyContent:"center",alignItems:"center", marginLeft:"500px",marginBottom:"500px"}}>
    <VictoryChart>
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        tickFormat={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]}
      />
      <VictoryAxis dependentAxis />
      <VictoryLine data={fakeFIRData} x="month" y="count" />
    </VictoryChart>
    </div>
  );
};

export default Dummy;
