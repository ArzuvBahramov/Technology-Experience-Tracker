from .import_group import ImportGroup, expand_technologies
import re


class ImportGroupFromTerminal(ImportGroup):
    @staticmethod
    def input_data(info):
        line = input(info).strip()
        ascii_text = line.encode("ascii", "ignore").decode()
        return ascii_text

    def create_groups(self):
        while True:
            line = self.input_data("Введите название группы (для выхода введите 'exit'): ")
            if line.lower() == 'exit':
                break

            if not line:
                continue

            group = line
            self.groups[group] = []
            line = self.input_data("Введите для ${group} ее технологии, разделенные запятыми: ")

            original_technologies = [tech.strip().rstrip('.') for tech in re.split(r',\s*(?![^\(]*\))', line)]
            technologies = expand_technologies(group, original_technologies)
            technologies = [(tech.lower(), tech) for tech in technologies]
            self.groups[group].extend(technologies)
