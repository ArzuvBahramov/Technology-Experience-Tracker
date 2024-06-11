# dataframe_processing.py

import pandas as pd

def create_dataframe(grouped_data):
    # Create a DataFrame to display the results
    grouped_rows = []
    for group, techs in grouped_data.items():
        first = True
        for tech in techs:
            grouped_rows.append({
                'GROUP': group if first else '',
                'SKILLS': tech['SKILLS'],
                'EXPERIENCE IN YEARS': tech['EXPERIENCE IN YEARS'],
                'LAST USED': tech['LAST USED']
            })
            first = False

    # Convert the grouped data into a DataFrame
    grouped_df = pd.DataFrame(grouped_rows)
    return grouped_df

def create_missing_technologies_in_experience_df(missing_in_experience):
    rows = []
    for group, tech_list in missing_in_experience.items():
        first = True
        for tech in tech_list:
            rows.append({
                'GROUP': group if first else '',
                'MISSING TECHNOLOGY': tech
            })
            first = False

    return pd.DataFrame(rows)

def create_missing_groups_df(missing_in_groups):
    rows = []
    for tech, periods, experience in missing_in_groups:
        first = True
        for period in periods:
            rows.append({
                'TECHNOLOGY': tech if first else '',
                'PERIODS': period,
                'EXPERIENCE': round(experience, 2)
            })
            first = False

    return pd.DataFrame(rows)
