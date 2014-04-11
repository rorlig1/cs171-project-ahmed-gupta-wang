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

	var width = 300,
		height = 250;

	var force1 = d3.layout.force()
		.nodes(data1)
		.size([width, height])
		.gravity(.02)
		.charge(-1)
		.linkDistance(40)
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
		.gravity(.03)
		.charge(-10)
		.linkDistance(40)
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



	function tick(e) {
		node1
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


// plot tiles
var tiles = (function() {
	var tiles = {};

	var width = 418;
	var height = 155;
	var axisHeight = 15;
	var axisWidth = 20;
	var tilesSVG = d3.select('svg.tiles')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + axisWidth + ',' + axisHeight + ')');

	var gap = 1;
	var tileWidth = (width - axisWidth) / 24 - gap;
	var tileHeight = (height - axisHeight) / 14 - gap;

	// initial plot
	tilesSVG.selectAll('.tile')
		.data(data)
		.enter().append('rect')
		.attr('class', 'tile')
		.attr('width', tileWidth)
		.attr('height', tileHeight)
		.attr('rx', 3)
		.attr('ry', 1)
		.attr('x', function(d) {
			return d.time.match(/ \d+/)[0] * (tileWidth + gap);
		})
		.attr('y', function(d) {
			return (d.time.match(/\/\d+\//)[0].substr(1, 2) - 17) * (tileHeight + gap);
		});

	// draw axes
	(function() {
		// x axis
		var xAxis = d3.select('svg.tiles')
			.append('g')
			.attr('class', 'legend axis')
			.attr('transform', 'translate(' + axisWidth + ',' + (axisHeight - 3) + ')');
		var xData = [];
		for (var i = 0; i < 24; i++) {
			xData.push(i);
		}
		xAxis.selectAll('text.legend-element.axis-scale')
			.data(xData)
			.enter().append('text')
			.attr('class', 'legend-element axis-scale')
			.attr('x', function(d, i) {
				return (tileWidth + gap) * i;
			})
			.attr('y', 0)
			.text(function(d) {
				if (d % 3 === 0) {
					return d + ':00';
				}
				return '';
			});

		// y axis
		var yAxis = d3.select('svg.tiles')
			.append('g')
			.attr('class', 'legend axis')
			.attr('transform', 'translate(0,' + axisHeight + ')');
		var yData = [];
		for (var i = 17; i <= 30; i++) {
			yData.push(i);
		}
		yAxis.selectAll('text.legend-element.axis-scale')
			.data(yData)
			.enter().append('text')
			.attr('class', 'legend-element axis-scale')
			.attr('x', axisWidth - 3)
			.attr('y', function(d, i) {
				return (tileHeight + gap) * i + tileHeight / 2;
			})
			.attr('dy', '.375em')
			.attr('text-anchor', 'end')
			.text(function(d) {
				if (d % 3 === 2) {
					return d;
				}
				return '';
			});
		yAxis.append('text')
			.attr('class', 'legend-element axis-scale')
			.attr('x', axisWidth - 3)
			.attr('y', -3)
			.attr('text-anchor', 'end')
			.text('Oct')
	})();

	tiles.plot = function(opt) {
		switch (opt.scope) {
			case 'all':
				var entries = data.overall.byTime;
				break;
			case 'station':
				var len = data.byStation.length;
				for (var i = 0; i < len; i++) {
					var found = false;
					if (data.byStation[i].key == opt.id) {
						var entries = data.byStation[i].values;
						found = true;
						break;
					}
				}
				if (!found) {
					console.error('wrong id passed to tiles.plot: ' + opt.id);
				}
				break;
		}

		tilesSVG.selectAll('.tile')
			.data(entries)
			.transition()
			.style('fill', function(d) {
				if (opt.pollutant === 'all') {
					return scaledColor(d.value, 'all');
				} else {
					return scaledColor(d[opt.pollutant], opt.pollutant);
				}
			});
	};

	return tiles;
})();