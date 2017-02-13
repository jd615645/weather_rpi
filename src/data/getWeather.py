import requests
import json
import os

key = '4e4602fcdef9feae'
url = 'http://api.wunderground.com/api/' + key+ '/forecast/geolookup/conditions/lang:TW/q/zmw:00000.1.59158.json'

try:
    path = os.path.dirname(os.path.abspath(__file__));
    data = requests.get(url)
    data.encoding = 'utf-8'

    with open(path + '/weather.json', 'w') as f:
      json.dump(data.json(), f)
except:
      print('get data error!')
