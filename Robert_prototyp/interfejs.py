import json

#Funkcja pomocnicza do przyjmowania danych do wektora
def to_vector():
    #JANUSZ: podoba mi się jak mieszasz polski z angielskim
    wektor = []
    while True:
        do_wektora = str(input("Podaj wartości y.\
                           wciśnij inny klawisz, żeby zakończyć "))
        for char in do_wektora:
            if char not in '0123456789,.':
                print("Zakończono działanie!")
                return wektor

        if do_wektora.count(',') > 1 or do_wektora.count('.') > 1:
            print("Za dużo znaków interpunkcyjnych!")

        elif do_wektora.count(',') == 1 and do_wektora.count('.') == 1:
            print("Usuń jeden przecinek lub kropkę!")

        elif do_wektora.count(',') == 1:
            do_wektora = float(do_wektora.replace(',','.'))
            wektor.append(do_wektora)

        elif do_wektora.count('.') == 1:
            do_wektora = float(do_wektora)
            wektor.append(do_wektora)

        else:
            do_wektora = int(do_wektora)
            wektor.append(do_wektora)


#Okno, w którym podaje się dane do zadania
class Interface(object):

    def __init__(self):
        self.element_number = 1
        self.wyraz_wolny_exists = True
        self.x = None
        self.y = None

    #Pytanie o liczbę zmiennych
    def liczba_zmiennych(self):
        while True:
            element_number = int(input("Ile zmiennych x jest w zadaniu? "))
            if element_number < 10:
                self.element_number = element_number
                return self.element_numberss #JANUSZ: tutaj chyba powinno być self.element_number
            else: print("To trochę za dużo, na pewno jest mniej!")

    #Pytanie o występowanie wyrazu wolnego
    def wyraz_wolny(self):
        while True:
            wyraz_wolny = input("Czy w zadaniu jest wyraz wolny? Naciśnij y lub n. ")
            if wyraz_wolny == 'y':
                wyraz_wolny_exists = True
                break
            elif wyraz_wolny == 'n':
                wyraz_wolny_exists = False
                break
            else:
                print("Zła wartość!")

    #Pytanie o liczbę obliczeń
    def rodzaj_regresji(self):
        while True:
            regr_type = input("Jaki chcesz rodzaj regresji? Naciśnij klawisz:"
                          "1 - parametry, oceny błędów, testy jakości"
                          "2 - parametry, oceny błędów"
                          "3 - parametry ")
            if regr_type in ['1','2','3']:
                break #JANUSZ: wydaje mi się że nie zwracasz tutaj wartości
            else: print("Zła wartość!")

    #Wprowadzanie wektora y
    def wprowadz_y(self):
        y = to_vector()
        return y

    #Wprowadzanie wektora x
    def wprowadz_x(self):
        x = []
        for i in range(self.element_number):
            x[i] = to_vector()
        return x

    # Zamiana na jsona
    def convert_to_json(self):
        with open('dane_wejsciowe.json', 'w') as outfile:
            json.dump([self.y, self.x], outfile)
            #JANUSZ: Generalnie JSON powinien wyglądać trochę inaczej
