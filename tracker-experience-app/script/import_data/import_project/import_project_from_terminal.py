import re
from .import_project import ImportProject, expand_technologies


class ImportProjectFromTerminal(ImportProject):
    @staticmethod
    def input_data(info):
        line = input(info).strip()
        ascii_text = line.encode("ascii", "ignore").decode()
        return ascii_text

    def create_projects(self):
        periods = []
        technologies = []

        while True:
            period = input("Введите период времени (например, 08.2015 – 10.2017) или 'exit' для завершения: ").strip()
            if period.lower() == 'exit':
                break

            start_date, end_date = period.split(' – ')
            periods.append((start_date, end_date))

            technologies_input = self.input_data("Введите технологии, разделенные запятыми: ")
            technologies_split = re.split(r',\s*(?![^\(]*\))', technologies_input)
            technologies_strit = [tech.strip().rstrip('.') for tech in technologies_split]
            expanded_technologies = expand_technologies(technologies_strit)

            technologies.append([tech.strip().rstrip('.') for tech in expanded_technologies])

        self.projects['periods'] = periods
        self.projects['technologies'] = technologies
