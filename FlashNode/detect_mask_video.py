from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from imutils.video import VideoStream
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import AveragePooling2D
from tensorflow.keras.layers import Dropout
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import Input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.utils import to_categorical
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
import numpy as np
import imutils
import time
import cv2
import os

from tensorflow.python.framework.ops import container

#This fuctions detects people with mask and no mask 
#Following program inlclude prewritten part like accuracy filter
def detectmask(frame, capface, capmask):

	(height, width) = frame.shape[:2]
	container = cv2.dnn.blobFromImage(frame, 1.0, (250, 250),
		(104.0, 177.0, 123.0))

	# container will go through all and get face detections
	capface.setInput(container)
	detections = capface.forward()
	print(detections.shape)


	totalface = []
	locations = []
	counts = []

	# loop over the detections
	for i in range(0, detections.shape[2]):
		
		accuracy = detections[0, 0, i, 2]

		# remove low accuracy detections
		if accuracy > 0.5:
			
			boundary = detections[0, 0, i, 3:7] * np.array([width, height, width, height])
			(X1, Y1, X2, Y2) = boundary.astype("int")

			
			(X1, Y1) = (max(0, X1), max(0, Y1))
			(X2, Y2) = (min(width - 1, X2), min(height - 1, Y2))

			# convert BGR to RGB
			face = frame[Y1:Y2, X1:X2]
			face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
			face = cv2.resize(face, (224, 224))
			face = img_to_array(face)
			face = preprocess_input(face)

			
			totalface.append(face)
			locations.append((X1, Y1, X2, Y2))

	# if only one face is detected
	if len(totalface) > 0:
		totalface = np.array(totalface, dtype="float32")
		counts = capmask.predict(totalface, batch_size=32)

	return (locations, counts)

# using a prewritten script that is face detector model from local storage
prototxtPath = r"face_detection\deploy.prototxt"
weightsPath = r"face_detection\res10_300x300_ssd_iter_140000.caffemodel"
capface = cv2.dnn.readNet(prototxtPath, weightsPath)

# load the the script from local storage
capmask = load_model("mask_detector.model")

# video capturing
print("starting capturing faces")
vs = VideoStream(src=0).start()

while True:
	frame = vs.read()
	frame = imutils.resize(frame, width=400)

	# detect face
	(locations, counts) = detectmask(frame, capface, capmask)

	for (boundary, count) in zip(locations, counts):
		(X1, Y1, X2, Y2) = boundary
		(mask, withoutMask) = count

		header = "Mask" if mask > withoutMask else "No Mask get a mask stupid do you wanna get infected"
		

		header = "{}: {:.2f}%".format(header, max(mask, withoutMask) * 100)

		color = (0, 255, 0) if header == "Mask" else (0, 0, 255)

		# frame
		cv2.putText(frame, header, (X1, Y1 - 10),
		cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
		#creating rectangular face detecter
		cv2.rectangle(frame, (X1, Y1), (X2, Y2), color, 2)

	# display
	cv2.imshow("Detector", frame)
	key = cv2.waitKey(1) & 0xFF

	# for closing the applications
	if key == ord("q"):
		break

cv2.destroyAllWindows()
vs.stop()