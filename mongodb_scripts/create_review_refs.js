//embeds the checkin document to business...

function printResult (checkin, r) {
	print("checkin business " + checkin);
	// print(tojson(r))
}


function getReviews (r) {
	print("business " + r.business_id);
	var reviewArr = []
	db.review.find({business_id: r.business_id}).forEach(function(reviews) {

		var reviewObj = {};
		reviewObj["stars"] = reviews.stars;
		reviewObj["votes"] = reviews.votes;

		reviewArr.push(reviewObj);

		print("reviews votes for business " + r.business_id + " review " + JSON.stringify(reviews.votes));

	})	

	db.business2.update({"_id": r._id}, {$set: {"reviews": reviewArr}})

}
db.business2.find().forEach(getReviews)