from flask import Flask, jsonify, request,redirect, url_for,send_file,render_template,make_response
import json
import sqlite3
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message

app = Flask(__name__) 
cors = CORS(app)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['CORS_HEADERS'] = 'Content-Type'

#Para enviar correos, por el momento sera mi cuenta fake xd
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'josue.sanchez.batiz.9@gmail.com'
app.config['MAIL_PASSWORD'] = 'edmundocsgo'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

def db_conexion():
    conn = None
    try:
        conn = sqlite3.connect('trobify.db')
    except sqlite3.error as e:
        print(e)
    return conn

@app.route("/") 
def home_view(): 
        return "<h1>API uWu</h1>"  

@app.route("/user/register", methods=['POST'])
def registrarUsuario():
    conn = db_conexion()
    cursor = conn.cursor()
    nombreUser = request.form['nombreUsuario']
    apellidoUser = request.form['apellidoUsuario']
    numeroUser = request.form['numeroTel']
    emailUser = request.form['emailUsuario']
    passwordUser = request.form['passUsuario']
    imageUser = request.files.get('imgUsuario', False)
    if imageUser:
        data = [nombreUser, apellidoUser, emailUser, numeroUser, passwordUser, 0, imageUser.read()]
        try:
            cursor.execute('insert into USUARIOS values(?,?,?,?,?,?,?)',(*data,))
            conn.commit()
            res = make_response(jsonify({"message": "OK"}), 200)
            sendConfimacionEmail(emailUser)
            return res
        except (sqlite3.Error, sqlite3.Warning) as e:
            res = make_response(jsonify({"message": "No oK"}), 460)#Llave primaria en uso uwu
            return res
    else:
        data = [nombreUser, apellidoUser, emailUser, numeroUser, passwordUser, 0, None]
        try:
            cursor.execute('insert into USUARIOS values(?,?,?,?,?,?,?)',(*data,))
            conn.commit()
            res = make_response(jsonify({"message": "OK"}), 200)
            sendConfimacionEmail(emailUser)
            return res
        except (sqlite3.Error, sqlite3.Warning) as e:
            res = make_response(jsonify({"message": "No oK"}), 460)#Llave primaria en uso uwu
            return res
    res = make_response(jsonify({"message": "No ok"}), 400)
    return res    

def sendConfimacionEmail(emailUser):
    msg = Message(subject="Hello",
            sender=app.config.get("MAIL_USERNAME"),
            recipients=[emailUser])
    msg.html = render_template('ConfirmationHTML.html', data=[
    {
        'name':'CANGREJO',
    }]
    )
    mail.send(msg)