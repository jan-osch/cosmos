import string

# Funkcja pomocnicza, zamiana macierzy do LaTeXowej
def zamien_macierz(macierz):

    lines = str(macierz).replace('[', '').replace(']', '').splitlines()
    macierz_jako_tekst = [r'\begin{bmatrix}']

    macierz_jako_tekst += [ '  ' + ' & '.join(lines[i].split()) + r'\\' if i is not len(lines)-1
    else '  ' + ' & '.join(lines[i].split())
    for i in range(len(lines))  ]


    macierz_jako_tekst +=  [r'\end{bmatrix}']
    return ''.join(macierz_jako_tekst)

#Funkcja pomocnicza, wyciąganie pojedynczych wartosci z wektora
def wez_wartosc(wektor, tekst_przed, tekst_po):
    wyciagniety_tekst = []
    for element in wektor:
        wyciagniety_tekst.append(tekst_przed + '$' + str(element) + '$' + tekst_po)
    return '\n'.join(wyciagniety_tekst)

#Funkcja pomocnicza wybierająca jedną z dwóch wartości
def jedna_z_dwoch(wektor1, wektor2, string1 = '', string2 = ''):
    wyniki_porownan = []
    for i in range(len(wektor)):
        if wektor1[i] >= wektor2[i]:
            wyniki.porownan.append('$$' + str(wektor1[i]) + '>=' + str(wektor2[i]) + '$$')
            wyniki_porownan.append(string1)
        else:
            wyniki.porownan.append('$$' + str(wektor1[i]) + '<' + str(wektor2[i]) + '$$')
            wyniki_porownan.append(string2)
    return '\n'.join(wyniki_porownan)


### Działania na regresji

class FitMathjax(object):

    def __init__(self, wyniki_obliczen):
        self.wynik_regresji = wyniki_obliczen.copy()
        print(self.wynik_regresji)


    # Zamiana elementów słownika na tekst
    def create(self):
        x_txt = zamien_macierz(self.wynik_regresji['x'])
        xt_txt = zamien_macierz(self.wynik_regresji['X_transpose'])
        y_txt = zamien_macierz(self.wynik_regresji['y'])
        xtx_txt = zamien_macierz(self.wynik_regresji['xtx'])
        xty_txt = zamien_macierz(self.wynik_regresji['xty'])
        xtx_inv_txt = zamien_macierz(self.wynik_regresji['xtx_inv'])
        parametry_txt = zamien_macierz(self.wynik_regresji['parametry'])
        parametry_opis = wez_wartosc(self.wynik_regresji['parametry'],'','')

        # Fuzja z pozostałym tekstem
        fit_text = [
        r'$$\mathbf{X} = ' + x_txt + '$$',
        r'$$\mathbf{y} = ' + y_txt + '$$',
        r'$$\mathbf{X^{T}X} = ' + xt_txt + x_txt + ' = ' + xtx_txt + '$$',
        r'$$\mathbf{\left(X^TX\right)^{-1}} = ' + xtx_inv_txt + '$$',
        r'$$\mathbf{\hat{\beta}} = \left(X^TX\right)^{-1}X^Ty = ' + xtx_inv_txt + xty_txt + ' = ' + parametry_txt + '$$'
        ]
        mathjax_form = '\n'.join(fit_text)
        return mathjax_form
