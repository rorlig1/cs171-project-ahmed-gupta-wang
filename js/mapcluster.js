//tile of the map....
	var restaurantIcon = L.icon({
    iconUrl: 'icon/restaurantmarker13.png',
    iconSize: [45, 45],
    opacity:0.6,
    popupAnchor:  [ 0, -13]
    /*iconAnchor: [22, 94] */
    });
    var restaurantIcon2 = L.icon({
    iconUrl: 'icon/restaurantmarker11.png',

    iconSize: [45, 45],
    opacity:0.3,
    popupAnchor:  [ 0, -23]
    /*iconAnchor: [22, 94] */
    });
     var restaurantIcon3 = L.icon({
    iconUrl: 'icon/restaurantmarker7.png',

    iconSize: [45, 45],
    opacity:0.3,
    popupAnchor:  [ 0, -23]
    /*iconAnchor: [22, 94] */
    });

var tiles = L.tileLayer('https://a.tiles.mapbox.com/v3/vieriw.i3f0efm1/{z}/{x}/{y}.png', {
			maxZoom: 16,
		//	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}),

		latlng = L.latLng( 33.532887216626245,  -112.1050537109375);

	//main map object
	var map = L.map('map', {center: latlng, zoom: 10, layers: [tiles]});

	map.on("zoomend", zoomend);


	var pins = [];

	var restaurantData;

	var rowToExpand;

	var geojson;

	var markerGroup = []

	var neighborhoodClusters;
	var selectedRestaurant, selectedMarker;
	var previousSelectedMarker;
	//customIcon for the map
	// var custIcon = L.divIcon({
	//             // specify a class name that we can refer to in styles, as we
	//             // do above.
	//             className: 'count-icon',
	//             // html here defines what goes in the div created for each marker
	//             html: "40",
	//             // and the marker width and height
	//             iconSize: [20, 20]
 //      		})


	function createClusters () {
		 geojson = L.geoJson(neighborhoodClusters, {
			 pointToLayer: function (feature, latlng) {
			 	console.log(latlng);
         		return L.marker(latlng).bindLabel( feature.properties.name, { noHide: true });
    		},
                 style: function (feature ) {
			 return{ 
			 radius: 1,
            /* fillColor: "#F7FCB9",*/
             fillColor:"#FFFFE5",
             color: "#FFFFFF",
             weight: 1,
             opacity: 0.8,
             fillOpacity: 0.45
             }
         	 
    		},
			onEachFeature: function (feature, layer) {
				// console.log('clicked');
				// var popupText = 'county:  ' + feature.properties.name;
				// layer.bindPopup(popupText);
			}
		})

		map.addLayer(geojson);

		addMarkerLabels(neighborhoodClusters);




		// body...
	}

	function addMarkerLabels(clusters){
		_.each(clusters.features, function(row){
			console.log(row.properties.count)
			var markerLabel;
			// if (row.properties.count==undefined){
			// 	markerLabel = 0;
			// } else {
			// 	markerLabel = row.properties.count;
			// }
			// custIcon.html = row.properties.count!==undefined? row.properties.count: 0;

			if (row.properties.count!=undefined){

				markerLabel = row.properties.count;

				console.log(row.properties.name + " lat:"  + row.g.location.lat + " lng:" + row.g.location.lng);
				var latlng = new L.LatLng(row.g.centroid[1],  row.g.centroid[0]);

				var icon  = L.divIcon({
		            // specify a class name that we can refer to in styles, as we
		            // do above.
		            className: 'count-icon',
		            // html here defines what goes in the div created for each marker
		            html: "" + markerLabel,
		            // and the marker width and height
		            iconSize: [30, 30],

		            popupAnchor:  [ 0, -10]
	        	}) 
                
                var icon2  = L.divIcon({
		            // specify a class name that we can refer to in styles, as we
		            // do above.
		            className: 'count-icon2',
		            // html here defines what goes in the div created for each marker
		            html: "" + markerLabel,
		            // and the marker width and height
		               iconSize: [30, 30]
		         }) 

	        	var marker = new MyCustomMarker(latlng, {icon: icon},{className: 'mouseover-popup'})
	        						.on("click", function(e) {
	        							rowToExpand = row;
	        							clusterClick(e);
	        						})
                                    .on("mouseover",function(e) {
	        						 this.setIcon(icon2)
	        						})
	        						.on("mouseout",function(e) {
	        						 this.setIcon(icon)
	        						})

	        	marker.bindPopup("<p> " + row.properties.name + " </p> " , {
	        		showOnMouseOver: true
	        	} );

	        						// .on("mouseover",clusterMouseOver)
	        						// .on("mouseout", clusterMouseOut)

				pins.push(marker);

			}

		})

		showPins();
		// map.on('click', mapClick);

	}

	/*
	* handles individual cluster click...
	*/

	function clusterClick(e){
		console.log("marker clicked");
		console.log(rowToExpand);

		clearMarkers();
		clearPins();
		//clearGeoJson();

		var restaurantsInNeighborhood = _.filter(restaurantData, function(data){
			return data.neighborhood == rowToExpand.properties.name;
		})

		console.log(restaurantsInNeighborhood.lengt);

		markerGroup = [];

		//add the markers now ... 
		_.each(restaurantsInNeighborhood, function(restaurant){
			console.log("lat: " + restaurant.latitude + " long: " + restaurant.longitude);
			console.log(restaurant);
			var latLng = new L.LatLng(restaurant.latitude,  restaurant.longitude);
			var popupText = '<b>' + restaurant.name + '</b><br>'
							+ '<b>' + restaurant.name + '</b><br>'
							+ '<b>' + restaurant.name + '</b><br>';
			var that = this;
			var marker = new L.Marker(new L.LatLng(restaurant.latitude,  restaurant.longitude),
									 {icon: restaurantIcon})
								.on("click",  function(e){
									previousSelectedMarker = selectedMarker;
									selectedMarker = this;
									selectedRestaurant = restaurant;
									markerClicked(e, this);
									if (previousSelectedMarker!==undefined){
										previousSelectedMarker.setIcon(restaurantIcon);
									}
									
								}) 
	       						.on("mouseover",function(e){
	       							if (selectedRestaurant!==restaurant){
	       							  	this.setIcon(restaurantIcon2)
	       							} 
	       						})
	         					.on("mouseout", function(e){
	         						if (selectedRestaurant!==restaurant){
	       							  	this.setIcon(restaurantIcon);
	       							} 
	         					})

	        marker.bindPopup("<p> " + restaurant.name + " </p> ", {
	        		showOnMouseOver: true
	        	} );		
			markerGroup.push(marker);
			// marker.addTo(map)

		})

		_.each(markerGroup, function (marker) {
			console.log(marker);
			marker.addTo(map);
		})
		var group = new L.featureGroup(markerGroup);

		map.fitBounds(group.getBounds());

		$("#chart").empty();

		draw_clusters(restaurantsInNeighborhood);
		// console.log(row)
		//remove all the geojson layers and markers and add the markers for this layer...
	}


	function clusterMouseOver (e) {
		// body...
		console.log('clusterMouseOver');
	}

	function clusterMouseOut(e){


		console.log('clusterMouseOut');

	}

	function showMarkers (rowToExpand) {

	}

    var clicked;
    var lastclicked;
	function markerClicked (e, self) {
		// body...
	 
		clicked=e._leaflet_id;
        self.setIcon(restaurantIcon3)
        update_restaurant_cluster(selectedRestaurant);
		console.log('markerMouseClicked');


	}

	function markerMouseOver (e) {
		this.setIcon(restaurantIcon2)
		console.log('markerMouseOver');
		// highlight_restaurant();

	}

	function markerMouseOut(e){
		console.log(e)
		//if (e._leaflet_id!=clicked){
		this.setIcon(restaurantIcon)

		//}
        
		console.log('markerMouseOut');
	}


	function zoomend(event){
		console.log(event.target._zoom);
		var zoom = event.target._zoom;

		if (zoom<=10) {
			clearMarkers();
			showGeoJSON();
			showPins();
			$("#chart").empty();
			$("#heatmap").empty();

		}
	}

	function showGeoJSON(){
		map.addLayer(geojson);
	}

	function showPins () {
		// console.log(pins);
		_.each(pins, function(pin){
			pin.addTo(map);
		})	
	}

	function clearGeoJson(){
		map.removeLayer(geojson)	
	}

	function clearPins () {
		_.each(pins, function  (pin) {
			map.removeLayer(pin);
		})	
	}


	function clearMarkers(){
		_.each(markerGroup, function  (marker) {
			map.removeLayer(marker);
		})	
	}

	//set the minimum zoom.... 
	map._layersMinZoom = 10

	//load the clusters... 
	d3.json('data_with_open/phoenix_geo.json', function(err, clusters){
		//load the other data...
		d3.json('data_with_open/output_phoenix_all.json', function (error, data) {
			restaurantData = data;
			neighborhoodClusters = clusters;
			createClusters();
			// console.log(data);

		})

	})

		// 	 pointToLayer: function (feature, latlng) {
		// 	 	console.log(latlng);
  //        		return L.marker(latlng).bindLabel( feature.properties.name, { noHide: true });
  //   		},

		// 	onEachFeature: function (feature, layer) {
		// 		console.log('clicked');
		// 		var popupText = 'county:  ' + feature.properties.name;
		// 		layer.bindPopup(popupText);
		// 	},


		// })


		// map.addLayer(geojson)

		// .on("click", function(feature){ console.log('clicked' + feature.properties.cartodb_id)})
		// var pins = []
		// _.each(geojsonSample.features, function(row){
		// 	console.log(row.properties.count)
		// 	var markerLabel;
		// 	if (row.properties.count==undefined){
		// 		markerLabel = 0;
		// 	} else {
		// 		markerLabel = row.properties.count;
		// 	}
		// 	custIcon.html = row.properties.count!==undefined? row.properties.count: 0;
		// 	console.log(row.properties.name + " lat:"  + row.g.location.lat + " lng:" + row.g.location.lng);
		// 	var latlng = new L.LatLng(row.g.centroid[1],  row.g.centroid[0]);
		// 	var icon  = L.divIcon({
	 //            // specify a class name that we can refer to in styles, as we
	 //            // do above.
	 //            className: 'count-icon',
	 //            // html here defines what goes in the div created for each marker
	 //            html: "" + markerLabel,
	 //            // and the marker width and height
	 //            iconSize: [40, 40]
  //       	})

		// 	new L.Marker(latlng, {icon: icon}).addTo(map);
		// })

		//set the max and minimum zoom levels 
		// map._layersMaxZoom=17
		map._layersMinZoom = 10

		//load the clusters... 
		d3.json('data_with_open/phoenix_geo.json', function(err, clusters){
			//load the other stuff...
			d3.json('data_with_open/output_phoenix_all.json', function (error, data) {
				restaurantData = data;
				neighborhoodClusters = clusters;
				createClusters();
				// console.log(data);

			})

		})


