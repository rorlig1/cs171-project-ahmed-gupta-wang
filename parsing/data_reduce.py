# 

import json

neighborhood_list = ["Camelback East", "South Mountain", "Estrella", "Laveen", "North Mountain", "Alhambra", "Maryvale", "North Gateway", "New Village", "Desert View", "Ahwatukee Foothills", "Central City", "Paradise Valley", "Deer Valley", "Encanto"]

f = open('../data_with_open/output_phoenix_all.json');
data_out = [];
neighborhood_count_map = {}
review_map = {}

l = f.read()
lines = json.loads(l)
for line in lines:
	attributes = line.get('attributes');
	print attributes
	reviews  = line.get('reviews');
	vote_map ={"funny":0, "useful":0, "cool":0}
	review_map = {}


	for review in reviews:
		print review;
		stars = str(review.get('stars'));
		votes = review.get('votes');
		# print stars;
		if (stars in review_map):
			review_map[stars]+=1
		else:
			review_map[stars]=1;
		vote_map["funny"]+=int(votes.get("funny"));

		vote_map["cool"]+=int(votes.get("cool"));

		vote_map["useful"]+=int(votes.get("useful"));
	reviews=[]
	line["review_map"] = review_map
	line["vote_map"]  = vote_map;
	line["Price_Range"] = attributes.get("Price Range")
	line["attributes"] = "";
	line["reviews"]=""
	data_out.append(line);
		# if (neighborhood_count_map[line['neighborhood']]): 
		# 	neighborhood_count_map[line['neighborhood']]+=1
		# else:
		# 	neighborhood_count_map[line.get['neighborhood']]+=0

print data_out
with open('output_phoenix_all_2.txt', 'w') as outfile:
	json.dump(data_out,outfile);