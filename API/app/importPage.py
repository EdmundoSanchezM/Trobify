from bs4 import BeautifulSoup
from datetime import datetime
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from writeToDB import writePageToDB

urlStart = "https://century21mexico.com/busqueda/tipo_casa/operacion_"
try:
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    # Utilizamos Selenium y Webdriver para obtener la información de propiedades
    #driver = webdriver.Chrome(ChromeDriverManager().install())
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
    print ("Web driver succesfully opened")
except Exception as e:
    print (e)
    exit (0)
    
'''for i in range(1, 50):
    url = urlStart + "venta/pagina_" + str(i)
    driver.get(url)
    print ("Checking URL " + url + " ....")
    # page_source captura la página después de haber sido renderizada totalmente 
    propiedadesInfo = BeautifulSoup(driver.page_source, features='lxml')
    writePageToDB (propiedadesInfo)'''
    
for i in range(1, 50):
    url = urlStart + "renta/pagina_" + str(i)
    driver.get(url)
    print ("Checking URL " + url + " ....")
    # page_source captura la página después de haber sido renderizada totalmente 
    propiedadesInfo = BeautifulSoup(driver.page_source, features='lxml')
    writePageToDB (propiedadesInfo)

obj_now = datetime.now ()
print (obj_now)
print ("Done!")
driver.quit()