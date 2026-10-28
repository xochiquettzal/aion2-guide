import urllib.request,pathlib
u='https://raidrelay.com/aion-2-arcana-guide'
try:
 h=urllib.request.urlopen(u,timeout=20).read().decode(); pathlib.Path('research/arcana-page.html').write_text(h,encoding='utf-8'); print(len(h))
except Exception as e: print(type(e).__name__,str(e))
