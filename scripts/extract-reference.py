import zipfile, xml.etree.ElementTree as E, json, pathlib
p=pathlib.Path("Kanon's Aion 2 Bible.docx")
out=pathlib.Path('research'); (out/'media').mkdir(parents=True,exist_ok=True)
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
with zipfile.ZipFile(p) as z:
 root=E.fromstring(z.read('word/document.xml'))
 blocks=[]
 for i,el in enumerate(root.findall('.//w:body/*',ns)):
  t=' '.join(n.text or '' for n in el.findall('.//w:t',ns))
  embeds=[n.attrib for n in el.findall('.//a:blip',ns)]
  blocks.append({'index':i,'type':el.tag.split('}')[-1],'text':t,'images':embeds})
 (out/'bible-blocks.json').write_text(json.dumps(blocks,indent=2),encoding='utf-8')
 (out/'bible-text.txt').write_text('\n'.join(f"[{b['index']}] {b['text']}" for b in blocks),encoding='utf-8')
 rels=E.fromstring(z.read('word/_rels/document.xml.rels'))
 (out/'bible-links.json').write_text(json.dumps([r.attrib for r in rels],indent=2),encoding='utf-8')
 for name in z.namelist():
  if name.startswith('word/media/'):
   (out/'media'/pathlib.Path(name).name).write_bytes(z.read(name))
 print('Blocks',len(blocks),'Tables',sum(b['type']=='tbl' for b in blocks),'Media',len(list((out/'media').iterdir())))
