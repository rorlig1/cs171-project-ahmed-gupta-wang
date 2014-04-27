//embeds the checkin document to business...

function printResult (checkin, r) {
	print("checkin business " + checkin);
	// print(tojson(r))
}


function updateOpenStatus (r) {
	print("business " + r._id);
	db.business.find({_id: r._id}).forEach(function(b) {

			db.business2.update({"_id": r._id}, {$set: {"open": b.open}})
	

	})	


}
db.business2.find().forEach(updateOpenStatus)