//embeds the checkin document to business...

function printResult (checkin, r) {
	print("checkin business " + checkin);
	// print(tojson(r))
}


function getReviews (r) {
//	print("business " + r.business_id);
	db.review.find({business_id: r.business_id}).forEach(function(reviews) {

		print("reviews votes for business " + r.business_id + " review " + JSON.stringify(reviews.votes));
//		db.business.update({"business_id": r.business_id}, {$set: {"votes": votes}})

	})	// body...
}
db.business2.find().limit(1).forEach(getReviews)