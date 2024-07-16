# dataframe_processing_terminal.py
from .dataframe import Dataframe
import json


class DataframeProcessingJSON(Dataframe):
  def __init__(self):
    self.matrix = []
    self.missing_technologies_matrix = []
    self.missing_groups_technologies_matrix = []

  def create_matrix(self, grouped_data):
    grouped_rows = super().create_matrix(grouped_data)
    self.matrix = grouped_rows

  def create_missing_technologies_matrix(self, missing_in_experience):
    missing_technologies_matrix = super().create_missing_technologies_matrix(missing_in_experience)
    self.missing_technologies_matrix = missing_technologies_matrix

  def create_missing_groups_technologies_matrix(self, missing_in_groups):
    missing_groups_technologies_matrix = super().create_missing_groups_technologies_matrix(missing_in_groups)
    self.missing_groups_technologies_matrix = missing_groups_technologies_matrix

  def generate_json(self):
    matrix = {
      'matrix': self.matrix,
      'missing_technologies_matrix': self.missing_technologies_matrix,
      'missing_groups_technologies_matrix': self.missing_groups_technologies_matrix
    }

    return json.dumps(matrix)
