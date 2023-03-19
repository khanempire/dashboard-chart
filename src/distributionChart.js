import React, { Component } from "react";
import * as d3 from "d3";

class DistributionChart extends Component {
   componentDidMount() {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
         .select(this.refs.chart)
         .append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
         );

      const x = d3.scaleLinear().domain([0, 10]).range([0, width]);

      const y = d3.scaleLinear().range([height, 0]);

      const histogram = d3
         .histogram()
         .value((d) => d.intensity)
         .domain(x.domain())
         .thresholds(x.ticks(10));

      const bins = histogram(this.props.data);

      y.domain([0, d3.max(bins, (d) => d.length)]);

      const bar = svg
         .selectAll(".bar")
         .data(bins)
         .enter()
         .append("g")
         .attr("class", "bar")
         .attr(
            "transform",
            (d) => "translate(" + x(d.x0) + "," + y(d.length) + ")"
         );

      bar.append("rect")
         .attr("x", 1)
         .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
         .attr("height", (d) => height - y(d.length))
         .style("fill", "steelblue");

      bar.append("text")
         .attr("dy", ".75em")
         .attr("y", 6)
         .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
         .attr("text-anchor", "middle")
         .text((d) => d.length);
   }

   render() {
      return <div ref='chart' />;
   }
}

export default DistributionChart;
