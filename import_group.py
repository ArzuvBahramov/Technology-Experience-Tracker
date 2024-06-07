import re
from collections import OrderedDict

def expand_technologies(groupName, tech_list):
    expanded_list = []
    for tech in tech_list:
        if '(' in tech and ')' in tech:
            prefix, suffix = tech.split('(')
            suffix = suffix.rstrip(')').strip()
            prefix = prefix.strip()
            expanded_list.append(prefix)
            if (groupName.startswith('Back')):
                expanded_list.extend([f"{prefix} {sub_tech.strip()}" for sub_tech in suffix.split(',')])

        else:
            expanded_list.append(tech.strip().replace('-', ' '))
    return expanded_list

def create_groups_from_input():
    groups = OrderedDict()

    current_group = None

    while True:
        line = input("Введите название группы и ее технологии (для выхода введите 'exit'): ").strip()
        if line.lower() == 'exit':
            break

        if not line:
            continue
        
        # Check if line is a group name (no comma, no parenthesis)
        if ',' not in line and '(' not in line:
            current_group = line
            groups[current_group] = []
        elif current_group:
            # Extract individual technologies, considering versions in parentheses
            technologies = re.split(r',\s*(?![^\(]*\))', line)
            technologies = [tech.strip().lower().rstrip('.') for tech in technologies]
            technologies = expand_technologies(current_group, technologies)
            groups[current_group].extend(technologies)

    return groups
