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

def pth(x):
    return os.path.join(os.path.dirname(__file__), x)

chosen_model_id = sys.argv[1]
if chosen_model_id not in { 'Sacramento', 'SantaRosa', 'Napa' }:
    raise RuntimeError("Invalid Model Name")
model = keras.models.load_model(pth(f'{chosen_model_id}.model.h5'))
with open(pth(f'{chosen_model_id}.scaler.pickle'), 'rb') as f:
    scaler = pickle.load(f)

_param_data = json.loads(sys.argv[2])
param_data = {
    'tmpc': _param_data['tmpc'],
    'dwpc': _param_data['dwpc'],
    'relh': _param_data['relh'],
    'sped': _param_data['sped'],
    'mslp': _param_data['mslp'],
    'vsby': _param_data['vsby'],
    'month': _param_data['month'],
    'skyc1': _param_data['skyc1']
}
"""param_data = {
    'tmpc': 11.1,
    'dwpc': 11.1,
    'relh': 100,
    'sped': 1.45,
    'mslp': 1018.8,
    'vsby': 10,
    'month': 5,
    'skyc1': 'BKN'
}"""

data = pd.DataFrame()
for x in param_data:
    data[x] = [param_data[x]]
#print(data)
for cloud_type in [ 'BKN','CB','CLR','FEW','OVC','SCT','SKC','TCU' ]:
    data[cloud_type] = [(1 if x == cloud_type else 0) for x in data['skyc1']]
data = data.drop(['skyc1'], axis=1)
#print(data)
data = scaler.transform(data)
#print(data)
print(model.predict(data, verbose=0)[0][0])