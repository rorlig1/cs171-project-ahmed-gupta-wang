//embeds the checkin document to business...
var neighborhood_array = ["Camelback East", "South Mountain", "Estrella", "Laveen", "North Mountain", 
					"Alhambra", "Maryvale", "North Gateway", "New Village", "Desert View", "Ahwatukee Foothills",
 					"Central City", "Paradise Valley", "Deer Valley", "Encanto"];

var neighborhood_map={}
function printResult (checkin, r) {
  print("checkin business " + checkin);
  // print(tojson(r))
}


function countNeighorhoods (r) {
	// print("neighborhood " + r.neighborhood);
	if (neighborhood_map[r.neighborhood]==undefined){
		neighborhood_map[r.neighborhood] = 0;
	} else {
		neighborhood_map[r.neighborhood]+=1;		
	}
}
db.business2.find({neighborhood: {$in: neighborhood_array}}, {neighborhood:1}).forEach(countNeighorhoods)
print(tojson(neighborhood_map));