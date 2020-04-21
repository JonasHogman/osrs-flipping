import requests
import json
import os

items_json = requests.get(
    "https://storage.googleapis.com/osb-exchange/summary.json").json()

id_list = []

for id, info in items_json.items():
    id_list.append(id)

with open('C:\\Users\\TK-Kone\\VSCode\\osrs-flipping\\osrs-flipping\\public\\assets\\base64\\icons-items-complete.json') as base64_json:
    data = json.load(base64_json)
    new_dict = {}
    for id, base64 in data.items():
        if id in id_list:
            new_dict[id] = base64


with open('C:\\Users\\TK-Kone\\VSCode\\osrs-flipping\\osrs-flipping\\public\\assets\\base64\\icons-items-complete-filtered.json', 'w') as outfile:
    json.dump(new_dict, outfile)
