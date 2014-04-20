/*
 * script to show the restaurant clusters ...
 */


var data;


var vis = function(values) {

	var colors = {
		tile_colors: colorbrewer.Blues[9]
	};


    var data1 = _.filter(values, function(value) { return value.attributes['Price Range']==1})
	var data2 = _.filter(values, function(value) { return value.attributes['Price Range']==2})
	var data3 = _.filter(values, function(value) { return value.attributes['Price Range']==3})
	var data4 = _.filter(values, function(value) { return value.attributes['Price Range']==4})


	console.log(data1);
	console.log(data2);
	console.log(data3);
	console.log(data4);

	var color = d3.scale.category10()
				.domain([1,4]);

	var width = 150,
		height = 125;

	var force1 = d3.layout.force()
		.nodes(data1)
		.size([width, height])
		.gravity(.02)
		.charge(-1)
		.linkDistance(0)
		.on("tick", tick)
		.start();

	var svg1 = d3.select("#svg1").append("svg")
		.attr("width", width)
		.attr("height", height);

	var node1 = svg1.selectAll("circle")
		.data(data1)
		.enter().append("circle")
		.style("fill", function(d) { return color(d.attributes["Price Range"]); })
		.call(force1.drag);


	var force3 = d3.layout.force()
		.nodes(data3)
		.size([width, height])
		.gravity(.02)
		.charge(-10)
		.linkDistance(40)
		.on("tick", tick)
		.start();

	var svg3 = d3.select("#svg3").append("svg")
		.attr("width", width)
		.attr("height", height);

	var node3 = svg3.selectAll("circle")
		.data(data3)
		.enter().append("circle")
		.style("fill", function(d) { return color(d.attributes["Price Range"]); })
		.call(force3.drag);


	var force2 = d3.layout.force()
		.nodes(data2)
		.size([width, height])
		.gravity(0)
		.charge(0)
		// .linkDistance(40)
		.on("tick", tick)
		.start();

	var svg2 = d3.select("#svg2").append("svg")
		.attr("width", width)
		.attr("height", height);

	var node2 = svg2.selectAll("circle")
		.data(data2)
		.enter().append("circle")
		.style("fill", function(d) { return color(d.attributes["Price Range"]); })
		.call(force2.drag);





	var force4 = d3.layout.force()
		.nodes(data4)
		.size([width, height])
		.gravity(.02)
		.charge(-10)
		.linkDistance(40)
		.on("tick", tick)
		.start();

	var svg4 = d3.select("#svg4").append("svg")
		.attr("width", width)
		.attr("height", height);

	var node4 = svg4.selectAll("circle")
		.data(data4)
		.enter().append("circle")
		.style("fill", function(d) { return color(d.attributes["Price Range"]); })
		.call(force4.drag);



	function tick(e) {
		node1
		.each(collide(0.1))
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r",function(d) { return d.review_count;});

		node2
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r",function(d) { return d.review_count;});

		node3
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r",function(d) { return d.review_count;});

		node4
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r",function(d) { return d.review_count;});
	}

//	function tick(e) {
//		node2
//			.attr("cx", function(d) { return d.x; })
//			.attr("cy", function(d) { return d.y; })
//			.attr("r",function(d) { return d.review_count;});
//	}




}
d3.json('data/output_limit_30.json', function(err, values){
	console.log(values[0].attributes['Price Range']);

	d3.select('#loading')
		.transition()
		.duration(1000)
		.style('opacity',0)
		.remove()

	vis(values);


	// initial plot
//	tilesSVG.selectAll('.tile')
//		.data(data.checkin)
//		.enter().append('rect')
//		.attr('class', 'tile')
//		.attr('width', tileWidth)
//		.attr('height', tileHeight)
//		.attr('rx', 3)
//		.attr('ry', 1)
//		.attr('x', function(d) {
//			return d.time.match(/ \d+/)[0] * (tileWidth + gap);
//		})
//		.attr('y', function(d) {
//			return (d.time.match(/\/\d+\//)[0].substr(1, 2) - 17) * (tileHeight + gap);
//		});

})


