import json
from bs4 import BeautifulSoup

# 读取index.html文件内容
with open('Common English Words for Children.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# 解析HTML
soup = BeautifulSoup(html_content, 'html.parser')

# 提取信息
data = {}
for section in soup.find_all('h2'):
    item = {}
    title = section.text.strip().replace(' ', '_').lower()  # 将标题转换为属性名
    item['title'] = section.text.strip()
    item['definition'] = section.find_next('p').text.strip()
    item['description'] = section.find_next('p').find_next('p').text.strip()
    item['long_description'] = section.find_next('p').find_next('p').find_next('p').text.strip()
    item['english_description'] = section.find_next('p').find_next('p').find_next('p').find_next('p').text.strip()
    
    examples = []
    examples_section = section.find_next('p', text='Examples').find_next('ul')
    for li in examples_section.find_all('li'):
        example = {}
        example['english'] = li.find('span', lang='en').text.strip()
        example['chinese'] = li.find('span', lang='cn').text.strip()
        audio_src = li.find('audio').find('source')['src']
        example['audio'] = f"http://ip/assets/{audio_src}"  # 添加前缀
        examples.append(example)
    
    item['examples'] = examples
    data[title] = item

# 转换为JSON并写入文件
with open('output.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print("JSON data has been written to output.json")