var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}),
			latlng = L.latLng( 33.443419, -112.092092);


		var map = L.map('map', {center: latlng, zoom: 11, layers: [tiles]});


		var markers = L.markerClusterGroup({spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true, disableClusteringAtZoom: 15, spiderfyDistanceMultiplier: 2, maxClusterRadius: 70})

		function populate(data) {
			_.each(data, function(elem) {
				var m = L.marker(getRandomLatLng(elem));
				markers.addLayer(m);

			})
			return false;
		}
		function getRandomLatLng(elem) {
			// var bounds = map.getBounds(),
			// 	southWest = bounds.getSouthWest(),
			// 	northEast = bounds.getNorthEast(),
			// 	lngSpan = northEast.lng - southWest.lng,
			// 	latSpan = northEast.lat - southWest.lat;

			console.log(elem.latitude);

			var latlng =  L.latLng(
					elem.latitude,
					elem.longitude);
			
			console.log(latlng);
			return latlng;
		}

		markers.on('clusterclick', function (a) {
			a.layer.zoomToBounds();
		});
		d3.json('data_with_open/output_phoenix_all.json', function (error, data) {
			populate(data);
			map.addLayer(markers);
		})
