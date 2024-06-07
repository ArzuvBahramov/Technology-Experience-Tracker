# Technology Experience Tracker

This project allows you to track your experience with various technologies based on provided periods and technologies. The program groups technologies, calculates experience in years, and the last used date, and then outputs the results in a convenient format.

## Project Structure

The project is divided into several modules to follow SOLID principles:

- `tech_data_processing.py`: Processes technology data.
- `import_group.py, import_project.py`: Handles input of periods and technologies from the keyboard.
- `dataframe_processing.py`: Creates and processes DataFrame.
- `main.py`: The main module that ties all functions together and manages application logic.

## Installation

1. Clone the repository:
    ```bash
    https://github.com/ArzuvBahramov/Technology-Experience-Tracker.git
    ```

2. Navigate to the project directory:
    ```bash
    cd tech-experience-tracker
    ```

3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

Run the main application:
```bash
python main.py
```

## Тестовые данные

В папке `test` находятся тестовые данные. Вы можете загрузить их, и результат должен соответствовать следующему формату:
Извините за это. Давайте попробуем вставить код таблицы в формате Markdown:

```markdown
|                     GROUP              | SKILLS             | EXPERIENCE IN YEARS | LAST USED |
|----------------------------------------|--------------------|---------------------|-----------|
| Programming languages                  | Java               | 9                   | 2024      |
|                                        | Kotlin             | 2                   | 2020      |
|                                        | Groovy             | 3                   | 2019      |
| Back-end                               | Spring             | 9                   | 2024      |
|                                        | Spring Boot        | 9                   | 2024      |
..                                       ..                   ..                    ..          
| IDE                                    | IntelliJ Idea      | 4                   | 2022      |
|                                        | Eclipse            | 5                   | 2024      |
