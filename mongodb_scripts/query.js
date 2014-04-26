/* 
* determine top 8... 
*/ 
categoryMap = {}
function printResults(r){
	// print(r.categories.length)
	r.categories.forEach(function(category){
		// print(category)
		if (categoryMap[category]==undefined){
			categoryMap[category] = 1;
		} else {
			categoryMap[category]++;
		}
	})
	// r.categories.forEach(function(category){
	// 	console.log('hello')
	// })
		// // printjsononeline(r)
	// .replace("_id" : ObjectId\(.*\), '');
}
db.business2.find({},{categories:1, "_id":0}	
	).forEach(printResults)

// print(JSON.stringify(categoryMap));
var tuples = [];

for (category in categoryMap) {
	print(category);
	tuples.push([category, categoryMap[category]])

}

tuples.sort(function(a,b){
	return b[1] - a[1];
})

print(JSON.stringify(tuples))

