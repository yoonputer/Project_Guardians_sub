from django.shortcuts import render

# Create your views here.
from project03.myanalysis.Myanalysis import Co2


def index(request):
	return render(request, 'index.html')

def blog(request):
	return render(request, 'blog.html')

def elements(request):
	return render(request, 'elements.html')

def blog_details(request):
	return render(request, 'blog_details.html')

def calculator(request):
	return render(request, 'calculator.html')

def calc(request):
	return render(request, 'calc.html')

def calc2(request):
	return render(request, 'calc2.html')

def calc2_result(request):
	try:
		user_elec = request.GET.get('elec');
		user_co2 = request.GET.get('co2');
		user_tree = request.GET.get('tree');
		sido = request.GET.get('sido');


		ind = request.GET.get('ind');
		data = Co2().c1(ind);
		data_sorting = Co2().c2(ind);
		money = Co2().c3(ind);
		deco2 = Co2().c4(ind);
		ind_mean = Co2().graph(ind,sido)


		context = {
			'sol1': data[0],
			'sol2': data[1],
			'sol3': data[2],
			'sol4': data[3],
			'sol5': data[4],
			'sol6': data[5],
			'sol7': data[6],
			'sol8': data[7],
			'sol9': data[8],
			'sol10': data[9],
			'sort' : data_sorting[0],
			'money1': money[0],
			'money2': money[1],
			'money3': money[2],
			'money4': money[3],
			'money5': money[4],
			'money6': money[5],
			'money7': money[6],
			'money8': money[7],
			'money9': money[8],
			'money10': money[9],
			'deco1': deco2[0],
			'deco2': deco2[1],
			'deco3': deco2[2],
			'deco4': deco2[3],
			'deco5': deco2[4],
			'deco6': deco2[5],
			'deco7': deco2[6],
			'deco8': deco2[7],
			'deco9': deco2[8],
			'deco10': deco2[9],
			'user_elec' : user_elec,
			'user_co2' : user_co2,
			'user_tree' : user_tree,
			'result_sido': sido,
			'ind_elec' : ind_mean[0],
			'ind_co2' : ind_mean[1],
			'ind_tree' : ind_mean[2],
		};
	except IndexError:
		return render(request, 'calc2.html')
	except AttributeError:
		return render(request, 'calc2.html')
	return render(request, 'calc2_result.html', context);

# def way(request):
# 	ind = request.GET['ind'];
# 	sido = request.GET['sido'];
# 	elec = request.GET['elec'];
# 	tree = request.GET['tree'];
# 	co2 = request.GET['co2'];
# 	data = Co2().c1(ind);
# 	context = {
# 		'msg': data[0],
# 		'msg1':data[1],
# 		'msg2':data[2],
# 		'msg3':data[3],
# 	};
# 	return render(request, 'calc2.html', context);


#
# logger = logging.getLogger('users');
#
# logger.debug('user id:'+id)
