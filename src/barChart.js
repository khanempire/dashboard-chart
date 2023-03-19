import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
   const svgRef = useRef();

   useEffect(() => {
      const svg = d3.select(svgRef.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = +svg.attr("width") - margin.left - margin.right;
      const height = +svg.attr("height") - margin.top - margin.bottom;
      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height, 0]);

      const g = svg
         .append("g")
         .attr("transform", `translate(${margin.left},${margin.top})`);

      x.domain(data.map((d) => d.topic));
      y.domain([0, d3.max(data, (d) => d.intensity)]);
      console.log("domain topics", x.domain);

      g.append("g")
         .attr("class", "axis axis--x")
         .attr("transform", `translate(0, ${height})`)
         .call(d3.axisBottom(x));

      g.append("g")
         .attr("class", "axis axis--y")
         .call(d3.axisLeft(y).ticks(5, "s"))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("Intensity");

      g.selectAll(".bar")
         .data(data)
         .enter()
         .append("rect")
         .attr("class", "bar")
         .attr("x", (d) => x(d.topic))
         .attr("y", (d) => y(d.intensity))
         .attr("width", x.bandwidth())
         .attr("height", (d) => height - y(d.intensity));
   }, [data]);

   return (
      <svg ref={svgRef} width={500} height={300}>
         <g className='chart'></g>
      </svg>
   );
};

export default BarChart;
