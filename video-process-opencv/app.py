#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
Script para a classificação de vídeos utilizando os pesos do retreino
feito para identificar gestos de Libras
'''

import cv2 as cv

import numpy as np

from keras.models import load_model
from keras.applications.mobilenet import preprocess_input

model = load_model('weights/results_ican.h5')

CLASSES = ['Amigo', 'Desculpa', 'Telefone']


def classify(img_file):
    r = model.predict(prepare_image(img_file))
    return CLASSES[np.argmax(r)]


def prepare_image(arr):
    arr = cv.resize(arr, (224, 224))
    img_array_expanded_dims = np.expand_dims(arr, axis=0)
    return preprocess_input(img_array_expanded_dims)

video = cv.VideoCapture(0) 

while True:
    ret, frame = video.read()
    
    c = classify(frame)
    
    frame = cv.putText(frame, c, (10, 40), cv.FONT_HERSHEY_COMPLEX, 1, 128)
    cv.imshow('Video de classificação', frame)
    
    if cv.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
cv.destroyAllWindows()

