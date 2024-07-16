from collections import defaultdict

def find_missing_in_experience(groups, technologies):
    missing_in_experience = defaultdict(list)
    all_tech_set = {tech.lower().replace('-', ' ') for tech_list in technologies for tech in tech_list}

    for group, tech_list in groups.items():
        for tech, original_name in tech_list:
            tech_lower = tech.lower().replace('-', ' ')
            if tech_lower not in all_tech_set:
                missing_in_experience[group].append(original_name)

    return missing_in_experience

def find_missing_in_groups(groups, periods, technologies, tech_experience):
    missing_in_groups = []
    tech_periods = defaultdict(list)
    for period, tech_set in zip(periods, technologies):
        for tech in tech_set:
            tech_periods[tech.lower()].append(period)

    for tech in tech_experience.keys():
        found = False
        for tech_list in groups.values():
            tech_list = [item[0] for item in tech_list]
            if tech in map(lambda x: x.lower().replace('-', ' '), tech_list):
                found = True
                break
        if not found:
            missing_in_groups.append((tech_experience[tech]['original_name'], tech_periods[tech], tech_experience[tech]['experience']))

    return missing_in_groups
