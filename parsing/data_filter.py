# 

import json

neighborhood_list = ["Camelback East", "South Mountain", "Estrella", "Laveen", "North Mountain", "Alhambra", "Maryvale", "North Gateway", "New Village", "Desert View", "Ahwatukee Foothills", "Central City", "Paradise Valley", "Deer Valley", "Encanto"]

f = open('../data_with_open/output_phoenix_all.json');
data_out = [];
neighborhood_count_map = {}
l = f.read()
lines = json.loads(l)
for line in lines:
	neighborhood = str(line.get('neighborhood'))
	if (neighborhood is not None):
		if (neighborhood in neighborhood_list):
			print neighborhood
			if (neighborhood in neighborhood_count_map):
				neighborhood_count_map[neighborhood] += 1
			else:
				neighborhood_count_map[neighborhood] = 1
		# data_out.append(line);
		# if (neighborhood_count_map[line['neighborhood']]): 
		# 	neighborhood_count_map[line['neighborhood']]+=1
		# else:
		# 	neighborhood_count_map[line.get['neighborhood']]+=0

print data_out
print neighborhood_count_map
with open('output_phoenix_all.txt', 'w') as outfile:
	json.dump(data_out,outfile);