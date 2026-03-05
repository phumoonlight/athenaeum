import requests

res = requests.get('https://api.github.com/users/phumoonlight')

res_dict = dict(res.json())

for res_key in res_dict:
    print(f'[res] {res_key}:', res_dict.get(res_key))
