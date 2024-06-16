# dataframe_processing_terminal.py
from .dataframe import Dataframe
import pandas as pd


class DataframeProcessingTerminal(Dataframe):
  def create_matrix(self, grouped_data):
    grouped_rows = super().create_matrix(grouped_data)
    # Convert the grouped data into a DataFrame
    grouped_df = pd.DataFrame(grouped_rows)
    return grouped_df

  def create_missing_technologies_matrix(self, missing_in_experience):
    rows = super().create_missing_technologies_matrix(missing_in_experience)
    return pd.DataFrame(rows)

  def create_missing_groups_technologies_matrix(self, missing_in_groups):
    rows = super().create_missing_groups_technologies_matrix(missing_in_groups)
    return pd.DataFrame(rows)
