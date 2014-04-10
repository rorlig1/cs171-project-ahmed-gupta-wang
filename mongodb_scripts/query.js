function printResults(r){
	printjsononeline(r)
	// .replace("_id" : ObjectId\(.*\), '');
}
db.business.find({categories:"Restaurants", checkin : { $exists:true }},
	{checkin:1, review_count: 1, categories:1, city:1, state:1, name:1,
		latitude:1, longitude:1, full_address:1, "attributes.Price Range":1 , _id: 0
	})
	.forEach(printResults)
	

