from collections import OrderedDict
from abc import ABC, abstractmethod


def expand_technologies(groupName, tech_list):
    expanded_list = []
    for tech in tech_list:
        if '(' in tech and ')' in tech:
            prefix, suffix = tech.split('(')
            suffix = suffix.rstrip(')').strip()
            prefix = prefix.strip()
            expanded_list.append(prefix)
            if groupName.startswith('Back'):
                expanded_list.extend([f"{prefix} {sub_tech.strip()}" for sub_tech in suffix.split(',')])

        else:
            expanded_list.append(tech.strip().replace('-', ' '))
    return expanded_list


class ImportGroup(ABC):

    def __init__(self):
        self.groups = OrderedDict()

    @abstractmethod
    def create_groups(self):
        pass

    def get_group(self):
        return self.groups
