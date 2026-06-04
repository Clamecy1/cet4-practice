"""Check for template literal issues in sections.ts"""
import re
from pathlib import Path

content = Path(r'C:\Users\Administrator\cet4-practice\src\data\sections.ts').read_text('utf-8')

# Check for dollar-brace in transcripts (template interpolation)
dollar_brace = re.compile(r'\$\{')
all_matches = list(dollar_brace.finditer(content))
print('Found {} ${{ occurrences'.format(len(all_matches)))
for m in all_matches[:10]:
    line_num = content[:m.start()].count('\n') + 1
    snippet = content[max(0,m.start()-40):m.end()+40]
    print('  Line {}: ...{}...'.format(line_num, repr(snippet)))

# Check transcript count
pattern = re.compile(r"transcript: `((?:[^`]|\n)*?)`", re.MULTILINE)
matches = list(pattern.finditer(content))
print('\nFound {} transcript fields'.format(len(matches)))

# Check if any line has odd number of backticks (potential unclosed template)
lines = content.split('\n')
for i, line in enumerate(lines):
    count = line.count('`')
    if count % 2 != 0 and count > 0:
        print('Line {}: odd backtick count ({}): {}...'.format(i+1, count, line[:120]))
