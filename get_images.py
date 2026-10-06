import urllib.request
import re

html = urllib.request.urlopen('https://en.wikipedia.org/wiki/Mung_bean').read().decode('utf-8')
matches = re.findall(r'src=\"\/\/(upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^\"\'\s]+\.jpg)\/[^\"]+\"', html)
for m in set(matches):
    print(f"https://{m}")
