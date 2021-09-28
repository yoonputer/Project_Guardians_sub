import pandas as pd
from config.settings import DATA_DIRS


class Co2:
    def c1(self,ind):

        df = pd.read_csv(DATA_DIRS[0]+'\\sorting.csv', encoding='cp949');

        df2 = df[['industry','act','money','deco2']]

        df3 = df2[df2['industry'] == ind]
        print(df3)
        result = df3['act'].tolist()
        return result


if __name__ == '__main__':
    Co2().c1('manufacture')
    print(Co2().c1('manufacture'))


