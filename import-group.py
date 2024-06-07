import re

def create_groups_from_input():
    groups = {}
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
            groups[current_group].extend(tech.strip() for tech in technologies)
    
    return groups

# Создаем объект groups из ввода пользователя
groups = create_groups_from_input()
print(groups)
