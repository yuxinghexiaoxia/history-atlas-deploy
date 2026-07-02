import json

with open('/Volumes/THUNDEROBOT/AI项目/历史星图/website-deploy/index.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

persons = data['persons']

# Missing sanguo persons (6)
missing_sanguo = {
    "zhi_cao": {
        "intro": "曹操，字孟德，小字阿瞒，沛国谯人，东汉末年杰出的政治家、军事家、文学家。挟天子以令诸侯，统一北方，为曹魏奠基。其子曹丕代汉称帝，追尊为魏武帝。",
        "life": [
            {"y": 155, "key": False, "t": "生于沛国谯县", "s": "字孟德"},
            {"y": 184, "key": False, "t": "镇压黄巾起义", "s": "骑都尉"},
            {"y": 190, "key": True, "t": "讨伐董卓", "s": "散家财起兵"},
            {"y": 196, "key": True, "t": "迎献帝于许昌", "s": "挟天子以令诸侯"},
            {"y": 200, "key": True, "t": "官渡之战", "s": "大败袁绍"},
            {"y": 207, "key": True, "t": "北征乌桓", "s": "统一北方"},
            {"y": 208, "key": True, "t": "赤壁之战", "s": "败于孙刘联军"},
            {"y": 220, "key": True, "t": "病逝洛阳", "s": "年六十六"}
        ]
    },
    "xu_jia": {
        "intro": "徐晃，字公明，河东杨人，三国时期曹魏名将。原为郡吏，后随杨奉，又归曹操。徐晃勇猛善战，随曹操征讨四方，屡立战功。汉中之战，徐晃随曹操抵御刘备。樊城之战，徐晃率军救援曹仁，大败关羽。曹丕称帝后，徐晃任右将军，封阳平侯。",
        "life": [
            {"y": 170, "key": False, "t": "生于河东杨县", "s": "字公明"},
            {"y": 196, "key": False, "t": "归降曹操", "s": "从杨奉来归"},
            {"y": 200, "key": True, "t": "官渡之战", "s": "随曹操大败袁绍"},
            {"y": 211, "key": False, "t": "潼关之战", "s": "随曹操征马超"},
            {"y": 219, "key": True, "t": "樊城之战", "s": "大败关羽"},
            {"y": 220, "key": False, "t": "封阳平侯", "s": "曹丕即位"},
            {"y": 227, "key": True, "t": "病逝", "s": "谥壮侯"}
        ]
    },
    "tong_pang": {
        "intro": "庞统，字士元，襄阳人，东汉末年刘备帐下谋士，与诸葛亮齐名，号为「凤雏」。庞统献计取西川，建安十九年攻雒城中流矢身亡，年仅三十六岁。",
        "life": [
            {"y": 179, "key": False, "t": "生于襄阳", "s": "字士元"},
            {"y": 208, "key": False, "t": "投奔刘备", "s": "为耒阳县令"},
            {"y": 210, "key": False, "t": "受刘备器重", "s": "任治中从事"},
            {"y": 211, "key": True, "t": "随刘备入蜀", "s": "共谋进取益州"},
            {"y": 214, "key": True, "t": "攻雒城中箭", "s": "身亡，年三十六"}
        ]
    },
    "yan_li": {
        "intro": "李严，字正方，南阳人，三国时期蜀汉大臣。李严原为刘表部将，后归降刘备。刘备临终前，与诸葛亮同受遗诏辅佐刘禅。李严任中都护，统内外军事。建兴九年，李严因督办粮草不力，推卸责任，被诸葛亮弹劾免官。",
        "life": [
            {"y": 170, "key": False, "t": "生于南阳", "s": "字正方"},
            {"y": 208, "key": False, "t": "归降刘备", "s": "从刘表来归"},
            {"y": 211, "key": False, "t": "随刘备入蜀", "s": "平定益州"},
            {"y": 223, "key": True, "t": "受遗诏辅政", "s": "与诸葛亮同受遗诏"},
            {"y": 231, "key": True, "t": "被免官", "s": "诸葛亮弹劾"}
        ]
    },
    "yueying_huang": {
        "intro": "黄月英，三国时期蜀汉丞相诸葛亮之妻，黄承彦之女。相传黄月英虽然相貌不佳，但才识过人，木牛流马等发明有她的一份功劳。",
        "life": [
            {"y": 175, "key": False, "t": "生于襄阳", "s": "黄承彦之女"},
            {"y": 197, "key": True, "t": "嫁诸葛亮", "s": "才堪相配"},
            {"y": 205, "key": False, "t": "生诸葛瞻", "s": "诸葛亮之子"},
            {"y": 234, "key": False, "t": "诸葛亮去世", "s": "遗孀"}
        ]
    },
    "pu_cheng": {
        "intro": "程普，字德谋，右北平土垠人，三国时期东吴名将。历仕孙坚、孙策、孙权三代，赤壁之战任右都督，与周瑜分任左右督。",
        "life": [
            {"y": 150, "key": False, "t": "生于右北平土垠", "s": "字德谋"},
            {"y": 184, "key": False, "t": "随孙坚起兵", "s": "镇压黄巾"},
            {"y": 195, "key": False, "t": "从孙策定江东", "s": "从征王朗"},
            {"y": 208, "key": True, "t": "赤壁之战", "s": "任右都督"},
            {"y": 210, "key": False, "t": "代周瑜领南郡", "s": "太守"},
            {"y": 215, "key": True, "t": "病逝", "s": "年约六十五"}
        ]
    }
}

# Missing han persons (5)
missing_han = {
    "cao_shen": {
        "intro": "曹参，字敬伯，沛县人，西汉开国功臣，名将。秦时任沛县狱掾，与刘邦交好。刘邦起兵，曹参为部将，以军功封平阳侯。萧何死后，曹参继任汉丞相，奉行「萧规曹随」，不扰民，清静无为。",
        "life": [
            {"y": -250, "key": False, "t": "生于沛县", "s": "字敬伯"},
            {"y": -209, "key": False, "t": "随刘邦起兵", "s": "为部将"},
            {"y": -202, "key": False, "t": "以功封平阳侯", "s": "攻下二国一百二十二县"},
            {"y": -193, "key": True, "t": "继任丞相", "s": "萧规曹随"},
            {"y": -190, "key": True, "t": "病逝", "s": "谥懿侯"}
        ]
    },
    "huo_qu": {
        "intro": "霍去病，河东平阳人，西汉名将，卫青外甥。十八岁为剽姚校尉，随卫青出征匈奴，封冠军侯。多次率军出击匈奴，打通河西走廊，设置河西四郡。漠北之战大败匈奴左贤王，封狼居胥。元狩六年病逝，年仅二十四岁。",
        "life": [
            {"y": -140, "key": False, "t": "生于河东平阳", "s": "卫青外甥"},
            {"y": -123, "key": True, "t": "初战匈奴", "s": "封冠军侯"},
            {"y": -121, "key": True, "t": "河西之战", "s": "打通河西走廊"},
            {"y": -119, "key": True, "t": "漠北之战", "s": "封狼居胥"},
            {"y": -117, "key": True, "t": "病逝", "s": "年仅二十四"}
        ]
    },
    "lu_bu": {
        "intro": "吕布，字奉先，五原郡九原人，东汉末年名将。以勇武著称，号为「飞将」。先后杀丁原投董卓，又杀董卓自立。夺取刘备徐州，被曹操、刘备联合围攻于下邳，最终缢杀于白门楼。",
        "life": [
            {"y": 160, "key": False, "t": "生于五原九原", "s": "字奉先"},
            {"y": 189, "key": True, "t": "杀丁原投董卓", "s": "拜为骑都尉"},
            {"y": 192, "key": True, "t": "诛杀董卓", "s": "与王允合谋"},
            {"y": 196, "key": False, "t": "夺取徐州", "s": "反客为主"},
            {"y": 198, "key": True, "t": "下邳被围", "s": "曹操、刘备联合进攻"},
            {"y": 199, "key": True, "t": "被擒缢杀", "s": "白门楼"}
        ]
    },
    "gongsun_zan": {
        "intro": "公孙瓒，字伯珪，辽西令支人，东汉末年割据幽州的军阀。以武力著称，与鲜卑、乌桓作战有威名。占据幽州后与袁绍争夺河北，建安四年在易京被袁绍攻破，引火自焚。",
        "life": [
            {"y": 160, "key": False, "t": "生于辽西令支", "s": "字伯珪"},
            {"y": 184, "key": False, "t": "征讨羌胡", "s": "以勇武著称"},
            {"y": 190, "key": False, "t": "起兵讨董卓", "s": "占据幽州"},
            {"y": 198, "key": True, "t": "易京之战", "s": "与袁绍争夺河北"},
            {"y": 199, "key": True, "t": "引火自焚", "s": "先杀妻子儿女"}
        ]
    },
    "xun_yu": {
        "intro": "荀彧，字文若，颍川颍阴人，东汉末年著名政治家、战略家。初仕袁绍，后弃袁投曹，为曹操谋划统一北方，举荐大量人才。后因反对曹操称魏公，被曹操疏远，建安十七年被迫服毒自尽。",
        "life": [
            {"y": 163, "key": False, "t": "生于颍川颍阴", "s": "字文若"},
            {"y": 191, "key": False, "t": "弃袁绍投曹操", "s": "为曹操谋主"},
            {"y": 196, "key": True, "t": "劝迎献帝", "s": "挟天子以令诸侯"},
            {"y": 200, "key": True, "t": "坚定官渡信心", "s": "四胜四败论"},
            {"y": 212, "key": True, "t": "反对称魏公", "s": "被曹操疏远"},
            {"y": 212, "key": True, "t": "服毒自尽", "s": "年五十"}
        ]
    }
}

for pid, p0 in missing_sanguo.items():
    if pid in persons and persons[pid].get('dynasty') == 'sanguo':
        persons[pid]['intro'] = p0['intro']
        persons[pid]['life'] = p0['life']

for pid, p0 in missing_han.items():
    if pid in persons and persons[pid].get('dynasty') == 'han':
        persons[pid]['intro'] = p0['intro']
        persons[pid]['life'] = p0['life']

with open('/Volumes/THUNDEROBOT/AI项目/历史星图/website-deploy/index.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Verify
sanguo_count = sum(1 for k,v in persons.items() if v.get('dynasty') == 'sanguo' and 'intro' in v)
han_count = sum(1 for k,v in persons.items() if v.get('dynasty') == 'han' and 'intro' in v)
print(f'Final sanguo with intro: {sanguo_count}')
print(f'Final han with intro: {han_count}')
