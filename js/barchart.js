//Width and height
var margin = {top: 20, right: 20, bottom: 30, left: 40};           
var width = 600 - margin.left - margin.right;
var height= 500-margin.top -margin.bottom;
var w = width;
var h = height;

var dataset = [
    {"val":1,"key":"1"},
    {"val":2,"key":"2"},
    {"val":3,"key":"3"},
    {"val":4,"key":"4"},
    {"val":5,"key":"5"}
];

var xScale = d3.scale.ordinal()
    .domain(dataset.map(function (d) {return d.key; }))
    .rangeRoundBands([margin.left, width], 0.05);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {return d.val; })])
    .range([h,0]);


//Create SVG element
var svg = d3.select("#barchart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

//Create bars
svg.selectAll("rect")
    .data(dataset)
.enter().append("rect")
    .attr("x", function(d, i) {
        return xScale(d.key);
    })
    .attr("y", function(d) {
        return yScale(d.val);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function(d) {
        return h - yScale(d.val);
    })
    .attr("fill", function(d) {
        return "rgb(0, 0, " + (d.val * 10) + ")";
    });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + 0 + ")")
    .call(xAxis);

            