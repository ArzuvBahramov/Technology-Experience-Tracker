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