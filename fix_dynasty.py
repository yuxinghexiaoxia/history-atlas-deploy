import re

with open('person.js', 'r') as f:
    content = f.read()

# Fix hardcoded dynasty - look for the pattern with the unicode escapes
old = 'v: "\u6E05\u671D\uFF08\u665A\u6E05\uFF09"'
new = 'v: (DB.dynastyInfo[person.dynasty] ? DB.dynastyInfo[person.dynasty].full : person.dynasty) || "\u672a\u77e5"'

if old in content:
    content = content.replace(old, new)
    with open('person.js', 'w') as f:
        f.write(content)
    print('Fixed hardcoded dynasty')
else:
    print('Pattern not found, searching for alternatives...')
    # Try different patterns
    patterns = [
        'v: "\u6E05\u671D\uFF08\u665A\u6E05\uFF09"',
        '\u6E05\u671D\uFF08\u665A\u6E05\uFF09',
    ]
    for p in patterns:
        if p in content:
            print(f'Found pattern: {repr(p)}')
            break
    else:
        print('No pattern found')
