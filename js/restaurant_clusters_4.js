/**
 * Created by admin on 4/20/14.
 */
var top8 =  ["Mexican", "American (Traditional)", "Sandwiches", "Pizza", "Nightlife", "Bars","Italian", "American (New)"];

  


function draw_clusters (data) {

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
	var width = 860, height = 680;
//	var fill = d3.scale.ordinal().range(['#827d92','#827354','#523536','#72856a','#2a3285','#383435'])
  //  var fill = d3.scale.ordinal().range(['#F7FCB9','#D9F0A3','#238443'])
    var fill = d3.scale.ordinal().range(['#f1f8a0','#D9F0A3','#238443'])


     var div = d3.select("#chart").append("div")   
    .attr("class", "tooltipR")               
    .style("opacity", 0.0);

    
	var svg = d3.select("#chart").append("svg")

		.attr("width", width)
		.attr("height", height);

	_.each(data, function (elem) {
//		console.log(elem);
		elem.radius = +elem.stars * 4.6;
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
		.style("fill", function (d) { return fill( d.open);})
		// .style("fill", function (d) { return fill(d.open); })
		// .on("mouseover", function (d) { showPopover.call(this, d); })
		// .on("mouseout", function (d) { removePopovers(); })	
		 .on("mouseover", function(d) {    
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            // div .html(formatTime(d.date) + "<br/>"  + d.close)  
             div.html(d.name)
                .style("left", (d3.event.pageX ) + "px")     
                .style("top",  (d3.event.pageY  ) + "px"); 
         
           })
           .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);  
             //   node
             // .style("fill","grey")
             
         })	
		.on("click", function(d) {clickPopover.call(this,d)})

	var force = d3.layout.force()
		.charge(0)
		.gravity(0)
		.size([width, height])

	draw('price');

	$(".btn-group > .btn").click(function(){
	    $(".btn-group > .btn").removeClass("active");
	    $(this.id).addClass("active");
	    draw(this.id);
	});

	// $( ".btn" ).click(function() {
		
	// });

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
};



function update_restaurant_cluster(restaurant){
	console.log("update_restaurant");
	console.log(restaurant);
	$("#heatmap").empty();
	draw_heatmap(restaurant);
}