from tkinter import *
from PIL import ImageTk, Image
from tkinter import filedialog
import attendance
import os
import whiteboard
import shutil
import webbrowser

root = Tk()

#root.overrideredirect(1)
root.title("BytesBrain")
root.geometry("600x500")

c=Canvas(root,height=80, width=600, bg="black")
l = Label(root, text = "BytesBrain")
l.config(font =("Courier", 20,"bold"))

def put_label(text):
    label = Label(root, text=text)
    label.config(font=("",10,"bold","italic"),bg="yellow")
    label.place(x=180,y=420)
    root.after(2000,destroy_widget, label) 

# destroy the widget
def destroy_widget(widget):
    widget.destroy()

def show_img():
    x = "app.jpg"
    img = Image.open(x)
    img = img.resize((250, 250), Image.ANTIALIAS)
    img = ImageTk.PhotoImage(img) 
    panel = Label(root, image=img)
    panel.image = img
    panel.pack()

def download_attendance():
    if 'attendance.csv' in os.listdir():
        src = r"C:\Users\Hp\Desktop\project\attendance.csv"
        dst = r"C:\Users\Hp\Desktop\attendance.csv"
        shutil.copyfile(src,dst)
        os.remove("attendance.csv")
        put_label("ATTENDANCE DOWNLOADED")

    else:
        put_label("ATTENDANCE NOT TAKEN")   

def take_quiz():
    webbrowser.open("https://quizizz.com/admin")


def browseFiles():
    filename = filedialog.askopenfilename(initialdir = "/",
                                        title = "Select a File",
                                        filetypes = (("Text files",
                                                        "*.txt*"),
                                                       ("all files",
                                                        "*.*")))
    # finding picture name
    if filename != "":
        pic_name = ""
        for ch in filename[::-1]:
            if ch =="/":
                break
            pic_name = pic_name+ch

        pic_name = pic_name[::-1]
        #finding picture extension
        ext = os.path.splitext(pic_name)[1]
        src = filename
        dst = r"images\pic_name"+ext
        shutil.copyfile(src,dst)
        put_label("image uploaded")

    
def whiteboard_open():
    whiteboard.run()
    put_label("WHITEBOARD CLOSED")

def take_attendance():
    attendance.run()
    put_label("ATTENDANCE WINDOW CLOSED")

button1 = Button(root,
                   text="QUIT", 
                   command=quit)

button2 = Button(root,
                   text="WHITE BOARD",
                   command=whiteboard_open)
button3 = Button(root,
                   text="ATTENDANCE",
                   command=take_attendance)

button4 = Button(root,
                   text="DOWNLOAD ATTENDANCE",
                   command=download_attendance)

button5 = Button(root,
                   text="TAKE QUIZ",
                   command=take_quiz)

button6 = Button(root,
                   text="UPLOAD PHOTO",
                   command=browseFiles)

l.pack()   # bytes brain heading
show_img()
c.place(x=0,y=400)
button1.place(x=280,y=350)  # quit button
button2.place(x=30,y=200)   # whiteboard
button3.place(x=30,y=100)   # attendance
button4.place(x=10,y=150)   # download attendance
button5.place(x=480,y=100)  # take quiz
button6.place(x=470,y=150)  # upload photo

root.mainloop()