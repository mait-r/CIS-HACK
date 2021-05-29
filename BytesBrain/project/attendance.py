# FACE RECOGNITION + ATTENDANCE 

import cv2 
import numpy as np
import face_recognition
import os 
from datetime import datetime


def run():
	# function to find encodings of known students
	def find_encodings(images):
		encodings = []
		for image in images:
			#image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
			imgencodings = face_recognition.face_encodings(image)[0]
			encodings.append(imgencodings)
		return encodings

	# markattendance on name
	def markattendance(name):
		if name not in namelist:
			with open("attendance.csv","a") as f:
				now = datetime.now()
				dtString = now.strftime("%H:%M:%S")
				f.writelines(f"\n{name},{dtString}")
		namelist.append(name)

	# process to find encodings of images in the "images" directory
	path  = 'images'
	images = []
	names = []
	mylist = os.listdir(path)
	for image in mylist:
		curimg = cv2.imread(f"{path}/{image}")
		images.append(curimg)
		names.append(os.path.splitext(image)[0])

	encodingsknown = find_encodings(images)

	# video capture begins
	cap = cv2.VideoCapture(1) # 0 for inbuilt camera 1 for external webcam
	namelist = [] # used to check whose attendance is done
	while True:
		_,img = cap.read()

		faceslocations = face_recognition.face_locations(img) # all face locations
		facesencodings = face_recognition.face_encodings(img) # all face encodings

		for faceencoding,facelocation in zip(facesencodings,faceslocations):
			# these compare themselves with list
			trueorfalses = face_recognition.compare_faces(encodingsknown,faceencoding) # returns [True,False,True...]
			facedistances = face_recognition.face_distance(encodingsknown,faceencoding)
			minindex = np.argmin(facedistances) # find the index of min face distance

			# compare faces
			y1,x2,y2,x1 = facelocation
			if trueorfalses[minindex]:
				# list of tuples showing y1,x2,y2,x1
				name = names[minindex]
				cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0))
				cv2.putText(img,f"{name}",(x1,y2),cv2.FONT_HERSHEY_COMPLEX,1,(0,255,0))
				markattendance(name)
			else:
				cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0)) 
				cv2.putText(img,"Unknown",(x1,y2),cv2.FONT_HERSHEY_COMPLEX,1,(0,0,255))




		cv2.imshow("webcam",img)
		k = cv2.waitKey(1) & 0xFF
		if k == ord("q"):
			print("yes")
			break

	cap.release()
	cv2.destroyAllWindows()

if __name__ == "__main__":
	run()