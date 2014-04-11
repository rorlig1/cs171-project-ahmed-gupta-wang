/*
 * shows the tiles for checkin data...
 */


var data;


var vis = function(values) {

	var colors = {
		tile_colors: colorbrewer.Blues[9]
	};


	//cleaning data to be useable for tile layout..
	var data = (function() {
//		data.checkInByDay =
	})



}
d3.json('data/output_limit_30.json', function(err, values){
	console.log(values);

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