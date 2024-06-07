import import_group
import import_project
from tech_data_processing import create_tech_experience, group_technologies, sort_group_technologies
from dataframe_processing import create_dataframe

def main():
    # Define the groups and their technologies, all in lowercase for case-insensitive matching
    groups = import_group.create_groups_from_input()
    #import projects
    projects = import_project.input_technologies()

    # Define the periods and technologies
    periods = projects['periods']
    technologies = projects['technologies']

    # Convert periods to datetime objects and compute experience in years
    tech_experience = create_tech_experience(periods, technologies)
    # Group technologies
    grouped_data = group_technologies(tech_experience, groups)
    # Sort technologies in group_data by groups
    grouped_data = sort_group_technologies(groups, grouped_data)

    grouped_df = create_dataframe(grouped_data)

    # Display the grouped DataFrame
    print(grouped_df.to_string(index=False))

if __name__ == "__main__":
    main()






