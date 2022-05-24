import sys
import json
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import pickle
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow import keras
from imblearn.over_sampling import RandomOverSampler

chosen_model_id = sys.argv[1]
if chosen_model_id not in { 'Sacramento', 'SantaRosa', 'Napa' }:
    raise RuntimeError("Invalid Model Name")
model = keras.models.load_model(f'{chosen_model_id}.model')
with open(f'{chosen_model_id}.scaler.pickle', 'rb') as f:
    scaler = pickle.load(f)

param_data = {
    'tmpc': 11.1,
    'dwpc': 11.1,
    'month': 1,
    'relh': 100,
    'sped': 3.45,
    'mslp': 1018.8,
    'vsby': 1.75,
    'skyc1': 'BKN',
    'rain': 0
}

data = pd.DataFrame()
for x in param_data:
    data[x] = [param_data[x]]
print(data)
for cloud_type in [ 'BKN','CB','CLR','FEW','OVC','SCT','SKC','TCU' ]:
    data[cloud_type] = [(1 if x == cloud_type else 0) for x in data['skyc1']]
data = data.drop(['skyc1'], axis=1)
print(data)
data = data.drop(['rain'], axis=1)
data = scaler.transform(data)
print(data)
