import json
import os
import re
import sqlite3
import sys


def writeToDB ():

    # Manejo de DB
    try:
        conn = sqlite3.connect('../trobify.db')
        cursor = conn.cursor()
        print("Opened database successfully")

        # primary key (Propietario, Id),
        # [Id] integer primary key,
        # unique (Propietario, Id, Nombre, Direccion, Descripcion),
        cursor.execute('''CREATE TABLE IF NOT EXISTS PropiedadProvi (
			[propiedad_id] INTEGER PRIMARY KEY AUTOINCREMENT,
            [Servicios0] text not null, 
            [Servicios1] text not null, 
            [Servicios2] text not null, 
            [Datos0] text not null, 
            [Datos1] text not null, 
            [Datos2] text not null, 
            [Condicion] text not null, 
            [Calles] text not null, 
            [Referencias] text not null, 
            [Dirrecion] text not null)''') 


    except sqlite3.Error as error:
        conn.close()
        raise Exception("Failed inserting data into SQL table: {}".format(error))

    finally:
        conn.close()
        print("SQL connection is closed")
        
writeToDB()     