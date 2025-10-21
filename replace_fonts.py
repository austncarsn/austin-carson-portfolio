#!/usr/bin/env python3
import os
import sys

def replace_in_file(filepath):
    """Replace font-['Inter'] with font-['Satoshi'] in a file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        content = content.replace("font-['Inter']", "font-['Satoshi']")
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
    return False

# Files to process
files_to_update = [
    'src/components/ContactCTA.tsx',
    'src/components/FortuneBox.tsx',
    'src/components/ProjectCard.tsx',
]

updated_count = 0
for filepath in files_to_update:
    if os.path.exists(filepath):
        if replace_in_file(filepath):
            print(f"✓ Updated: {filepath}")
            updated_count += 1
        else:
            print(f"- No changes: {filepath}")
    else:
        print(f"✗ Not found: {filepath}")

print(f"\nTotal files updated: {updated_count}")
