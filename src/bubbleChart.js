import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data }) => {
   const svgRef = useRef(null);

   useEffect(() => {
      const svg = d3.select(svgRef.current);

      // set up the chart dimensions and margins
      const margin = { top: 20, right: 20, bottom: 50, left: 70 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // create the x and y scales
      const xScale = d3.scaleLinear().range([0, width]);
      const yScale = d3.scaleLinear().range([height, 0]);

      // set up the radius scale
      const rScale = d3.scaleSqrt().range([2, 20]);

      // define the x and y accessors
      const xAccessor = (d) => d.topic;
      const yAccessor = (d) => d.intensity;

      // define the radius accessor
      const rAccessor = (d) => d.likelihood;
      data.map((d) => {
         console.log("dddd", d.relevance);
         console.log("dddd intensity", d.intensity);
         console.log("dddd likelihood", d.likelihood);
         return d;
      });

      // load the data and set up the chart
      // set the domains of the x, y, and radius scales
      xScale.domain(d3.extent(data, xAccessor)).nice();
      yScale.domain(d3.extent(data, yAccessor)).nice();
      rScale.domain(d3.extent(data, rAccessor)).nice();

      // add the x and y axes
      svg.append("g")
         .attr("transform", `translate(0,${height})`)
         .call(d3.axisBottom(xScale));
      svg.append("g").call(d3.axisLeft(yScale));

      // add the bubbles
      svg.selectAll("circle")
         .data(data)
         .join("circle")
         .attr("cx", (d) => xScale(xAccessor(d)))
         .attr("cy", (d) => yScale(yAccessor(d)))
         .attr("r", (d) => rScale(rAccessor(d)))
         .attr("fill", "steelblue")
         .attr("opacity", 0.7)
         .append("title")
         .text((d) => `${d.title}: ${d.insight}`);
   }, [data]);

   return (
      <svg ref={svgRef} width='600' height='400'>
         <text x='300' y='20' textAnchor='middle'>
            Bubble Chart
         </text>
      </svg>
   );
};

export default BubbleChart;
