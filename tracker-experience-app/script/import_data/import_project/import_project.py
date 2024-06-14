from abc import ABC, abstractmethod


def expand_technologies(tech_list):
    expanded_list = []
    for tech in tech_list:
        if '(' in tech and ')' in tech:
            prefix, suffix = tech.split('(')
            suffix = suffix.rstrip(')').strip()
            prefix = prefix.strip()
            expanded_list.append(prefix)
            expanded_list.extend([f"{prefix} {sub_tech.strip()}" for sub_tech in suffix.split(',')])
        else:
            expanded_list.append(tech.strip().replace('-', ' '))
    return expanded_list


class ImportProject(ABC):

    def __init__(self):
        self.projects = {
            'periods': [],
            'technologies': []
        }

    @abstractmethod
    def create_projects(self):
        pass

    def get_projects(self):
        return self.projects
