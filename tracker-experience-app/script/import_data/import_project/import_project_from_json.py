import re
import json
from datetime import datetime
from .import_project import ImportProject, expand_technologies


class ImportProjectFromJSON(ImportProject):
    def __init__(self):
        super().__init__()
        self.json_data = None

    def set_project_json(self, json_data):
        self.json_data = json_data

    def create_projects(self):
        json_data = self.json_data
        data_dict = json.loads(json_data)
        projects = data_dict['projects']

        periods = []
        technologies = []

        for project in projects:
            period = project['period']
            start_date, end_date = period.split(' – ')
            if end_date.lower() == 'till now':
                end_date = datetime.now().strftime('%m.%Y')
            periods.append((start_date, end_date))

            technologies_split = re.split(r',\s*(?![^\(]*\))', project['technologies'])
            technologies_strip = [tech.strip().rstrip('.') for tech in technologies_split]
            expanded_technologies = expand_technologies(technologies_strip)

            technologies.append([tech.strip().rstrip('.') for tech in expanded_technologies])

        self.projects['periods'] = periods
        self.projects['technologies'] = technologies


