# tech_data_processing.py

from collections import defaultdict, OrderedDict
from datetime import datetime
import math

# Function to round experience
def round_experience(exp):
    integer_part = math.floor(exp)
    fractional_part = exp - integer_part
    
    if fractional_part >= 0.8:
        return integer_part + 1
    else:
        return integer_part
    
def create_tech_experience(periods, technologies):
    # Initialize a dictionary to store technology experiences
    tech_experience = defaultdict(lambda: {"experience": 0, "last_used": datetime.min})
    for period, tech_set in zip(periods, technologies):
        start_date = datetime.strptime(period[0], "%m.%Y")
        end_date = datetime.strptime(period[1], "%m.%Y")
        experience_years = (end_date - start_date).days / 365.25
        for tech in tech_set:
            tech_lower = tech.lower()  # Convert technology name to lowercase for case-insensitive matching
            tech_experience[tech_lower]["original_name"] = tech
            tech_experience[tech_lower]["experience"] += experience_years
            if end_date > tech_experience[tech_lower]["last_used"]:
                tech_experience[tech_lower]["last_used"] = end_date

    return tech_experience

def group_technologies(tech_experience, groups):
    # Initialize a dictionary to store grouped data
    grouped_data = OrderedDict((group, []) for group in groups)

    # Assign each technology to its group, comparing in lowercase
    for tech, data in tech_experience.items():
        for group, tech_list in groups.items():
            if tech.lower() in map(str.lower, tech_list):
                grouped_data[group].append({
                    'SKILLS': data['original_name'],
                    'EXPERIENCE IN YEARS': round_experience(data['experience']) if round_experience(data['experience']) !=0 else 1,
                    'LAST USED': data['last_used'].year
                })

    return grouped_data

def sort_group_technologies(groups, grouped_data):
    for group, tech_list in groups.items():
        grouped_data[group].sort(key=lambda x: tech_list.index(x['SKILLS'].lower().replace('-', ' ')))

    return grouped_data