
import json

with open('/Volumes/THUNDEROBOT/AI项目/历史星图/website-deploy/index.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

persons = data['persons']
sanguo = sorted([k for k,v in persons.items() if v.get('dynasty') == 'sanguo'])
han = sorted([k for k,v in persons.items() if v.get('dynasty') == 'han'])

print(f'sanguo count: {len(sanguo)}')
print(f'han count: {len(han)}')
print(f'sanguo IDs: {sanguo}')
print(f'han IDs: {han}')
