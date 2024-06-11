import re
from collections import OrderedDict

def input_data(info):
    line = input(info).strip()
    ascii_text = line.encode("ascii", "ignore").decode()
    return ascii_text

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

    while True:
        line = input_data("Введите название группы (для выхода введите 'exit'): ")
        if line.lower() == 'exit':
            break

        if not line:
            continue

        group = line
        groups[group] = []
        line = input_data("Введите для ${group} ее технологии, разделенные запятыми: ")
        
        original_technologies = [tech.strip().rstrip('.') for tech in re.split(r',\s*(?![^\(]*\))', line)]
        technologies = expand_technologies(group, original_technologies)
        technologies = [(tech.lower(), tech) for tech in technologies]
        groups[group].extend(technologies)

    return groups
