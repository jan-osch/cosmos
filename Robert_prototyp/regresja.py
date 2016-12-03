import numpy as np


#JANUSZ: Bardzo ładnie wszystko napisane
class Regression(object):

    def __init__(self, y, x,
                 wyraz_wolny_exists = True,
                 count_errors = True,
                 count_tests = True,
                 poziom_istotnosci = 0.05):

        '''Inicjalizuje obiekt klasy Regression.
        y to wartości zmiennej zależnej (zawsze jeden wektor),
        x to wartości zmiennej/zmiennych niezależnych,
        pozostałe atrybuty to flagi określające,
        które z możliwych wartości chcemy policzyć'''

        # Dane
        self.y = np.matrix(y).T
        self.x = np.matrix(x).T
        self.element_number = len(self.y)
        self.parameter_number = self.x.shape[1]
        self.deg_of_freedom = self.element_number - self.parameter_number
        self.poziom_istotnosci = poziom_istotnosci

        # Flagi
        self.wyraz_wolny_exists = wyraz_wolny_exists
        self.count_errors = count_errors
        self.count_tests = count_tests


    def fit(self):

        # Jesli jest wyraz wolny, to x ma kolumne jedynek
        if self.wyraz_wolny_exists == True:
            self.col_of_ones = np.ones(self.element_number).T
            self.x = np.column_stack((self.col_of_ones, self.x))

        self.x_transpose = self.x.T
        self.xtx = self.x_transpose * self.x
        self.xtx_inverted = self.xtx.I
        self.xty = self.x_transpose * self.y
        self.parameters = self.xtx_inverted * self.xty

        self.results = {'x': self.x, 'y': self.y,
                'X_transpose': self.x_transpose,
                'xtx': self.xtx, 'xty': self.xty,
                'xtx_inv': self.xtx_inverted,
                'parametry': self.parameters} #JANUSZ: mało czytelnie zapisane

        return self.results



    def errors(self):

        self.fit_result = self.fit()

        self.parameters = self.fit_result['parametry']
        self.xtx_inverted = self.fit_result['xtx_inv']

        self.y_hat = self.x * self.parameters
        self.resid = self.y - self.y_hat
        self.resid_t = self.resid.T
        self.res_square_sum = np.sum(self.resid_t * self.resid)

        self.res_variance = self.res_square_sum / self.deg_of_freedom
        self.covariance_matrix = self.res_variance * self.xtx_inverted
        self.errors_squared = np.mat(np.diagonal(self.covariance_matrix)).T
        self.errors = np.sqrt(self.errors_squared)
        self.error_result = {'y_hat': self.y_hat,
                             'resid': self.resid, 'resid_t': self.resid_t,
                             'res_square_sum': self.res_square_sum,
                             'res_variance': self.res_variance, 'cov_matrix': self.covariance_matrix,
                             'err_square': self.errors_squared, 'errors': self.errors}

        self.fit_result_c = self.fit_result.copy()
        self.results = self.fit_result_c.update(self.error_result)

        return self.results




    def testing(self):

        self.error_result = self.errors()
        self.parameters = self.error_result['parametry']

        if self.poziom_istotnosci == 0.05:
            self.tablica = [12.71, 4.3, 3.18, 2.78, 2.57, 2.45, 2.36,
                    2.31, 2.26, 2.23, 2.2, 2.18, 2.16, 2.14,
                    2.13, 2.12, 2.11, 2.1, 2.09, 2.09]

        elif self.poziom_istotnosci == 0.01:
            self.tablica = [63.66, 9.92, 5.84, 4.6, 4.03, 3.71, 3.5,
                    3.36, 3.25, 3.17, 3.11, 3.05, 3.01, 2.98,
                    2.95, 2.92, 2.9, 2.88, 2.86, 2.85]

        elif self.poziom_istotnosci == 0.10:
            self.tablica = [6.31, 2.92, 2.35, 2.13, 2.02, 1.94, 1.89,
                   1.86, 1.83, 1.81, 1.8, 1.78, 1.77, 1.76,
                   1.75, 1.75, 1.74, 1.73, 1.73, 1.72]

        self.table_statistics = self.tablica[self.deg_of_freedom - 1]
        self.test_statistics = np.divide(self.parameters, self.errors)

        #Sprawdzanie istotnosci
        self.significance = []
        for i in range(self.parameter_number):
            if self.test_statistics[i] >= self.table_statistics:
                self.significance.append('Istotne')
            else:
                self.significance.append('Nieistotne')

        self.significance = np.matrix(self.significance)

        self.error_result.update({'table_stat': self.table_statistics,
                'test_stat': self.test_statistics,
                'significance': self.significance})

        return self.error_result

# Koniec definicji klasy
