![](https://www.paho.org/sites/default/files/styles/flexslider_full/public/2021-01/covid-19-vaccination-1500-991-2.jpg?h=33d2e14c&itok=Oyhv-gky)

## HealthTech Project - COVID-19 Vaccine Tracker and Medical FAQ

Based on the daily struggles of constantly looking for COVID Vaccine Appointments and wasting a sustantial amount of time, this project aims to cut that time and do that job automatically. The user will just have to enter their information and the system will display the available slots as of right now to the user and will also notify in future when more slots become available gradually.

In addition to that, this project also aims to simplify the process of getting information related to COVID Vaccine and its side effects, if any. A substantial amount of population have faced a side effect or two, and in some cases, the patient really needs some information but they're unable to step outside to go to a doctor. Hence, this project aims to connect People and Doctors in a proper manner. A user can see the FAQ and ask a question if his question isn't listed, and the Doctor will be able to answer those questions, and they will be shown to the existing FAQ section later on.

## Instructions
Steps to Replicate the code on your own system.

### Step 1
#### Install Python3.9

### Step 2
#### Clone this repository
`git clone https://github.com/diamondzxd/CIS-HACK`
`cd CIS-HACK/project`

### Step 3
#### Install virtual env and create a virtual environment
We will use virtual environment so that installing packages is simple for the user and doesn't installs globally.

`pip install virtualenv`<br/>
`virtualenv project --python=python3`<br/>

### Step 4
#### Starting the Virtual Environment and Installing the Required Pakcages

`Scripts\activate`<br/>
`pip install -r requirements.txt`<br/>



### Step 5
#### Running the Server

`python manage.py runserver`

This will create a test server on the http://127.0.0.1:8000 URL.


The Project is made on Django framework with the base python, that means is fully supports Python code in the backend, so it will be easy to expand this project further in the future, for example if we have to add SMS sending compatibility, we can just do it from the automated Python scripts.
The user data is stored in an SQLite db, but fully supports other types of Database servers as well, the settings need to be changed in the Django's settings.py file.


Additionally, this project fetches the live Vaccination slots data from the COWIN API Setu's Web API in the form of JSON and parses them to the user.

For the FAQ section, the user can see the existing questions, and if they don't see their relevant question, they can simply click the button of add a question and a form will appear. This part is done using Jquery Show() and Hide() functions, making the transition experience for user, seamless.
