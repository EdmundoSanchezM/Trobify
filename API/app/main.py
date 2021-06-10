from flask import Flask, jsonify, request, redirect, url_for, send_file, render_template, make_response
import json
import sqlite3
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from base64 import b64encode

app = Flask(__name__)
cors = CORS(app)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config['CORS_HEADERS'] = 'Content-Type'

# Para enviar correos, por el momento sera mi cuenta fake xd
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
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
        data = [nombreUser, apellidoUser, emailUser,
                numeroUser, passwordUser, 0, imageUser.read()]
        try:
            cursor.execute(
                'insert into USUARIOS values(?,?,?,?,?,?,?)', (*data,))
            conn.commit()
            res = make_response(jsonify({"message": "OK"}), 201)
            sendConfimacionEmail(nombreUser, emailUser)
            return res
        except (sqlite3.Error, sqlite3.Warning) as e:
            # Llave primaria en uso uwu
            res = make_response(jsonify({"message": "No oK"}), 460)
            return res
    else:
        data = [nombreUser, apellidoUser, emailUser,
                numeroUser, passwordUser, 0, None]
        try:
            cursor.execute(
                'insert into USUARIOS values(?,?,?,?,?,?,?)', (*data,))
            conn.commit()
            res = make_response(jsonify({"message": "OK"}), 201)
            sendConfimacionEmail(nombreUser, emailUser)
            return res
        except (sqlite3.Error, sqlite3.Warning) as e:
            res = make_response(jsonify({"message": "No oK"}), 460)
            return res
    res = make_response(jsonify({"message": "No ok"}), 400)
    return res

@app.route("/user/confirmationMail", methods=['POST'])
def confirmarUsuario():
    conn = db_conexion()
    cursor = conn.cursor()
    try:
        correoConfirmar = bytes.fromhex(
            request.form['mailConfirm']).decode(encoding='utf_8') 
        data = (1, correoConfirmar)
        cursor.execute(
            'SELECT count(*) FROM USUARIOS where Correo = ?', (correoConfirmar,))
        existeMail = cursor.fetchall()
        if (len(existeMail) == 0):
            res = make_response(jsonify({"message": "No ok"}), 460)
            return res
        else:
            cursor.execute(
                'SELECT * FROM USUARIOS where Correo = ?', (correoConfirmar,))
            correoConfirmado = cursor.fetchall()
            valorTipo = 0
            for row in correoConfirmado:
                valorTipo = row[5]
            if (valorTipo != 0):
                res = make_response(jsonify({"message": "No ok"}), 461)
                return res
            else:
                try:
                    cursor.execute(
                        'update USUARIOS SET Tipo = ? where Correo = ?', data)
                    conn.commit()
                    cursor.close()
                    res = make_response(jsonify({"message": "OK"}), 200)
                    return res
                except (sqlite3.Error, sqlite3.Warning) as e:
                    # Llave primaria en uso uwu
                    res = make_response(jsonify({"message": "No ok"}), 400)
                    return res
    except:
        res = make_response(jsonify({"message": "No ok"}), 400)
        return res

@app.route("/user/login", methods=['POST'])
def iniciarSesionUsuario():
    conn = db_conexion()
    cursor = conn.cursor()
    email = request.form['correoUsuario']
    password = request.form['contraseñaUsuario']
    data = [email, password]
    try:
        cursor.execute(
            'SELECT * FROM USUARIOS where Correo = ? and Contraseña=?', (*data,))
        conn.commit()
        userConfirmado = cursor.fetchall()
        userData = dict()
        for row in userConfirmado:
            userData['nombre'] = row[0]
            userData['apellido'] = row[1]
            userData['tipo'] = row[5]
            userData['imagen'] = b64encode(row[6]).decode('utf-8')
        if(len(userData)!=0):
            return jsonify(userData),200 
        else:
            res = make_response(jsonify({"message": "No oK"}), 449)
            return res
    except (sqlite3.Error, sqlite3.Warning) as e:
        res = make_response(jsonify({"message": "No oK"}), 460)
        return res

def sendConfimacionEmail(nombreUser, emailUser):
    msg = Message(subject="Confirmacion de correo",
                  sender=app.config.get("MAIL_USERNAME"),
                  recipients=[emailUser])
    msg.html = render_template('ConfirmationHTML.html', data=[
        {
            'nombreUser': nombreUser,
            'correoUserHex': emailUser.encode(encoding='utf_8').hex()
        }]
    )
    mail.send(msg)

@app.route("/search", methods=['POST'])
def prubabusqueda():
    conn = db_conexion()
    cursor = conn.cursor()
    valor_buscar = "Ciudad De México" if ("Ciudad de México" == request.form['buscar'] )else request.form['buscar']
    print(valor_buscar)
    try:
        cursor.execute(
            'SELECT * FROM INMUEBLE ')
        conn.commit()
        inmueble = cursor.fetchall()
        inmueble_valor_match = list(filter(lambda row: row[2].find(valor_buscar) != -1, inmueble))
        datos_inmueble = ["Terreno: "+str(row[5])+" m² Hab: "+str(row[7]) for row in inmueble_valor_match]
        geoloc_inmuebe = [row[3:5] for row in inmueble_valor_match]
        dic = dict(zip(datos_inmueble, geoloc_inmuebe))
        data_json = json.dumps(dic)
        return data_json,200
    except (sqlite3.Error, sqlite3.Warning) as e:
        res = make_response(jsonify({"message": "No oK"}), 460)
        return res