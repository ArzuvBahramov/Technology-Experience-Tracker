from import_data.import_group.import_group_from_json import ImportGroupFromJSON
from import_data.import_group.import_group_from_terminal import ImportGroupFromTerminal
from import_data.import_project.import_project_from_json import ImportProjectFromJSON
from import_data.import_project.import_project_from_terminal import ImportProjectFromTerminal
from service.tech_data_processing import create_tech_experience, group_technologies, sort_group_technologies
from service.dataframe_processing.dataframe_processing_terminal import DataframeProcessingTerminal
from service.dataframe_processing.dataframe_processing_json import DataframeProcessingJSON
from service.missing_technologies import find_missing_in_experience, find_missing_in_groups
import json
import sys


def terminal(grouped_data, missing_in_experience, missing_in_groups):
  # Create DataFrame
  dataframe_creator = DataframeProcessingTerminal()
  grouped_df = dataframe_creator.create_matrix(grouped_data)
  # Creating a DataFrame for Missing Technologies
  missing_experience_df = dataframe_creator.create_missing_technologies_matrix(missing_in_experience)
  missing_groups_df = dataframe_creator.create_missing_groups_technologies_matrix(missing_in_groups)

  # Display the grouped DataFrame
  print(f"Grouped DataFrame:")
  print(grouped_df.to_string(index=False))

  print(f"Missing Technologies in Experience DataFrame:")
  print(missing_experience_df.to_string(index=False))

  print(f"Missing Technologies in Groups DataFrame:")
  print(missing_groups_df.to_string(index=False))


def electron(grouped_data, missing_in_experience, missing_in_groups):
  dataframe_creator = DataframeProcessingJSON()
  dataframe_creator.create_matrix(grouped_data)
  dataframe_creator.create_missing_technologies_matrix(missing_in_experience)
  dataframe_creator.create_missing_groups_technologies_matrix(missing_in_groups)

  print(dataframe_creator.generate_json())


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

  # Find missing technologies
  missing_in_experience = find_missing_in_experience(groups, technologies)
  missing_in_groups = find_missing_in_groups(groups, periods, technologies, tech_experience)

  if len(arg) < 2:
    terminal(grouped_data, missing_in_experience, missing_in_groups)
  else:
    electron(grouped_data, missing_in_experience, missing_in_groups)


if __name__ == "__main__":
  main(sys.argv)
