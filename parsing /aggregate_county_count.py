#!/usr/bin/python
import os,urllib2,sys
import urllib
import datetime
import time
import re
from bs4 import BeautifulSoup, Comment
from HTMLParser import HTMLParser
from pyparsing import makeHTMLTags, oneOf, withAttribute, Word, nums, Group, htmlComment
from geopy import geocoders 
import json
import MySQLdb

#read file 
count = 0
f = open('./output_phoenix_all.txt', 'rw');
data = json.load(f);
# print data
county_array = []
for d in data.get("features"): 
	county_array.append(d.get("properties").get("name"))

print json.dumps(county_array)

# lines = f.readlines();
# for line in lines:
# 	print "hello"
# 	print line
# 	count+=1
# print count


# for result in results:
# 	address = result[1].strip() + " " + result[2].strip() + "," + result[3]
# 	url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + urllib.quote(address,safe=",") + '&sensor=false'

# 	# print url
# 	# print address
# 	# print (urllib2.parse.quote_plus(url))



# 	time.sleep(5);
# 	resp =  urllib2.urlopen(url)
# 	html = resp.read();
# 	data = json.loads(html) 
# 	address_components =  data.get('results')[0].get('address_components');
# 	# print address_components
# 	for address_component in address_components:
# 		#check the types
# 		types = address_component.get('types')
# 		long_name = address_component.get('long_name')

# 		for type in types:
# 			#print type 
# 			if (type=="administrative_area_level_2"):
# 				#county
# 				print long_name	
# 				updateSql = """update rentmapmetest4.apartment set apartment_county= '""" + long_name + "' where id=" + str(result[0])
# 				print updateSql
# 				cursor.execute(updateSql)
# 				db.commit()
		
	# g = geocoders.Google()
	# actualAddress = "812 Memorial Drive, Cambridge,MA"
	# geocodedValue =  g.geocode(actualAddress)
		# print geocodedValue