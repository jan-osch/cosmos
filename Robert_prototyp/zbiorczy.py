'''Plik zbiorczy - laczy razem dzialania po stronie serwera.

(Klient: uzytkownik wpisuje dane w plik interfejs.py.
Powstaje plik dane_wejsciowe.json zawierajacy wektory)

Serwer:
1. Wczytuje plik jsona z wektorami wejsciowymi.
2. Oblicza co trzeba (tutaj z pliku regresja.py; dopasowanie linii do danych)
3. Zamienia etapy obliczen na postac, ktora uda sie wyrenderowac w MathJaxie
(wersja_tekstowa.py)
4. Odsyla uzytkownikowi plik wynik_mathjax.txt

(Klient: uzytkownikowi wyswietla sie postac tekstowa w MathJaxie)'''

import json
from wersja_tekstowa import *
from regresja import *

# Odczytanie jsona
with open('dane_wejsciowe.json') as json_dane:
    dane_wejsciowe = json.load(json_dane)

# Etap obliczeniowy
my_regression = Regression(dane_wejsciowe[0], dane_wejsciowe[1])
regression_result = my_regression.fit()
print(regression_result)

# Etap konwersji na tekst
mathjax = FitMathjax(regression_result)
regresja_txt = mathjax.create()

# Zapis do pliku
with open('wynik_mathjax.txt', 'w') as outfile:
    json.dump(regresja_txt, outfile, sort_keys = False, indent = 4,
    ensure_ascii=False)
    #JANUSZ: Generalnie JSON powinien wyglądać trochę inaczej
