async function beeSwarmChart() {

    var data = await d3.json("./gdpdata.json")
    console.log(data)

    let height = 400;
    let width = 900;
    let margin = [50, 60, 50, 100];
    
    
    let svg = d3.select("#bee")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let sectors = Array.from(new Set(data.map((d) => d.Indicator)));
    let xScale = d3
            .scaleBand()
            .domain(sectors)
            .range([margin[3], width - margin[1]]);

    let yScale = d3
            .scaleLinear()
            .domain(d3.extent(data.map((d) => +d["GDP____USD_billions_PPP_"])))
            .range([height - margin[2], margin[0]]);

    let color = d3.scaleOrdinal().domain(sectors).range(d3.schemePaired);

    let population = d3.extent(data.map((d) => +d["population"]));
    let size = d3.scaleSqrt().domain(population).range([3, 40]);
    
    svg.selectAll(".circ")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circ")
    .attr("stroke", "black")
    .attr("fill", (d) => color(d.Indicator))
    .attr("r", (d) => size(d["population"]))
    .attr("cx", (d) => xScale(d.Indicator))
    .attr("cy", (d) => yScale(d.GDP____USD_billions_PPP_));

}
beeSwarmChart()
