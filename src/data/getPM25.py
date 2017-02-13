import requests
import json
import os

url = 'http://taqm.g0v.asper.tw/airmap.json'

try:
    path = os.path.dirname(os.path.abspath(__file__));
    data = requests.get(url)
    data.encoding = 'utf-8'

    with open(path + '/pm25.json', 'w') as f:
      json.dump(data.json(), f)
except:
      print('get data error!')
