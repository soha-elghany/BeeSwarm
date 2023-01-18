async function beeSwarmChart() {

    var data = await d3.json("./gdpdata.json")
    console.log(data)

    var height = 1000;
    var width = 900;
    var margin = [50,60,50,60];
    
    var svg = d3.select("#bee")
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    var sectors = Array.from(new Set(data.map((d)=>d.Name)));
    var xScale = d3
            .scaleBand()
            .domain(sectors)
            .range([margin[3],width - margin[1]]);

    var yScale = d3
            .scaleLinear()
            .domain(d3.extent(data.map((d)=> d.Value)))
            .range([height - margin[2], margin[0]]);

    var color = d3.scaleOrdinal().domain(sectors).range(d3.schemePaired);

    svg.selectAll(".circ")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circ")
        .attr("stroke","black")
        .attr("fill", (d)=> color(d.Name))
        .attr("r", (d)=> size(d.Value))
        .attr("cx", (d)=> xScale(d.Name))
        .attr("cy", (d)=> yScale(d.Value))

    

}
beeSwarmChart()