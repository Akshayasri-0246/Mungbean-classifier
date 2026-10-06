import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

urls = [
    ("https://upload.wikimedia.org/wikipedia/commons/d/d5/Mung_bean.jpg", "public/mung1.jpg"),
    ("https://upload.wikimedia.org/wikipedia/commons/3/37/Mung_beans_growing.jpg", "public/mung2.jpg") # Assuming standard names
]

for url, filename in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(filename, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
