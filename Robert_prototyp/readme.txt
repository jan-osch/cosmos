Hej, trochę ogólnych informacji o programie:

~~Mechanizm działania~~

pozmieniałem trochę zależności w prototypie programu. Najważniejsza zmiana to oddzielenie interfejsu od części obliczeniowej. Całość działa teraz na dwóch głównych zasadach.

1. Interfejs.py --(tworzy)--> dane_wejsciowe.json

2. Zbiorczy.py po odpaleniu tworzy następujący proces:

dane_wejsciowe.json--(trafia do)--> regresja_py--> wersja_tekstowa.py--(tworzy)--> wynik_mathjax.txt

~~Uwagi~~

Gdybyś chciał sprawdzić działanie całości dla różnych danych wejściowych, to najlepiej zmieniaj bezpośrednio plik jsona. To lista o następującej strukturze:

[[wektor y], [macierz x]]

...Każdy z wektorów składających się na macierz x jest ponadto osobną listą, zatem całość to lista 3-poziomowa. Nie mam żadnego sprawdzania poprawności na etapie ładowania jsona (bo całą walidację robi póki co interfejs.py), więc w przypadku zmiany struktury (np. dodania nowego elementu do y bez dodaniu tylu samo do x), całość się pewnie rozleci :p
Nie powinno być natomiast problemu, jeśli długość list będzie się zgadzała.

Gdybyś miał jakieś uwagi, to od razu pisz, będę wprowadzał zmiany :) póki co staram się poprawić tego byka z robieniem kropki po liczbach całkowitych (tak jakby traktowało je jak floaty - to pewnie coś w regresja.py, bo json jeszcze jest OK)