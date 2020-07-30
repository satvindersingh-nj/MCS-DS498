async function visualization_1(margin, width, height) {
    console.log("visual-1");
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

    await d3.csv("https://satvindersingh-nj.github.io/MCS-DS498/data/data2.csv", function (error, data) {
    //await d3.csv("http://localhost/data/data2.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.year = d.year;
            d.winner = +d.winner;
            d.cup = +d.cup;
            d.league = d.desc;
            d.points = +d.points;
            d.GF = d.GF;
            d.GA = d.GA;
            d.pos = +d.pos;
            d.manager = d.manager;
            d.country = d.country;
        });

        // Define the domain
        x.domain(data.map(function (d) { return d.year; }));
        y.domain([22, -2]);

        // Add the X-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickValues([1969, 1972, 1975, 1978, 1981, 1984, 1987, 1990, 1993, 1996, 1999, 2002, 2005, 2008, 2011, 2014, 2017, 2019]))
            .selectAll("text")
            .style("font-size", 14);

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));

        var conn = svg.append("g")
            .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x(function (d) { return x(+d.year); })
                .y(height)
            )
            .attr("stroke", "black")
            .style("stroke-width", 2)
            .style("fill", "none")
            .transition().duration(3000).delay(500)
            .attr("d", d3.line()
                .x(function (d) { return x(+d.year); })
                .y(function (d) { return y(+d.pos); })
            )
            .attr("transform", "translate(12,0)");

        // Initialize the tooltip
        var tooltip = d3.select("#tooltip")
            .style("opacity", 0);

        var dot = svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("r", 6)
            .attr("cx", function (d) { return x(+d.year); })
            .attr("cy", height)
            .style("fill", "#ffffff")
            .style("stroke", "#ff0000")
            .attr("transform", "translate(12,0)")
            .on("mouseover", function (d) {
                if (d.pos == 1) {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Premier League Champions" 
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA);
                }
                else if (d.pos > 1 && d.pos < 5)
                {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Champions League Qualifier"
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA);
                }
                else {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_small")
                        .html("<strong>Year: </strong>" + d.year
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA);
                }
            })
            .on("mouseout", function () { tooltip.style("opacity", 0); })
            .transition().duration(3000).delay(500)
            .attr("cy", function (d) { return y(+d.pos); })
            .style("fill", function (d) {
                if (d.pos == 1) return "#ff0000";
                if (d.pos > 1 && d.pos < 5) return "#8b0000";
                else return "#ffffff";
            });

        // Line to indicate team has automatically qualified for the Champions and Europa Leagues
        line(svg, 0, 118, 1300, 118, 0.4);
        line(svg, 0, 138, 1300, 138, 0.4);

        position_text(svg, 515, 115, "Automatic qualification for Champions League.");
        position_text(svg, 515, 135, "Automatic qualification for Europa League.");

    });
};

async function visualization_2(margin, width, height) {
    console.log("visual-2");
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

    await d3.csv("https://satvindersingh-nj.github.io/MCS-DS498/data/data2.csv", function (error, data) {
    //await d3.csv("http://localhost/data/data2.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.year = d.year;
            d.winner = +d.winner;
            d.cup = +d.cup;
            d.league = d.desc;
            d.points = +d.points;
            d.GF = d.GF;
            d.GA = d.GA;
            d.pos = +d.pos;
            d.manager = d.manager;
            d.country = d.country;
        });

        // Define the domain
        x.domain(data.map(function (d) { return d.year; }));
        y.domain([22, -2]);

        // Add the X-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickValues([1969, 1972, 1975, 1978, 1981, 1984, 1987, 1990, 1993, 1996, 1999, 2002, 2005, 2008, 2011, 2014, 2017, 2019]))
            .selectAll("text")
            .style("font-size", 14);

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));

        var conn = svg.append("g")
            .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x(function (d) { return x(+d.year); })
                .y(height)
            )
            .attr("stroke", "black")
            .style("stroke-width", 2)
            .style("fill", "none")
            .transition().duration(3000).delay(500)
            .attr("d", d3.line()
                .x(function (d) { if(+d.year < 1993 && +d.year !== 2020) return x(+d.year); })
                .y(function (d) { return y(+d.pos); })
            )
            .attr("transform", "translate(12,0)");

        // Initialize the tooltip
        var tooltip = d3.select("#tooltip")
            .style("opacity", 0);

        var dot = svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("r", 6)
            .attr("cx", function (d) { if (+d.year < 1993) return x(+d.year); })
            .attr("cy", height)
            .style("fill", "#ffffff")
            .style("stroke", "#ff0000")
            .attr("transform", "translate(12,0)")
            .on("mouseover", function (d) {
                if (d.pos == 1) {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Premier League Champions"
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                            + "<br/><strong>Manager: </strong>" + d.manager;
                }
                else if (d.pos > 1 && d.pos < 5) {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Champions League Qualifier"
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                            + "<br/><strong>Manager: </strong>" + d.manager;
                }
                else {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_small")
                        .html("<strong>Year: </strong>" + d.year
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                            + "<br/><strong>Manager: </strong>" + d.manager;
                }
            })
            .on("mouseout", function () { tooltip.style("opacity", 0); })
            .transition().duration(3000).delay(500)
            .attr("cy", function (d) { if (+d.year < 1993) return y(+d.pos); })
            .style("fill", function (d) {
                if (d.pos == 1) return "#ff0000";
                if (d.pos > 1 && d.pos < 5) return "#8b0000";
                else return "#ffffff";
            })
            .attr("transform", "translate(12,0)");

            // Line to indicate team has automatically qualified for the Champions and Europa Leagues
            line(svg, 0, 118, 1300, 118, 0.4);
            line(svg, 0, 138, 1300, 138, 0.4);

            // Vertical line to mark beginning of Alex Ferguson Era
            line(svg, x(1992), height, x(1992), 0);

            // Horizontal lines
            position_text(svg, 527, 115, "Automatic qualification for Champions League.");
            position_text(svg, 527, 135, "Automatic qualification for Europa League.");

            // Annotation using custom annot_line and position_text functions
            annot_line(svg, x(1992), 318, x(1996), 325);
            position_text(svg, x(1997), 330, "Sir Alex Ferguson takes over as Manager.");
    });

};

async function visualization_3(margin, width, height) {
    console.log("visual-2");
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

    await d3.csv("https://satvindersingh-nj.github.io/MCS-DS498/data/data2.csv", function (error, data) {
    //await d3.csv("http://localhost/data/data2.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.year = d.year;
            d.winner = +d.winner;
            d.cup = +d.cup;
            d.league = d.desc;
            d.points = +d.points;
            d.GF = d.GF;
            d.GA = d.GA;
            d.pos = +d.pos;
            d.manager = d.manager;
            d.country = d.country;
        });

        // Define the domain
        x.domain(data.map(function (d) { return d.year; }));
        y.domain([22, -2]);

        // Add the X-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickValues([1969, 1972, 1975, 1978, 1981, 1984, 1987, 1990, 1993, 1996, 1999, 2002, 2005, 2008, 2011, 2014, 2017, 2019]))
            .selectAll("text")
            .style("font-size", 14);

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));

        var conn = svg.append("g")
            .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x(function (d) { return x(+d.year); })
                .y(height)
            )
            .attr("stroke", "black")
            .style("stroke-width", 2)
            .style("fill", "none")
            .transition().duration(3000).delay(500)
            .attr("d", d3.line()
                .x(function (d) { if (+d.year < 2013 && +d.year !== 2020) return x(+d.year); })
                .y(function (d) { return y(+d.pos); })
            )
            .attr("transform", "translate(12,0)");

        // Initialize the tooltip
        var tooltip = d3.select("#tooltip")
            .style("opacity", 0);

        var dot = svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("r", 6)
            .attr("cx", function (d) { if (+d.year < 2013) return x(+d.year); })
            .attr("cy", height)
            .style("fill", "#ffffff")
            .style("stroke", "#ff0000")
            .attr("transform", "translate(12,0)")
            .on("mouseover", function (d) {
                if (d.pos == 1) {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Premier League Champions"
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                        + "<br/><strong>Manager: </strong>" + d.manager;
                }
                else if (d.pos > 1 && d.pos < 5) {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Champions League Qualifier"
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                        + "<br/><strong>Manager: </strong>" + d.manager;
                }
                else {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_small")
                        .html("<strong>Year: </strong>" + d.year
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                        + "<br/><strong>Manager: </strong>" + d.manager;
                }
            })
            .on("mouseout", function () { tooltip.style("opacity", 0); })
            .transition().duration(3000).delay(500)
            .attr("cy", function (d) { if (+d.year < 2013) return y(+d.pos); })
            .style("fill", function (d) {
                if (d.pos == 1) return "#ff0000";
                if (d.pos > 1 && d.pos < 5) return "#8b0000";
                else return "#ffffff";
            })
            .attr("transform", "translate(12,0)");

        // Line to indicate team has automatically qualified for the Champions and Europa Leagues
        line(svg, 0, 118, 1300, 118, 0.4);
        line(svg, 0, 138, 1300, 138, 0.4);

        // Vertical line to mark beginning of Alex Ferguson Era
        line(svg, x(1992), height, x(1992), 0);
        // Vertical line to mark end of Alex Ferguson Era
        line(svg, x(2012), height, x(2012), 0);

        // Horizontal lines
        position_text(svg, 527, 115, "Automatic qualification for Champions League.");
        position_text(svg, 527, 135, "Automatic qualification for Europa League.");

        // Annotation using custom annot_line and position_text functions
        annot_line(svg, x(1992), 318, x(1994), 311);
        position_text(svg, x(1995), 310, "Sir Alex Ferguson takes over as Manager");

        annot_line(svg, x(2012), 325, x(2010), 347);
        position_text(svg, x(2002), 352, "Sir Alex Ferguson resigns as Manager");

    });

};

async function visualization_4(margin, width, height) {
    console.log("visual-2");
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

    await d3.csv("https://satvindersingh-nj.github.io/MCS-DS498/data/data2.csv", function (error, data) {
    //await d3.csv("http://localhost/data/data2.csv", function (error, data) {

        if (error) throw error;

        data.forEach(function (d) {
            d.year = d.year;
            d.winner = +d.winner;
            d.cup = +d.cup;
            d.league = d.desc;
            d.points = +d.points;
            d.GF = d.GF;
            d.GA = d.GA;
            d.pos = +d.pos;
            d.manager = d.manager;
            d.country = d.country;
        });

        // Define the domain
        x.domain(data.map(function (d) { return d.year; }));
        y.domain([22, -2]);

        // Add the X-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)
                .tickValues([1969, 1972, 1975, 1978, 1981, 1984, 1987, 1990, 1993, 1996, 1999, 2002, 2005, 2008, 2011, 2014, 2017, 2019]))
            .selectAll("text")
            .style("font-size", 14);

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));

        var conn = svg.append("g")
            .append("path")
            .datum(data)
            .attr("d", d3.line()
                .x(function (d) { return x(+d.year); })
                .y(height)
            )
            .attr("stroke", "black")
            .style("stroke-width", 2)
            .style("fill", "none")
            .transition().duration(3000).delay(500)
            .attr("d", d3.line()
                .x(function (d) { if (+d.year < 2020) return x(+d.year); })
                .y(function (d) { return y(+d.pos); })
            )
            .attr("transform", "translate(12,0)");

        // Initialize the tooltip
        var tooltip = d3.select("#tooltip")
            .style("opacity", 0);

        var dot = svg.selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("r", 6)
            .attr("cx", function (d) { if (+d.year < 2020) return x(+d.year); })
            .attr("cy", height)
            .style("fill", "#ffffff")
            .style("stroke", "#ff0000")
            .attr("transform", "translate(12,0)")
            .on("mouseover", function (d) {
                if (d.pos == 1) {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Premier League Champions"
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                        + "<br/><strong>Manager: </strong>" + d.manager;
                }
                else if (d.pos > 1 && d.pos < 5) {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_large")
                        .html("<strong>Year: </strong>" + d.year
                            + "<br/><font size='-1'><strong>Champions League Qualifier"
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                        + "<br/><strong>Manager: </strong>" + d.manager;
                }
                else {
                    tooltip.style("opacity", 1)
                        .style("left", (d3.event.pageX - 256) + "px")
                        .style("top", (d3.event.pageY - 210) + "px")
                        .attr("class", "tooltip_small")
                        .html("<strong>Year: </strong>" + d.year
                            + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                            + "</strong></font><br/><strong>Points: </strong>" + d.points
                            + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA)
                        + "<br/><strong>Manager: </strong>" + d.manager;
                }
            })
            .on("mouseout", function () { tooltip.style("opacity", 0); })
            .transition().duration(3000).delay(500)
            .attr("cy", function (d) { if (+d.year < 2020) return y(+d.pos); })
            .style("fill", function (d) {
                if (d.pos == 1) return "#ff0000";
                if (d.pos > 1 && d.pos < 5) return "#8b0000";
                else return "#ffffff";
            })
            .attr("transform", "translate(12,0)");

        // Line to indicate team has automatically qualified for the Champions and Europa Leagues
        line(svg, 0, 118, 1300, 118, 0.4);
        line(svg, 0, 138, 1300, 138, 0.4);

        // Vertical line to mark beginning of Alex Ferguson Era
        line(svg, x(1992), height, x(1992), 0);
        // Vertical line to mark end of Alex Ferguson Era
        line(svg, x(2012), height, x(2012), 0);

        // Horizontal lines
        position_text(svg, 527, 115, "Automatic qualification for Champions League.");
        position_text(svg, 527, 135, "Automatic qualification for Europa League.");

        // Annotation using custom annot_line and position_text functions
        annot_line(svg, x(1992), 318, x(1994), 311);
        position_text(svg, x(1995), 310, "Sir Alex Ferguson takes over as Manager");

        annot_line(svg, x(2012), 325, x(2010), 347);
        position_text(svg, x(2002), 352, "Sir Alex Ferguson resigns as Manager");

    });

};

async function visualization_6(margin, width, height) {
    console.log("visual-1");
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
    await d3.csv("https://satvindersingh-nj.github.io/MCS-DS498/data/Data.csv", function (error, data) {
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

        // Define the domain
        x.domain(data.map(function (d) { return d.year; }));
        y.domain([0, 4]);

        // Add the X-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-12,30)rotate(-90)")
            .style("font-size", 14);

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
                    .style("left", (d3.event.pageX - 246) + "px")
                    .style("top", (d3.event.pageY - 160) + "px")
                    .html("<strong>Year: </strong>" + d.year + "<br/><font size='-1'><strong>" + d.desc + "</strong></font><br/><strong>Points: </strong>" + d.points + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA);
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

    //var legend = d3.select("#legend");

    //var initPosition = 350;
    //legend.append("circle")
    //    .attr("cx", initPosition)
    //    .attr("cy", 10)
    //    .attr("r", 10)
    //    .style("fill", "#ff0000");
    //legend.append("circle")
    //    .attr("cx", initPosition + 200)
    //    .attr("cy", 10)
    //    .attr("r", 10)
    //    .style("fill", "#dc143c");
    //legend.append("circle")
    //    .attr("cx", initPosition + 400)
    //    .attr("cy", 10)
    //    .attr("r", 10)
    //    .style("fill", "#cd5c5c");
    //legend.append("circle")
    //    .attr("cx", initPosition + 600)
    //    .attr("cy", 10)
    //    .attr("r", 10)
    //    .style("fill", "#8b0000");

    //legend.append("text").attr("x", initPosition + 15).attr("y", 12).text("Premier League").attr("alignment-baseline", "middle").attr("class", "message_text_small");
    //legend.append("text").attr("x", initPosition + 215).attr("y", 12).text("League Cup").attr("alignment-baseline", "middle").attr("class", "message_text_small");
    //legend.append("text").attr("x", initPosition + 415).attr("y", 12).text("FA Cup").attr("alignment-baseline", "middle").attr("class", "message_text_small");
    //legend.append("text").attr("x", initPosition + 615).attr("y", 12).text("Community Shields").attr("alignment-baseline", "middle").attr("class", "message_text_small");
};

function position_text(svg, x, y, text) {
    svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .transition().duration(3000).delay(800)
        .attr("class", "annot")
        .text(text);
}

function line(svg, x1, y1, x2, y2, stroke_width) {
    svg.append("g")
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("stroke", "white")
        .attr("transform", "translate(12,0)")
        .transition().duration(3000)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .style("stroke-width", stroke_width)
        .attr("stroke-dasharray", ("3,3"))
        .style("fill", "none")
        .attr("transform", "translate(12,0)");
}

function annot_line(svg, x1, y1, x2, y2) {
    svg.append("g")
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "white")
        .attr("transform", "translate(12,0)")
        .transition().duration(3000).delay(800)
        .attr("stroke", "black")
        .style("stroke-width", 0.7)
        .attr("transform", "translate(12,0)");;
}


