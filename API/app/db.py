import sqlite3

conn = sqlite3.connect('trobify.db')
c = conn.cursor() # The database will be saved in the location where your 'py' file is saved

c.execute("DROP TABLE IF EXISTS USUARIOS")
c.execute('''CREATE TABLE USUARIOS(
            [Nombre] text not null, 
            [Apellido] text not null, 
            [Correo] text primary key not null, 
            [Numero] text not null, 
            [Contraseña] text not null, 
            [Tipo] integer default 0 not null, 
            [Imagen] blob)''')        
                 
conn.close()