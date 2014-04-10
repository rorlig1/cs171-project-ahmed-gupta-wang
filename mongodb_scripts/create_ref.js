//embeds the checkin document to business...

function printResult (checkin, r) {
  print("checkin business " + checkin);
  // print(tojson(r))
}


function getCheckin (r) {
	print("business " + r.business_id);
	db.checkin.find({business_id: r.business_id}).forEach(function(checkin) {
	  
	  print("checkin business " + checkin);
	  db.business.update({"business_id": r.business_id}, {$set: {"checkin": checkin}})

	})	// body...
}
db.business.find().forEach(getCheckin)
