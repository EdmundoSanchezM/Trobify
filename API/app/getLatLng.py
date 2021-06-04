import requests
import urllib.parse
from bs4 import BeautifulSoup
from geopy.geocoders import Nominatim

def parseCoord (coord):
    start = 0
    for i in range(0, len(coord)):
        if coord[i].isnumeric () or coord[i] == '-' :
            start = i
            break

    coordAsStr = coord[start: - 1].split (", ")
    coords = (float (coordAsStr[0]), float (coordAsStr[1]))
    return coords

def parseAddr (address):
    A = address
    B = A.split (',')
    finale = str ()
    
    for i in B:
        finale = finale + i.strip () + ", "
    
    return finale[:-3]

def getAddress (url):
    response = requests.get (url)
    soup = BeautifulSoup(response.text, 'lxml')

    address = str ()
    highFives = soup.find_all ('h5', attrs={'class':'card-title'})
    for i in highFives:
        if i.text == 'Ubicación':
            address = i.next_sibling.text
            break

    address = parseAddr (address)

    try:
        coord = soup.find('img', attrs={'class':'img-static-map'})['onclick']
        coord = parseCoord (coord)
        return (address, coord)
    except:
        try:
            print (address, ": No coordinates found, will attempt to find coordinates through address...")
            geolocator = Nominatim(user_agent="trobify")
            location = geolocator.geocode(address)
            coord = (float (location.latitude), float (location.longitude))
            print (address, ": Coordinates found")
            return (address, coord)
        except:
            print (address, ": Couldn't find coordinates, entry will be ignored")
            return None

addr = getAddress ("https://century21mexico.com/propiedad/402980_casa-en-venta-en-bosque-de-echegaray-naucalpan-estado-de-mexico-mexico")
print (addr)
print (addr[1][0])