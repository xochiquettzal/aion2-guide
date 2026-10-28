import re,json,pathlib
s=pathlib.Path('research/arcana-config.js').read_text(encoding='utf-8')
result={}
for m in re.finditer(r'id: "([a-z]+)",\s+name: "([^"]+)",\s+skills: \[([\s\S]*?)\],\s+arcanaPools: \{([\s\S]*?)\}',s):
 cid,name,skills,pools=m.groups(); cid='spiritmaster' if cid=='elementalist' else cid
 sk={i:{'name':n,'type':t} for i,n,t in re.findall(r'id: "([^"]+)", name: "([^"]+)", type: "([^"]+)"',skills)}
 ps={k:[sk[i]['name'] for i in json.loads(v)] for k,v in re.findall(r'(\w+): (\[[^\]]*\])',pools)}
 result[cid]=ps
pathlib.Path('src/data').mkdir(parents=True,exist_ok=True)
pathlib.Path('src/data/arcana-pools.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))
