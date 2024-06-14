from import_data.import_group.import_group_from_json import ImportGroupFromJSON
from import_data.import_group.import_group_from_terminal import ImportGroupFromTerminal
from import_data.import_project.import_project_from_json import ImportProjectFromJSON
from import_data.import_project.import_project_from_terminal import ImportProjectFromTerminal
from service.tech_data_processing import create_tech_experience, group_technologies, sort_group_technologies
from service.missing_technologies import find_missing_in_experience, find_missing_in_groups
from service.dataframe_processing import create_dataframe, create_missing_technologies_in_experience_df, \
    create_missing_groups_df
import sys


def main(arg):
    # Define the groups and their technologies, all in lowercase for case-insensitive matching
    if len(arg) < 2:
        importerGroups = ImportGroupFromTerminal()
        importerProjects = ImportProjectFromTerminal()
    else:
        json_data = arg[1]
        importerGroups = ImportGroupFromJSON()
        importerGroups.set_group_json(json_data)

        importerProjects = ImportProjectFromJSON()
        importerProjects.set_project_json(json_data)

    # import groups
    importerGroups.create_groups()
    groups = importerGroups.get_group()
    # import projects
    importerProjects.create_projects()
    projects = importerProjects.get_projects()

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
    print(f"Grouped DataFrame:")
    print(grouped_df.to_string(index=False))

    # Find missing technologies
    missing_in_experience = find_missing_in_experience(groups, technologies)
    missing_in_groups = find_missing_in_groups(groups, periods, technologies, tech_experience)

    # Creating a DataFrame for Missing Technologies
    missing_experience_df = create_missing_technologies_in_experience_df(missing_in_experience)
    missing_groups_df = create_missing_groups_df(missing_in_groups)

    print(f"Missing Technologies in Experience DataFrame:")
    print(missing_experience_df.to_string(index=False))

    print(f"Missing Technologies in Groups DataFrame:")
    print(missing_groups_df.to_string(index=False))


if __name__ == "__main__":
    main(sys.argv)
