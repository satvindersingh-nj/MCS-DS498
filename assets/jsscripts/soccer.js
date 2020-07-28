function visualization_1(margin, width, height) {

    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // append the svg object to the body of the page
    var svg = d3.select("#dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("https://satvindersingh-nj.github.io/MCS-DS498/data/Data.csv", function (error, data) {
    //d3.csv("http://localhost/data/Data.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.year= d.year;
            d.winner = +d.winner;
            d.cup = +d.cup;
            d.desc = d.desc;
            d.points = +d.points;
            d.GF = d.GF;
            d.GA = d.GA;
        });

        // Add X axis --> it is a date format
        x.domain(data.map(function (d) { return d.year; }));
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-12,30)rotate(-90)")
            .style("font-size", 14);

        // Add Y axis
        y.domain([0, 4]);

        // Initialize the tooltip
        var tooltip = d3.select("#tooltip")
            .style("opacity", 0);

        // Initialize dots with group a
        svg.selectAll("coll")
            .data(data)
            .enter().append("circle")
            .attr("r", 10)
            .attr("cx", function (d) {
                return x(d.year)
            })
            .attr("cy", height)
            .style("fill", function (d) {
                return "white";
            })
            .attr("transform", "translate(15,-10)")
            .on("mouseover", function (d) {

                tooltip.style("opacity", 1)
                    .style("left", (d3.event.pageX - 256) + "px")
                    .style("top", (d3.event.pageY - 160) + "px")
                    .html("<strong>Year: </strong>" + d.year + "<br/><font size='-1'><strong>" + d.desc + "</strong></font><br/><strong>Points: </strong>" + d.points + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                    .translate("transform", "translate(25,100)");
            })
            .on("mouseout", function () { tooltip.style("opacity", 0); })
            .transition().duration(3000).delay(500)
            .attr("cy", function (d) {
                return (d.winner == 1) ? y(d.cup) : 0;
            })
            .style("fill", function (d) {
                if (d.winner == 0)
                    return "white";
                else {
                    if (d.cup == 1) return "#ff0000";
                    if (d.cup == 2) return "#dc143c";
                    if (d.cup == 3) return "#cd5c5c";
                    if (d.cup == 4) return "#8b0000";
                }
            })
            .attr("transform", "translate(15,57)");

    });

    var legend = d3.select("#legend");

    var initPosition = 350;
    legend.append("circle")
        .attr("cx", initPosition)
        .attr("cy", 10)
        .attr("r", 10)
        .style("fill", "#ff0000");
    legend.append("circle")
        .attr("cx", initPosition + 200)
        .attr("cy", 10)
        .attr("r", 10)
        .style("fill", "#dc143c");
    legend.append("circle")
        .attr("cx", initPosition + 400)
        .attr("cy", 10)
        .attr("r", 10)
        .style("fill", "#cd5c5c");
    legend.append("circle")
        .attr("cx", initPosition + 600)
        .attr("cy", 10)
        .attr("r", 10)
        .style("fill", "#8b0000");

    legend.append("text").attr("x", initPosition + 15).attr("y", 12).text("Premier League").attr("alignment-baseline", "middle").attr("class", "message_text_small");
    legend.append("text").attr("x", initPosition + 215).attr("y", 12).text("League Cup").attr("alignment-baseline", "middle").attr("class", "message_text_small");
    legend.append("text").attr("x", initPosition + 415).attr("y", 12).text("FA Cup").attr("alignment-baseline", "middle").attr("class", "message_text_small");
    legend.append("text").attr("x", initPosition + 615).attr("y", 12).text("Community Shields").attr("alignment-baseline", "middle").attr("class", "message_text_small");
}