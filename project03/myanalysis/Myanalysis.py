import pandas as pd
from config.settings import DATA_DIRS


class Co2:
    # c1 -> 개선 활동
    def c1(self,ind):
        df = pd.read_csv(DATA_DIRS[0]+'\\sorting.csv', encoding='cp949');
        df2 = df[['industry','act','money','deco2']]
        df3 = df2[df2['industry'] == ind]

        result = df3['act'].tolist()
        return result

    # c2 -> 산업명
    def c2(self,ind):
        df = pd.read_csv(DATA_DIRS[0]+'\\sorting.csv', encoding='cp949');
        df2 = df[['sort','industry']]
        df3 = df2[df2['industry'] == ind]

        result = df3['sort'].tolist()
        return result

    # c3 -> 절감액
    def c3(self,ind):
        df = pd.read_csv(DATA_DIRS[0]+'\\sorting.csv', encoding='cp949');
        df2 = df[['industry','money']]
        df3 = df2[df2['industry'] == ind]

        result = df3['money'].tolist()
        return result

    # c4 -> 감축량
    def c4(self,ind):
        df = pd.read_csv(DATA_DIRS[0]+'\\sorting.csv', encoding='cp949');
        df2 = df[['industry','deco2']]
        df3 = df2[df2['industry'] == ind]

        result = df3['deco2'].tolist()
        return result

if __name__ == '__main__':
    print(Co2().c1('manufacture'))
    print(Co2().c3('manufacture'))


