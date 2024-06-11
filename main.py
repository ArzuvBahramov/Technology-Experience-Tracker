import import_group
import import_project
from tech_data_processing import create_tech_experience, group_technologies, sort_group_technologies
from missing_technologies import find_missing_in_experience, find_missing_in_groups
from dataframe_processing import create_dataframe, create_missing_technologies_in_experience_df, create_missing_groups_df

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

    # Create DataFrame
    grouped_df = create_dataframe(grouped_data)

    # Display the grouped DataFrame
    print("Grouped DataFrame:\n")
    print(grouped_df.to_string(index=False))

    # Find missing technologies
    missing_in_experience = find_missing_in_experience(groups, technologies)
    missing_in_groups = find_missing_in_groups(groups, periods, technologies, tech_experience)

    # Creating a DataFrame for Missing Technologies
    missing_experience_df = create_missing_technologies_in_experience_df(missing_in_experience)
    missing_groups_df = create_missing_groups_df(missing_in_groups)

    print("\nMissing Technologies in Experience DataFrame:")
    print(missing_experience_df.to_string(index=False))

    print("\nMissing Technologies in Groups DataFrame:")
    print(missing_groups_df.to_string(index=False))

if __name__ == "__main__":
    main()






