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
from imblearn.under_sampling import RandomUnderSampler

PARAM = {
    'layer1': 12,
    'layer2': 10,
    'layer3': 4,
    'epochs': 400,
    'rate': 0.2,
}

CLOUDS = [
    'BKN',
    'CB',
    'CLR',
    'FEW',
    'OVC',
    'SCT',
    'SKC',
    'TCU'
]

class Model:
    def clean_data(self):
        self.data_frame = self.data_frame.drop(['alti'], axis=1)
        for column in list(self.data_frame.columns):
            self.data_frame = self.data_frame[self.data_frame[column] != 'M']
            self.data_frame = self.data_frame[self.data_frame[column] != 'T']
        self.data_frame = self.data_frame.drop(['station'], axis=1)
        self.data_frame['month'] = pd.DatetimeIndex(self.data_frame['valid']).month
        self.data_frame = self.data_frame.drop(['valid'], axis=1)
        for cloud_type in CLOUDS:
            self.data_frame[cloud_type] = [(1 if x == cloud_type else 0) for x in self.data_frame['skyc1']]
        self.data_frame = self.data_frame.drop(['skyc1'], axis=1)
        self.data_frame['rain'] = [(1 if np.float64(x) > 0 else 0) for x in self.data_frame['p01m']]
        self.data_frame = self.data_frame.drop(['p01m'],axis=1)
        self.data_frame.dropna(inplace=True)
        #print(self.data_frame)
    def split_data(self):
        X = self.data_frame.drop(['rain'], axis=1)
        y = self.data_frame['rain']
        self.X_train, self.X_test, self.Y_train, self.Y_test = train_test_split(X, y, test_size=0.20)
        over_sampler = RandomUnderSampler()
        self.X_train, self.Y_train = over_sampler.fit_resample(self.X_train, self.Y_train)
        #print(sum(self.Y_train))
        #print(len(self.Y_train))
    def read_data(self):
        self.data_frame = pd.read_csv(self.csv_name)
    def scale_data(self):
        self.scaler = MinMaxScaler()
        self.scaler.fit(self.X_train)
        #print(self.X_train)
        #test_scaler(self.scaler)
        self.X_train = self.scaler.transform(self.X_train)
        self.X_test = self.scaler.transform(self.X_test)
    def save_scaler(self):
        self.scaler_name = f'{self.basename}.scaler.pickle'
        with open(self.scaler_name, 'wb') as f:
            pickle.dump(self.scaler, f)
    def fit_model(self):
        self.model = Sequential(name='classifier')
        self.model.add(Dense(PARAM['layer1'], activation="relu", name="layer1"))
        self.model.add(Dense(PARAM['layer2'], activation="relu", name="layer2"))
        self.model.add(Dense(PARAM['layer3'], activation="relu", name="layer3"))
        self.model.add(Dense(1, activation="sigmoid"))
        self.model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
        self.model_history = self.model.fit(self.X_train, self.Y_train, epochs=PARAM['epochs'], verbose=1)
        self.model_score = self.model.evaluate(self.X_test, self.Y_test, verbose=0)
    def save_model(self):
        self.model_name = f'{self.basename}.model'
        #with open(self.model_name, 'wb') as f:
        #    pickle.dump(self.model, f)
        self.model.save(self.model_name)
    def save(self):
        self.save_scaler()
        self.save_model()
    def __init__(self, basename):
        self.basename = basename
        self.csv_name = f'{basename}.csv'
        self.read_data()
        self.clean_data()
        self.split_data()
        self.scale_data()
        self.fit_model()

m = Model('Sacramento')
print(m.model_score)
m.save()
m = Model('SantaRosa')
print(m.model_score)
m.save()
m = Model('Napa')
print(m.model_score)
m.save()