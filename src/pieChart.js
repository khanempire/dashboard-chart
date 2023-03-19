// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const PieChart = ({ data }) => {
//    const svgRef = useRef();

//    useEffect(() => {
//       const svg = d3.select(svgRef.current);
//       const width = svg.attr("width");
//       const height = svg.attr("height");
//       const radius = Math.min(width, height) / 2;
//       console.log("radius", radius);

//       const color = d3
//          .scaleOrdinal()
//          .domain(data.map((d) => d.topic))
//          .range(d3.schemeSet2);

//       console.log("color", color());

//       const pie = d3
//          .pie()
//          .value((d) => d.intensity)
//          .sort(null);

//       console.log("pie", pie);

//       const arc = d3.arc().innerRadius(0).outerRadius(radius);

//       const arcs = pie(data);

//       svg.selectAll("path")
//          .data(arcs)
//          .enter()
//          .append("path")
//          .attr("d", arc)
//          .attr("fill", (d) => color(d.data.topic));
//    }, [data]);

//    return <svg ref={svgRef} width={300} height={300}></svg>;
// };

// export default PieChart;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
   const svgRef = useRef(null);

   useEffect(() => {
      const svg = d3.select(svgRef.current);

      // Set the dimensions and margins of the graph
      const width = +svg.attr("width");
      const height = +svg.attr("height");
      const margin = 50;

      // Calculate the radius of the pie chart
      const radius = Math.min(width, height) / 2 - margin;

      const color = d3
         .scaleOrdinal()
         .domain(data.map((d) => d.topic))
         .range(d3.schemeSet2);

      // Create a new pie generator with 1 data item
      //const pie = d3.pie().value(() => 1);
      const pie = d3
         .pie()
         .value((d) => d.intensity)
         .sort(null);

      // Generate the pie data
      const pieData = pie(data);

      // Create a new arc generator with the calculated radius
      const arc = d3.arc().innerRadius(0).outerRadius(radius);

      // Add a group element to center the pie chart
      const g = svg
         .append("g")
         .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // Add a path for each pie slice
      g.selectAll("path")
         .data(pieData)
         .enter()
         .append("path")
         .attr("d", arc)
         .attr("fill", (d) => color(d.data.topic))
         .attr("stroke", "white")
         .style("stroke-width", "2px");
   }, [data]);

   return <svg ref={svgRef} width={300} height={300}></svg>;
};

export default PieChart;
