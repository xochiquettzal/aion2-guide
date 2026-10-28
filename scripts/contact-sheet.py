import json,pathlib
from PIL import Image,ImageOps,ImageDraw
p=pathlib.Path('research'); imgs=list((p/'media').glob('*')); sheets=[]
for start in range(0,len(imgs),30):
 canvas=Image.new('RGB',(1250,((len(imgs[start:start+30])+4)//5)*160),'#e0e0e0'); d=ImageDraw.Draw(canvas)
 for j,f in enumerate(imgs[start:start+30]):
  try:
   im=Image.open(f); im.thumbnail((240,130)); x=(j%5)*250; y=(j//5)*160; canvas.paste(im,(x,y)); d.text((x,y+132),f.name,fill='black')
  except: pass
 canvas.save(p/f'contact-{start//30}.jpg')
b=json.load(open(p/'bible-blocks.json')); r={v['Id']:v['Target'] for v in json.load(open(p/'bible-links.json'))}
for x in b:
 if x['images']: print(x['index'],[r.get(v.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')) for v in x['images']])
