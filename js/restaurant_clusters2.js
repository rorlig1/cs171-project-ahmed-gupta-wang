/**
 * Created by admin on 4/20/14.
 */
var top8 =  ["Mexican", "American (Traditional)", "Sandwiches", "Pizza", "Nightlife", "Bars","Italian", "American (New)"];
d3.json('data_with_open/output_phoenix_30.json', function (error, data) {

	console.log(data);
	_.each(data, function(elem){
		elem.price = elem.attributes['Price Range'];
		_.each(elem.categories, function(category){
			// console.log(category);
			if (category!="Restaurants" && category!=undefined && _.contains(top8,category) && elem.category==undefined) {
				elem.category = category;
			}

		})
		if (elem.category==undefined) elem.category="Unknown"
	})
	console.log(_.unique(_.pluck(data, "category")).length);
	console.log(data);
	var width = 600, height = 600;
//	var fill = d3.scale.ordinal().range(['#827d92','#827354','#523536','#72856a','#2a3285','#383435'])
	var fill = d3.scale.category20()

	var svg = d3.select("#chart").append("svg")
		.attr("width", width)
		.attr("height", height);

	_.each(data, function (elem) {
//		console.log(elem);
		elem.radius = +elem.stars * 4;
		elem.x = _.random(0, width);
		elem.y = _.random(0, height);
	})

	var padding = 2;
	var maxRadius = d3.max(_.pluck(data, 'radius'));

	function getCenters(vname, w, h) {
//		if (vname=="price") {
//			console.log('getting centers for price' );
////			console.log(JSON.stringify(data));
//			var v = _.uniq(_.pluck(_.pluck(data, "attributes"), "Price Range"));
//		} else {
			console.log('getting centers for other stuff' );

			var v = _.uniq(_.pluck(data, vname));
		console.log(v);
//		}
		c =[];
		_.each(v, function (k, i) {
//			console.log(k);
			c.push({name: k, value: 1}); });
		console.log(c);
		var l = d3.layout.treemap(c).size([w, h]).ratio(1/1);

//		console.log(l.nodes({children: c})[0].children)
		return _.object(v,l.nodes({children: c})[0].children);
	}

	var nodes = svg.selectAll("circle")
		.data(data);

	nodes.enter().append("circle")
		.attr("class", "node")
		.attr("cx", function (d) { return d.x; })
		.attr("cy", function (d) { return d.y; })
		.attr("r", function (d) { return d.radius; })
		.style("fill", function (d) { return fill(d.category); })
		.style("fill", function (d) { return fill(d.category); })
		.on("mouseover", function (d) { showPopover.call(this, d); })
		.on("mouseout", function (d) { removePopovers(); })
		.on("click", function(d) {clickPopover.call(this,d)})

	var force = d3.layout.force()
		.charge(0)
		.gravity(0)
		.size([width, height])

	draw('price');

	$( ".btn" ).click(function() {
		draw(this.id);
	});

	function draw (varname) {
		console.log(varname);
		var foci = getCenters(varname, width-100, height-100);
		console.log(foci);
		force.on("tick", tick(foci, varname, .55));
		labels(foci)
		force.start();
	}

	function tick (foci, varname, k) {
		console.log(varname);
		return function (e) {
			data.forEach(function (o, i) {
				var f = foci[o[varname]];
				o.y += ((f.y + (f.dy / 2)) - o.y) * k * e.alpha;
				o.x += ((f.x + (f.dx / 2)) - o.x) * k * e.alpha;
			});
			nodes
				.each(collide(.1))
				.attr("cx", function (d) { return d.x; })
				.attr("cy", function (d) { return d.y; });
		}
	}

	function labels (foci) {
		svg.selectAll(".label").remove();

		svg.selectAll(".label")
			.data(_.toArray(foci)).enter().append("text")
			.attr("class", "label")
			.text(function (d) { return d.name })
			.attr("transform", function (d) {
				return "translate(" + (d.x + (d.dx / 2)) + ", " + (d.y + 20) + ")";
			});
	}

	function removePopovers () {
		$('.popover').each(function() {
			$(this).remove();
		});
	}

	function showPopover (d) {
		$(this).popover({
			placement: 'auto top',
			container: 'body',
			trigger: 'manual',
			html : true,
			content: function() {
				return "Name: " + d.name + "<br/>Address: " + d.full_address +
//					"<br/>Ratings : " + d.stars + "<br/>Review Count: " + d.review_count;
				 "<br/>Category : " + d.category;}
		});
		$(this).popover('show')
	}

	function clickPopover (d) {
		updateHeatmap(d);
	}

	function updateHeatmap(d) {

	}

	function collide(alpha) {
		var quadtree = d3.geom.quadtree(data);
		return function (d) {
			var r = d.radius + maxRadius + padding,
				nx1 = d.x - r,
				nx2 = d.x + r,
				ny1 = d.y - r,
				ny2 = d.y + r;
			quadtree.visit(function(quad, x1, y1, x2, y2) {
				if (quad.point && (quad.point !== d)) {
					var x = d.x - quad.point.x,
						y = d.y - quad.point.y,
						l = Math.sqrt(x * x + y * y),
						r = d.radius + quad.point.radius + padding;
					if (l < r) {
						l = (l - r) / l * alpha;
						d.x -= x *= l;
						d.y -= y *= l;
						quad.point.x += x;
						quad.point.y += y;
					}
				}
				return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
			});
		};
	}
});