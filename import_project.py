import re
def input_data(info):
    line = input(info).strip()
    ascii_text = line.encode("ascii", "ignore").decode()
    return ascii_text

def expand_technologies(tech_list):
    expanded_list = []
    for tech in tech_list:
        if '(' in tech and ')' in tech:
            prefix, suffix = tech.split('(')
            suffix = suffix.rstrip(')').strip()
            prefix = prefix.strip()
            expanded_list.append(prefix)
            expanded_list.extend([f"{prefix} {sub_tech.strip()}" for sub_tech in suffix.split(',')])
        else:
            expanded_list.append(tech.strip().replace('-', ' '))
    return expanded_list

def input_technologies():
    periods = []
    technologies = []

    while True:
        period = input("Введите период времени (например, 08.2015 – 10.2017) или 'exit' для завершения: ").strip()
        if period.lower() == 'exit':
            break
        
        start_date, end_date = period.split(' – ')
        periods.append((start_date, end_date))

        technologies_input = input_data("Введите технологии, разделенные запятыми: ")
        technologies_split = re.split(r',\s*(?![^\(]*\))', technologies_input)
        technologies_strit = [tech.strip().rstrip('.') for tech in technologies_split]
        expanded_technologies = expand_technologies(technologies_strit)

        technologies.append([tech.strip().rstrip('.') for tech in expanded_technologies])

    return {'periods': periods, 'technologies': technologies}