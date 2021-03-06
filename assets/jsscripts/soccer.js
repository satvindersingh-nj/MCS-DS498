﻿// Scene 1 - Preparing the Scene
async function visualization_1(margin, width, height, animation) {
    console.log("visual-1");
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var duration = (animation == true) ? 3000 : 0;;
    var delay = (animation == true) ? 500 : 0;

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
        svg.append("text")
            .attr("x", x(2016))
            .attr("y", y(21.5))
            .attr("opacity", "1")
            .style("font-weight", "bold")
            .attr("class", "annot")
            .style("font-size", 16)
            .text("Season");

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));
        svg.append("text")
            .attr("x", x(3))
            .attr("y", y(1))
            .attr("opacity", "1")
            .attr("class", "annot")
            .style("font-size", 16)
            .style("font-weight", "bold")
            .attr("transform", "translate(-35,60) rotate(-90)")
            .text("Position");

        build_legend(svg, x, y);
        DrawVisualization_1(svg, data, duration, delay, width, height, x, y);
    });
};
// Scene 1 - Initialization 
function DrawVisualization_1(svg, data, duration, delay, width, height, xDomain, yDomain) {

    svg.append("g")
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function (d) { return xDomain(+d.year); })
            .y(height)
        )
        .attr("stroke", "black")
        .style("stroke-width", 2)
        .style("fill", "none")
        .attr("transform", "translate(12,0)")
        .transition().duration(duration).delay(delay)
        .attr("d", d3.line()
            .x(function (d) { return xDomain(+d.year); })
            .y(function (d) { return yDomain(+d.pos); })
        )
        .attr("transform", "translate(12,0)");

    // Initialize the tooltip
    var tooltip = d3.select("#tooltip")
        .style("opacity", 0);

    svg.append("g")

        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("r", 6)
        .attr("cx", function (d) { return xDomain(+d.year); })
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
            else if (d.pos > 1 && d.pos < 5) {
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
            else if (d.pos == 5) {
                tooltip.style("opacity", 1)
                    .style("left", (d3.event.pageX - 256) + "px")
                    .style("top", (d3.event.pageY - 210) + "px")
                    .attr("class", "tooltip_large")
                    .html("<strong>Year: </strong>" + d.year
                        + "<br/><font size='-1'><strong>Europa League Qualifier"
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
        .transition().duration(duration).delay(delay)
        .attr("cy", function (d) { return yDomain(+d.pos); })
        .style("fill", function (d) {
            if (d.pos == 1) return "#ff0000";
            if (d.pos > 1 && d.pos < 5) return "#8b0000";
            if (d.pos == 5) return "#cd5c5c";
            else return "#ffffff";
        })
        .attr("transform", "translate(12,0)");

    // Line to indicate team has automatically qualified for the Champions and Europa Leagues
    line(svg, 0, 118, 1300, 118, 0.4, duration, delay);
    line(svg, 0, 138, 1300, 138, 0.4, duration, delay);

    position_text(svg, 600, 115, "Automatic qualification for Champions League.", duration, delay);
    position_text(svg, 600, 135, "Automatic qualification for Europa League.", duration, delay);
}

// Scene 2 - Preparing the Scene
async function visualization_2(margin, width, height, animation, s1, s2, s3, s4) {
    console.log("visual-2");

    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var duration = (animation == true) ? 3000 : 0;
    var delay = (animation == true) ? 500 : 0;

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
        svg.append("text")
            .attr("x", x(2016))
            .attr("y", y(21.5))
            .attr("opacity", "1")
            .style("font-weight", "bold")
            .attr("class", "annot")
            .style("font-size", 16)
            .text("Season");

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));
        svg.append("text")
            .attr("x", x(3))
            .attr("y", y(1))
            .attr("opacity", "1")
            .attr("class", "annot")
            .style("font-size", 16)
            .style("font-weight", "bold")
            .attr("transform", "translate(-35,60) rotate(-90)")
            .text("Position");

        build_legend(svg, x, y);
        DrawVisualization_2(svg, data, duration, delay, width, height, x, y, s1, s2);
    });
};
// Scene 2 - Initialization
function DrawVisualization_2(svg, data, duration, delay, width, height, xDomain, yDomain, startSeason, endSeason) {

    data = data.filter(function (d) { return (d.year <= endSeason); });

    // Line to indicate team has automatically qualified for the Champions and Europa Leagues
    line(svg, 0, 118, 1300, 118, 0.4, duration, delay);
    line(svg, 0, 138, 1300, 138, 0.4, duration, delay);

    // Vertical line to mark beginning of Alex Ferguson Era
    line(svg, xDomain(endSeason), height, xDomain(endSeason), 0, 0.7, duration, delay);

    line_plot(svg, data, duration, delay, height, xDomain, yDomain);   
    dot_plot(svg, data, duration, delay, height, xDomain, yDomain);

    // Horizontal lines
    // Horizontal lines
    position_text(svg, 600, 115, "Automatic qualification for Champions League.", duration, delay);
    position_text(svg, 600, 135, "Automatic qualification for Europa League.", duration, delay);

    // Annotation using custom annot_line and position_text functions
    annot_line(svg, xDomain(endSeason), yDomain(1) - 5, xDomain(endSeason-2), yDomain(-1), duration, delay);
    position_text(svg, xDomain(endSeason-8), yDomain(-1), "1986 - Sir Alex Ferguson", duration, delay);
    position_text(svg, xDomain(endSeason-8), yDomain(-1) + 15, "takes over as Manager", duration, delay);
}

// Scene 3 - Preparing the Scene
async function visualization_3(margin, width, height, animation, s1, s2, s3, s4) {
    console.log("visual-3");
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var duration = (animation == true) ? 3000 : 0;
    var delay = (animation == true) ? 500 : 0;

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
        svg.append("text")
            .attr("x", x(2016))
            .attr("y", y(21.5))
            .attr("opacity", "1")
            .style("font-weight", "bold")
            .attr("class", "annot")
            .style("font-size", 16)
            .text("Season");

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));
        svg.append("text")
            .attr("x", x(3))
            .attr("y", y(1))
            .attr("opacity", "1")
            .attr("class", "annot")
            .style("font-size", 16)
            .style("font-weight", "bold")
            .attr("transform", "translate(-35,60) rotate(-90)")
            .text("Position");

        build_legend(svg, x, y);
        DrawVisualization_2(svg, data, 0, 0, width, height, x, y, s1, s2)
        DrawVisualization_3(svg, data, duration, delay, width, height, x, y, s2, s3)
    });
}
// Scene 3 - Initialization
function DrawVisualization_3(svg, data, duration, delay, width, height, xDomain, yDomain, startSeason, endSeason) {
    // Filter the data for period between 1991 and 2013
    data = data.filter(function (d) { return ((d.year >= startSeason) && (d.year <= endSeason)); });

    // Line to indicate team has automatically qualified for the Champions and Europa Leagues
    line(svg, 0, 118, 1300, 118, 0.4, duration, delay);
    line(svg, 0, 138, 1300, 138, 0.4, duration, delay);

    // Vertical line to mark end of Alex Ferguson Era
    line(svg, xDomain(endSeason), height, xDomain(endSeason), 0, 0.7, duration, delay);

    line_plot(svg, data, duration, delay, height, xDomain, yDomain);

    dot_plot(svg, data, duration, delay, height, xDomain, yDomain);

    // Annotation using custom annot_line and position_text functions
    annot_line(svg, xDomain(endSeason), yDomain(1) - 5, xDomain(endSeason+2), yDomain(-1), duration, delay);
    position_text(svg, xDomain(endSeason+3), yDomain(-1), "2012 - Sir Alex Ferguson", duration, delay);
    position_text(svg, xDomain(endSeason+3), yDomain(-1) + 15, "resigns as Manager", duration, delay);
};

// Scene 4 - Preparing the Scene
async function visualization_4(margin, width, height, animation, s1, s2, s3, s4) {
    console.log("visual-4");
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var duration = (animation == true) ? 3000 : 0;
    var delay = (animation == true) ? 500 : 0;

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
        svg.append("text")
            .attr("x", x(2016))
            .attr("y", y(21.5))
            .attr("opacity", "1")
            .style("font-weight", "bold")
            .attr("class", "annot")
            .style("font-size", 16)
            .text("Season");

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));
        svg.append("text")
            .attr("x", x(3))
            .attr("y", y(1))
            .attr("opacity", "1")
            .attr("class", "annot")
            .style("font-size", 16)
            .style("font-weight", "bold")
            .attr("transform", "translate(-35,60) rotate(-90)")
            .text("Position");

        build_legend(svg, x, y);
        DrawVisualization_2(svg, data, 0, 0, width, height, x, y, s1, s2)
        DrawVisualization_3(svg, data, 0, 0, width, height, x, y, s2, s3)
        DrawVisualization_4(svg, data, duration, delay, width, height, x, y, s3, s4)
    });
};
// Scene 4 - Initialization
function DrawVisualization_4(svg, data, duration, delay, width, height, xDomain, yDomain, startSeason, endSeason) {
    data = data.filter(function (d) { return (d.year >= startSeason); });

    line_plot(svg, data, duration, delay, height, xDomain, yDomain);
    dot_plot(svg, data, duration, delay, height, xDomain, yDomain);
}

// Scene 5 - Preparing the Scene
async function visualization_5(margin, width, height, animation, s1, s2, s3, s4) {
    console.log("visual-5");
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var duration = (animation == true) ? 3000 : 0;
    var delay = (animation == true) ? 500 : 0;

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
        svg.append("text")
            .attr("x", x(2016))
            .attr("y", y(21.5))
            .attr("opacity", "1")
            .style("font-weight", "bold")
            .attr("class", "annot")
            .style("font-size", 16)
            .text("Season");

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y).tickValues([19, 17, 15, 13, 11, 9, 7, 5, 4, 3, 1]));
        svg.append("text")
            .attr("x", x(3))
            .attr("y", y(1))
            .attr("opacity", "1")
            .attr("class", "annot")
            .style("font-size", 16)
            .style("font-weight", "bold")
            .attr("transform", "translate(-35,60) rotate(-90)")
            .text("Position");

        svg.append("rect")
            .attr("x", x(s2))
            .attr("y", y(-2))
            .attr("width", x(s3) - x(s2))
            .attr("height", y(22))
            .attr("transform", "translate(12,0)")
            .style("fill", "#ff0000")
            .attr("opacity", "0.1");

        build_legend(svg, x, y);
        DrawVisualization_5(svg, data, duration, delay, width, height, x, y, s2, s3)

    });
};

// Scene 5 - Initialization
function DrawVisualization_5(svg, data, duration, delay, width, height, xDomain, yDomain, s2, s3) {

    // Vertical line to mark beginning of Alex Ferguson Era
    line(svg, xDomain(1986), height, xDomain(1986), 0, 0.7, duration, delay);
    line(svg, xDomain(2012), height, xDomain(2012), 0, 0.7, duration, delay);

    // Plot the lines and dots
    line_plot(svg, data, duration, delay, height, xDomain, yDomain);
    dot_plot(svg, data, duration, delay, height, xDomain, yDomain);

    // Line to indicate team has automatically qualified for the Champions and Europa Leagues
    line(svg, 0, 118, 1300, 118, 0.4, duration, delay);
    line(svg, 0, 138, 1300, 138, 0.4, duration, delay);

    // Horizontal lines
    position_text(svg, 600, 115, "Automatic qualification for Champions League.", 0, 300);
    position_text(svg, 600, 135, "Automatic qualification for Europa League.", 0, 300);

    // Annotation using custom annot_line and position_text functions
    annot_line(svg, xDomain(s2), yDomain(1)- 5, xDomain(s2-2), yDomain(-1), duration, delay);
    position_text(svg, xDomain(s2-8), yDomain(-1), "1986 - Sir Alex Ferguson", duration, delay);
    position_text(svg, xDomain(s2-8), yDomain(-1) + 15, "takes over as Manager", duration, delay);
    annot_line(svg, xDomain(s3), yDomain(1) - 5, xDomain(s3+2), yDomain(-1), duration, delay);
    position_text(svg, xDomain(s3+3), yDomain(-1), "2012 - Sir Alex Ferguson", duration, delay);
    position_text(svg, xDomain(s3+3), yDomain(-1) + 15, "resigns as Manager", duration, delay);

    // Conclusion
    position_text(svg, xDomain(s2 + 8), 310, "Sir Alex Ferguson was manager for Manchester United ", duration, delay + 300);
    position_text(svg, xDomain(s2 + 8), 325, "for 27 years (1986 - 2013) and during this tenure Manchester United", duration, delay + 300);
    position_text(svg, xDomain(s2 + 8), 340, "won 13 Premier League championships and have qualified", duration, delay + 300);
    position_text(svg, xDomain(s2 + 8), 355, "for the Champions League in 23 of the 27 seasons. ", duration, delay + 300);
    position_text(svg, xDomain(s2 + 8), 375, " --  The Golder Era -- ", duration, delay + 300, "annot_bold");
}

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

function position_text(svg, x, y, text, duration, delay, cssClass = "annot") {
    svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("opacity", "0")
        .transition().duration(duration).delay(delay)
        .attr("class", cssClass)
        .attr("opacity", "1")
        .text(text);
}

function line(svg, x1, y1, x2, y2, stroke_width, duration, delay) {

    svg.append("g")
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("stroke", "white")
        .attr("transform", "translate(12,0)")
        .transition().duration(duration)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .style("stroke-width", stroke_width)
        .attr("stroke-dasharray", ("3,3"))
        .style("fill", "none")
        .attr("transform", "translate(12,0)");
}

function annot_line(svg, x1, y1, x2, y2, duration, delay) {
    svg.append("g")
        .append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("stroke", "white")
        .attr("transform", "translate(12,0)")
        .transition().duration(duration).delay(delay)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", "black")
        .style("stroke-width", 0.7)
        .style("fill", "none")
        .attr("transform", "translate(12,0)");
}

function line_plot(svg, data, duration, delay, height, xDomain, yDomain) {
    svg.append("g")
        .append("path")
        .datum(data)
        .attr("d", d3.line()
            .x(function (d) { return xDomain(+d.year); })
            .y(height)
        )
        .attr("stroke", "black")
        .style("stroke-width", 2)
        .style("fill", "none")
        .attr("transform", "translate(12,0)")
        .transition().duration(duration).delay(delay)
        .attr("d", d3.line()
            .x(function (d) { return xDomain(+d.year); })
            .y(function (d) { return yDomain(+d.pos); })
        )
        .attr("transform", "translate(12,0)");
}

function dot_plot(svg, data, duration, delay, height, xDomain, yDomain) {

    console.log(data);
    // Initialize the tooltip
    var tooltip = d3.select("#tooltip")
        .style("opacity", 0);

    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("r", 6)
        .attr("cx", function (d) { return xDomain(+d.year); })
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
                        + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA
                        + "<br/><strong>Manager : </strong>" + d.manager + "(" + d.country + ")");
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
                        + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA
                        + "<br/><strong>Manager : </strong>" + d.manager + "(" + d.country + ")");
            }
            else if (d.pos == 5) {
                tooltip.style("opacity", 1)
                    .style("left", (d3.event.pageX - 256) + "px")
                    .style("top", (d3.event.pageY - 210) + "px")
                    .attr("class", "tooltip_large")
                    .html("<strong>Year: </strong>" + d.year
                        + "<br/><font size='-1'><strong>Europa League Qualifier"
                        + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                        + "</strong></font><br/><strong>Points: </strong>" + d.points
                        + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA
                        + "<br/><strong>Manager : </strong>" + d.manager + "(" + d.country + ")");
            }
            else {
                tooltip.style("opacity", 1)
                    .style("left", (d3.event.pageX - 256) + "px")
                    .style("top", (d3.event.pageY - 210) + "px")
                    .attr("class", "tooltip_small")
                    .html("<strong>Year: </strong>" + d.year
                        + "</strong></font><br/><strong>League Position: </strong>" + d.pos
                        + "</strong></font><br/><strong>Points: </strong>" + d.points
                        + "<br/><strong>Goals (GF - GA): </strong>" + d.GF + " - " + d.GA
                        + "<br/><strong>Manager : </strong>" + d.manager + "(" + d.country + ")");
            }
        })
        .on("mouseout", function () { tooltip.style("opacity", 0); })
        .transition().duration(duration).delay(delay)
        .attr("cy", function (d) { return yDomain(+d.pos); })
        .style("fill", function (d) {
            if (d.pos == 1) return "#ff0000";
            if (d.pos > 1 && d.pos < 5) return "#8b0000";
            if (d.pos == 5) return "#cd5c5c";
            else return "#ffffff";
        })
        .attr("transform", "translate(12,0)");
}

function build_legend(svg, xDomain, yDomain) {

    svg.append("circle")
        .attr("cx", xDomain(1981))
        .attr("cy", yDomain(-3))
        .attr("r", 6)
        .style("fill", "#ff0000")
        .style("stroke", "#ff0000")
        .attr("transform", "translate(2, -4)");
    position_text(svg, xDomain(1981) + 15, yDomain(-3), "Premier League Champions", 0, 0);

    svg.append("circle")
        .attr("cx", xDomain(1990))
        .attr("cy", yDomain(-3))
        .attr("r", 6)
        .style("fill", "#8b0000")
        .style("stroke", "#ff0000")
        .attr("transform", "translate(2, -4)");
    position_text(svg, xDomain(1990) + 15, yDomain(-3), "Champions League Qualifier", 0, 0);

    svg.append("circle")
        .attr("cx", xDomain(1999))
        .attr("cy", yDomain(-3))
        .attr("r", 6)
        .style("fill", "#cd5c5c")
        .style("stroke", "#ff0000")
        .attr("transform", "translate(2, -4)");
    position_text(svg, xDomain(1999) + 15, yDomain(-3), "Europa League Qualifier", 0, 0);

    svg.append("circle")
        .attr("cx", xDomain(2007))
        .attr("cy", yDomain(-3))
        .attr("r", 6)
        .style("fill", "#ffffff")
        .style("stroke", "#ff0000")
        .attr("transform", "translate(2, -4)");
    position_text(svg, xDomain(2007) + 15, yDomain(-3), "Did not qualify", 0, 0);
}