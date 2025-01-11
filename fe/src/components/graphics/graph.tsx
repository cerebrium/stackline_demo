import { useEffect, useRef, useState } from "react";
import { StacklineSales } from "../../services/products/types";
import * as d3 from "d3";

type GraphProps = {
  sales_data: StacklineSales;
  shouldRerenderTable: boolean;
};

type DataPoint = {
  date: Date; // Ensure dates are in JavaScript `Date` format
  value: number;
};

/*
 * Important: This cannot rerender when the sorts happen
 * on the table.
 */
export const Graph: React.FC<GraphProps> = ({
  sales_data,
  shouldRerenderTable,
}) => {
  const chart_ref = useRef<SVGSVGElement | null>(null);

  // We need to actually interact with the dom and find the dimensions of the
  // parent div for the chart from the ref so we can update the element.
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    // Update dimensions whenever the window is resized
    const handleResize = () => {
      if (chart_ref.current) {
        const { width, height } = chart_ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    if (
      !chart_ref.current ||
      !sales_data ||
      sales_data.length === 0 ||
      !shouldRerenderTable ||
      !dimensions.width ||
      !dimensions.height
    ) {
      return;
    }

    const retail_sales_data: Array<DataPoint> = [];
    const wholesale_sales_data: Array<DataPoint> = [];

    for (const { retailSales, wholesaleSales, weekEnding } of sales_data) {
      const date = new Date(weekEnding);

      retail_sales_data.push({ date, value: retailSales });
      wholesale_sales_data.push({ date, value: wholesaleSales });
    }

    const dataSets = [
      { label: "Retail Sales", data: retail_sales_data, color: "#45A8F6" },
      {
        label: "Wholesale Sales",
        data: wholesale_sales_data,
        color: "#99A6BF",
      },
    ];

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    // Clear previous chart
    const svgElement = d3.select(chart_ref.current);
    svgElement.selectAll("*").remove();

    const svg = svgElement
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("text")
      .attr("x", -40) // Position it horizontally in the center
      .attr("y", -5) // Position it above the graph (based on margin.top)
      .attr("text-anchor", "left") // Center-align the text
      .attr("font-size", "18px") // Set font size
      .text("Retail Sales");

    // Combine all data points to compute global domains
    const allData = dataSets.flatMap((set) => set.data);

    // Set scales
    const x = d3
      .scaleTime()
      .domain(d3.extent(allData, (d) => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allData, (d) => d.value) || 0])
      .nice()
      .range([height, 0]);

    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b") as any));

    // Make the text bigger on the labels
    xAxis.selectAll("text").style("font-size", "18px"); // Change font size for axis labels

    // Remove the ticks
    xAxis.selectAll("line").style("stroke", "none");

    xAxis
      .select(".domain")
      .style("stroke", "lightgrey")
      .style("stroke-width", "1px");

    dataSets.forEach((dataSet) => {
      const line = d3
        .line<DataPoint>()
        .x((d) => x(d.date) || 0)
        .y((d) => y(d.value) || 0)
        .curve(d3.curveBasis);

      svg
        .append("path")
        .datum(dataSet.data)
        .attr("fill", "none")
        .attr("stroke", dataSet.color)
        .attr("stroke-width", 4)
        .attr("d", line as any);
    });

    const legend = svg
      .append("g")
      .attr("transform", `translate(${width - 150}, 10)`);

    dataSets.forEach((dataSet, index) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(0, ${index * 20})`);

      legendItem
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", dataSet.color);

      legendItem
        .append("text")
        .attr("x", 15)
        .attr("y", 10)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .text(dataSet.label);
    });

    return () => {
      if (!shouldRerenderTable) {
        svgElement.selectAll("*").remove();
      }
    };
  }, [sales_data, dimensions]);

  return (
    <section className="stackline_graph">
      <svg ref={chart_ref} className="chart_svg"></svg>
    </section>
  );
};
