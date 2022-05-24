import sys
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

OPTION = {
    'Sacramento',
    'Napa',
    'SantaRosa'
}

