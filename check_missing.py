import json

with open('/Volumes/THUNDEROBOT/AI项目/历史星图/website-deploy/index.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

persons = data['persons']

for pid in ['cao_shen', 'huo_qu', 'lu_bu', 'gongsun_zan', 'xun_yu']:
    if pid in persons:
        print(f'{pid}: dynasty={persons[pid].get("dynasty")}, has_intro={"intro" in persons[pid]}')
    else:
        print(f'{pid}: NOT FOUND')

for pid in ['zhi_cao', 'xu_jia', 'tong_pang', 'yan_li', 'yueying_huang', 'pu_cheng']:
    if pid in persons:
        print(f'{pid}: dynasty={persons[pid].get("dynasty")}, has_intro={"intro" in persons[pid]}')
    else:
        print(f'{pid}: NOT FOUND')
