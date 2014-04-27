//embeds the checkin document to business...

function printResult (checkin, r) {
	print("checkin business " + checkin);
	// print(tojson(r))
}


function addBusinessId (r) {
	print("business " + r._id);
	var reviewArr = []
	db.business.find({_id: r._id}).forEach(function(b) {

			db.business2.update({"_id": r._id}, {$set: {"business_id": b.business_id}})
	

	})	


}
db.business2.find().forEach(addBusinessId)