from .import_group import ImportGroup, expand_technologies
import json
import re


class ImportGroupFromJSON(ImportGroup):
    def __init__(self):
        super().__init__()
        self.json_data = None

    def set_group_json(self, json_data):
        self.json_data = json_data

    def create_groups(self):
        json_data = self.json_data
        data_dict = json.loads(json_data)
        groups = data_dict['groups']

        for group in groups:
            self.groups[group['name']] = []

            original_technologies = [tech.strip().rstrip('.') for tech in
                                     re.split(r',\s*(?![^\(]*\))', group['technologies'])]
            technologies = expand_technologies(group['name'], original_technologies)
            technologies = [(tech.lower(), tech) for tech in technologies]
            self.groups[group['name']].extend(technologies)
