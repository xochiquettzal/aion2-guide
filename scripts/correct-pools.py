import json,pathlib
p=pathlib.Path('src/data/arcana-pools.json'); d=json.loads(p.read_text())
for c,k,v in [('gladiator','compass','Defiance'),('sorcerer','compass','Frost'),('assassin','mirror','Defense Break'),('chanter','mirror','Impact Hit')]:
 if v not in d[c][k]: d[c][k].append(v)
p.write_text(json.dumps(d,indent=2),encoding='utf-8')
