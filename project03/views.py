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

def way(request):
	ind = request.GET['ind'];
	sido = request.GET['sido'];
	elec = request.GET['elec'];
	tree = request.GET['tree'];
	co2 = request.GET['co2'];
	data = Co2().c1(ind);
	context = {
		'msg': data[0],
		'msg1': tips.tip4[1],
		'msg2': tips.tip4[2],
		'msg3': tips.tip4[3],
	};
	return render(request, 'calc2.html', context);
def way(request):
	ind = request.GET['ind'];
	sido = request.GET['sido'];
	elec = request.GET['elec'];
	tree = request.GET['tree'];
	co2 = request.GET['co2'];
	data = Co2().c1(ind);
	context = {
		'msg': data[0],
		'msg1': tips.tip4[1],
		'msg2': tips.tip4[2],
		'msg3': tips.tip4[3],
	};
	return render(request, 'calc2.html', context);
#
# logger = logging.getLogger('users');
#
# logger.debug('user id:'+id)
