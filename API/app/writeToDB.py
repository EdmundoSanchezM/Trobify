import json
import os
import pandas as pds
import re
import requests
import sqlite3
import sys
from bs4 import BeautifulSoup
from getLatLng import getAddress

# Función para guardar la información en un archivo JSON
def printToJson (cardList):
    f = open ("cardList.json", "w")
    try:
        jsonFile = json.dumps (cardList)
        f.write (jsonFile)
        print ("JSON saved successfully")
    except:
        print ("Couldn't save to JSON")

    f.close ()

# Función para mostrar en consola el valor de cada tarjeta de propiedad
def printToFile (card):

    # Se cambiará la salida estándar, almacenamos el
    # valor original para poder restaurarlo posteriormente
    original_stdout = sys.stdout
    
    f = open("a.txt", "a")
    try:
        sys.stdout = f # Cambiar la salida estándar hacia el archivo creado
        print (card.prettify ())
        print ("\n-----------------------\n")
    except:
        sys.stdout = original_stdout # Revertir la salida estándar a su valor original
        print ("Couldn't write to file")

    sys.stdout = original_stdout # Revertir la salida estándar a su valor original
    f.close ()

def parseToString (propertyInfo, it):
    string = propertyInfo[it].text
    j = int ()
    for i in string:
        if i.isdigit () is True:
            j = j + 1
        else:
            break
    if j == 0:
        return int ()

    string = string[:j]
    return string

def parsePrice (price):
    res = str ()
    for i in price:
        if i.isnumeric ():
            res = res + i

    return res

def getCardInfo (card):
    # Diccionario para guardar información de una propiedad
    cardInfo = {}

    # Información sobre el estado de la propiedad: venta o renta.
    # Debe estar definido en el título, o toma el valor "propiedad" por defecto
    title = card.h5.text
    if re.search ('renta', title, re.IGNORECASE):
        cardInfo["title"] = str ("renta")
    elif re.search ('venta', title, re.IGNORECASE):
        cardInfo["title"] = str ("venta")
    else:
        cardInfo["title"] = str ("propiedad")
    
    # Información sobre la dirección de la propiedad.
    # Toma el valor "None" por defecto
    try:
        cardInfo["address"] = str (card.h5.next_sibling.text)
    except:
        cardInfo["address"] = None

    # Obtención de atributos de una propiedad: 
    # área de terreno y construcción, habitaciones
    # baños, estacionamiento y descripción
    propertyInfo = card.find (class_='card-subtitle my-2 text-muted text-truncate small').find_all ("span")

    # Obtención del enlace de la propiedad
    cardInfo["link"] = "https://century21mexico.com" + str (card.a['href'])

    cardInfo["terrainArea"] = parseToString (propertyInfo, 0)
    cardInfo["constructionArea"] = parseToString (propertyInfo, 1)
    cardInfo["rooms"] = parseToString(propertyInfo, 2)
    cardInfo["bathrooms"] = parseToString(propertyInfo, 3)
    cardInfo["parkings"] = parseToString(propertyInfo, 4)
    cardInfo["description"] = str (card.p.text)
    return cardInfo

############# Main Main Main Main Main Main #############

def writePageToDB (propiedadesInfo):
    # Búsqueda de la información con Beautiful Soup
    body = propiedadesInfo.body
    section = body.header.next_sibling
    rows = section.div.div
    cardSection = rows.find (class_='col-12 col-md-11 mx-auto mt-5')
    cards = cardSection.find_all (class_='col-xl-6')

    # Arreglo que almacena la información de todas las tarjetas de propiedad
    cardsList = []
    imgDict = {}

    for i in cards:
        # Ubicar la tarjeta de propiedad y almacenarla como objeto
        card = i.find (class_='row m-0').find (class_='col-sm-8 pt-2 px-2 pb-0')
        cardInfo = getCardInfo (card)

        imgUrl = i.find (class_='image-gallery-image')['src']
        try:
            img = requests.get (imgUrl).content
            if not img[:4] == b'\xff\xd8\xff\xe0':
                raise Exception ("File not supported")
        except Exception as e:
            print (imgUrl, ": Error retrieiving thumbnail --", e)
            img = None
        finally:
            imgDict[cardInfo["link"]] = img

        cardPriceInfo = i.find (class_='card-footer p-0 border-0 bg-transparent').find ('h5').text
        cardInfo["price"] = str (parsePrice (cardPriceInfo))
        cardsList.append (cardInfo)

    # Con el diccionario listo, se crea un archivo JSON
    printToJson (cardsList)

    # Lectura de JSON
    try: 
        data = pds.read_json ("cardList.json").convert_dtypes ()
        data["price"] = data["price"].astype (str)
        print ("JSON successfully opened")
    except:
        raise Exception("Couldn't open JSON")
    finally:
        os.remove("cardList.json")

    # Manejo de DB
    try:
        conn = sqlite3.connect('../trobify.db')
        cursor = conn.cursor()
        print("Opened database successfully")

        # cursor.execute (""" DROP TABLE IF EXISTS INMUEBLE; """)    
        # cursor.execute ( """ DELETE FROM USUARIOS WHERE Correo="century21.realestate@century21.com"; """)

        '''try:
            with open ('c21.jpg', 'rb') as file:
                binaryData = file.read ()
            query = """ INSERT OR IGNORE INTO USUARIOS (Nombre, Apellido, Correo, Numero, Contraseña, Tipo, Imagen)
                VALUES (?,?,?,?,?,?,?) """
            cursor.execute (query, ("Century 21", "Real Estate LLC", "century21.realestate@century21.com", "5591827346", "Xx_c3n7uRy_21_Yy", 2, binaryData))
            conn.commit ()
        except sqlite3.Error as error1:
            #print("Failed inserting data into USUARIOS table: {}".format(error1))
            raise Exception("Failed inserting data into USUARIOS table: {}".format(error1))'''

        # primary key (Propietario, Id),
        # [Id] integer primary key,
        # unique (Propietario, Id, Nombre, Direccion, Descripcion),
        cursor.execute('''CREATE TABLE IF NOT EXISTS INMUEBLE (
                [Propietario] text not null,
                [Nombre] text not null,
                [Direccion] text not null,
                [Latitud] real not null,
                [Longitud] real not null,
                [Terreno] text not null,
                [Construccion] text not null,
                [NumHabitacion] integer not null,
                [NumSanitario] integer not null,
                [NumEstacionamiento] integer not null,
                [Descripcion] text not null,
                [Precio] text default 0,
                [Imagen] blob default null,
                
                unique (Propietario, Latitud, Longitud),
                constraint fk_Propietario
                    FOREIGN KEY (Propietario)
                    REFERENCES USUARIOS (Correo)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
                )''')

        cursor.execute('''CREATE TABLE IF NOT EXISTS CITAS (
                [Solicitante] text not null,
                [Latitud] real not null,
                [Longitud] real not null,
                [Fecha_hora] text not null,
                
                unique (Solicitante, Latitud, Longitud),
                constraint fk_Solicitante
                    FOREIGN KEY (Solicitante)
                    REFERENCES USUARIOS (Correo)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
                )''')

        query = """ INSERT OR IGNORE INTO INMUEBLE (Propietario, Nombre, Direccion, Latitud, Longitud, Terreno, Construccion, NumHabitacion, NumSanitario,
                                            NumEstacionamiento, Descripcion, Precio, Imagen) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) """

        # l[0] = Nombre
        # l[1] = Direccion
        # l[2] = Url
        # l[3] = Terreno
        # l[4] = Construccion
        # l[5] = Habitaciones
        # l[6] = Sanitarios
        # l[7] = Estacionamiento
        # l[8] = Descripcion
        # l[9] = Precio
        # l[10] = Imagen
        for row in data.index:
            l = []
            for col in data.columns:
                l.append (data[col][row])

            address = getAddress (l[2])

            if address != None:
                cursor.execute (query, ("century21.realestate@century21.com", l[0], address[0], address[1][0], address[1][1], int(l[3]), int(l[4]), int(l[5]), int(l[6]), int(l[7]), l[8], l[9], imgDict[l[2]]))
                conn.commit ()

        # cursor.execute ( """ DELETE FROM INMUEBLE WHERE Id is NULL; """)
        # conn.commit ()

    except sqlite3.Error as error:
        conn.close()
        raise Exception("Failed inserting data into SQL table: {}".format(error))

    finally:
        conn.close()
        print("SQL connection is closed")