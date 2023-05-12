import React from "react";
import { VictoryBar, VictoryChart,VictoryLabel } from "victory";

const FIRBarChart = ({ data }) => {
  return (
    <div style={{width:"500px",height:"500px", display:"flex" , justifyContent:"center",alignItems:"center", marginLeft:"500px"}}>

    <VictoryChart     >
      <VictoryBar 
        domain={{ y: [0, 5]}}
        barWidth={8}
        data={data} 
        x="parameter" 
        y="fir_count"
      />
    </VictoryChart>
    </div>
  );
};

export default FIRBarChart;
