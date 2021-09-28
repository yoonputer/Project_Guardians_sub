
	

	var calc = function ( target) {
	    return Math.round(target * 100)/100;
	};
	
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	var elecCo2 = 0;	//전기 Co2
	var elecTree = 0;

	var gasCo2 = 0;	//가스 co2
	var gasTree = 0;
	
	var waterCo2 = 0; // 수도 co2
	var waterTree = 0; 
	
	var oilCo2 =0; //교통 co2
	var oilTree =0; 
	
	var totalCo2 = 0;
	var totalTree = 0;
	
	var nowLevel = 1;	//1 - 전기 ~ 4- 교통
	
	var insertOk = false;
	
	var co2_total_avg;	 //전체co2평균
	var tree_total_avg;	 //전체 소나무 평균
	var co2_total; //전체 다른집 합계
	
	var co2_elec_avg;
	var co2_gas_avg;
	var co2_water_avg;
	var co2_car_avg;
	
	var saveElec_co2 = 0;
	var saveElec_price = 0;
	var saveElec_energy = 0;
	
	var saveGas_co2 = 0;
	var saveGas_price = 0;
	var saveGas_energy = 0;
	
	var saveWater_co2 = 0;
	var saveWater_price = 0;
	var saveWater_energy = 0;
	
	var saveCar_co2 = 0;
	var saveCar_price = 0;
	var saveCar_energy = 0;
	
	var resultIdx = 0;
	
	var inputok = false;
	
	
	//임시
//	totalCo2 = 31;
//	
//	co2_total_avg = 44;
//	
//	co2_elec_avg = 34.5;
//	elecCo2 = 55;
//	
//	co2_gas_avg = 7.8;
//	gasCo2 = 10.4;
//	
//	co2_water_avg = 78.1;
//	waterCo2 = 34.5;
//	
//	co2_car_avg = 45.1;
//	oilCo2 = 46;
//	
//	saveElec_co2 = 5.6;
//	saveGas_co2 = 1.4;
//	
//	saveWater_co2 = 3.3;
	
	
	$(document).ready(function(){
		
//		$('div.page1').hide();
//		$('div.page2').show();
//		$('div.step1').hide();
//		$('div.step3').show();
//		$('div#content div.page2 div.pageDiv').css('background' , "url('{% static 'assets/img/co2/page2_bg.png' %}') no-repeat");
		
		
		$('li[class^="pageMenu_level"]').click(function(){
			
			var thisLevel = $(this).prop('class').replace('pageMenu_level' , '');
			
			if($(this).find('img').prop('src').indexOf('on') == -1){
				
				$('.pageMenu_level' + nowLevel + ' img').prop('src' , $('.pageMenu_level' + nowLevel + ' img').prop('src').replace('_on' , '') );
				
				nowLevel = thisLevel;
				
				$(this).find('img').prop('src' , $(this).find('img').prop('src').replace('.png' , '_on.png')  );
				
				
				if(nowLevel == 1){
					
					$('div.subTitle div.subTitleDetail').html("ㆍ월간 사용량(권장)과 요금 중 한가지만 입력");
					$('div.subTitleName').html("전기");
					$('div.subTitleDetail2').html("ㆍ요금 입력 시 실제 사용량과 차이가 발생할 수 있습니다.");
					
					$('div.input_elec').show();
					$('div.input_gas').hide();
					$('div.input_water').hide();
					$('div.input_car').hide();
					
					printNumber('co2' , calc(elecCo2));
					printNumber('tree' , calc(elecTree));
					
					$('.prevBtn').hide();
					
				}else if(nowLevel == 2){
					
					$('div.subTitle div.subTitleDetail').html("ㆍ월간 사용량(권장)과 요금 중 한가지만 입력");
					$('div.subTitleName').html("가스");
					$('div.subTitleDetail2').html("ㆍ요금 입력 시 실제 사용량과 차이가 발생할 수 있습니다.");
					
					$('div.input_elec').hide();
					$('div.input_gas').show();
					$('div.input_water').hide();
					$('div.input_car').hide();
					
					printNumber('co2' , calc(gasCo2));
					printNumber('tree' , calc(gasTree));
					$('.prevBtn').show();
					
				}else if(nowLevel == 3){
					
					$('div.subTitle div.subTitleDetail').html("ㆍ월간 사용량(권장)과 요금 중 한가지만 입력");
					$('div.subTitleName').html("수도");
					$('div.subTitleDetail2').html("ㆍ요금 입력 시 실제 사용량과 차이가 발생할 수 있습니다.");
					
					$('div.input_elec').hide();
					$('div.input_gas').hide();
					$('div.input_water').show();
					$('div.input_car').hide();
					
					printNumber('co2' , calc(waterCo2));
					printNumber('tree' , calc(waterTree));
					
					$('.prevBtn').show();
					
				}else if(nowLevel == 4){
					
					$('div.subTitle div.subTitleDetail').html("ㆍ이동거리(권장)와 연료비 중 한가지만 입력");
					$('div.subTitleName').html("교통");
					$('div.subTitleDetail2').html("ㆍ연료비 입력 시 실제 사용량과 차이가 발생할 수 있습니다.");
					
					$('div.input_elec').hide();
					$('div.input_gas').hide();
					$('div.input_water').hide();
					$('div.input_car').show();
					
					printNumber('co2' , calc(oilCo2));
					printNumber('tree' , calc(oilTree));
					
					$('.prevBtn').show();
					
				}
				
				
			}
			
		})
		
		
		
		//전기사용량
		$('input[name="usedElec"]').bind('keyup' , function(){
			
			$('input[name="moneyElec"]').val(""); //사용량 혹은 전기요금 둘중 하나만 입력 가능
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:$(this).val(); 
			var imsiCo2 = 0;
			$(this).val( numberWithCommas($(this).val()) )
			
			if(price == 0){
				
				elecCo2 = 0;
				elecTree = 0;
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
			}else{
				
				elecCo2 =  Math.round(( price  * 0.4663 ) / 0.1) * 0.1;
				printNumber('co2' , calc(elecCo2));
				
				if(elecCo2 == 0){
					elecTree = 0;
				}else{
					elecTree = Math.round( ((price * 0.4663) / 6.6) / 0.1) * 0.1;
				}
				
				printNumber('tree' , calc(elecTree));
			}
			
			total();
			
		})
		
		//전기요금
		$('input[name="moneyElec"]').bind('keyup' , function(){
			
			$('input[name="usedElec"]').val("");
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:parseInt($(this).val());  
			var imsiCo2 = 0;
			$(this).val( numberWithCommas($(this).val()) )
			
			if(price == 0){
				
				elecCo2 = 0;
				elecTree = 0;
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
			}else{
				
				var imsiKwh = 0;	//사용량
				
				if(price > 0 && price <= 1130){
					imsiKwh = 43;
				}else if( price > 1130 && price <= 17703 ){ 
					imsiKwh = Math.round((price + 3513.33) / 106.0821);	
				}else if(price > 17703 && price <= 23239){
					imsiKwh = 200;
				}else if(price > 23239 && price <= 65764 ){
					imsiKwh = Math.round((price + 19692.84) / 213.6423);
				}else if(price > 65764 && price <= 72559){
					imsiKwh = 400;
				}else{
					imsiKwh = Math.round( (price + 55371.9) / 319.0422 )
				}
				
				elecCo2 =  Math.round(( imsiKwh  * 0.4663 ) / 0.1) * 0.1;
				printNumber('co2' , calc(elecCo2));
			
				if(elecCo2 == 0){
					elecTree = 0;
				}else{
					elecTree = Math.round(  ((imsiKwh * 0.4663) / 6.6) / 0.1) * 0.1;
				}
				
				printNumber('tree' , calc(elecTree));
				
			}
			
			
			total();
			
		})
		
		
		$('input[name="usedGas"]').bind('keyup' , function(){
			
			$('input[name="moneyGas"]').val("");
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:parseInt($(this).val());  
			var imsiCo2 = 0;
			$(this).val( numberWithCommas($(this).val()) )
			
			if(price == 0){
				
				gasCo2 = 0;
				gasTree = 0;
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
				
			}else{
				
				imsiCo2 =  Math.round((price * 2.22) / 0.1) * 0.1;
				
				if(imsiCo2 == 0){
					gasCo2 = 0;
					gasTree = 0;
					
					printNumber('co2' , 0);
					printNumber('tree' , 0);
					
					
				}else{
					
					gasCo2 = calc(imsiCo2); 
					printNumber('co2' , calc(imsiCo2));
					
					gasTree = Math.round( ( gasCo2 / 6.6) /0.1) * 0.1;
					printNumber('tree' , calc(gasTree));
					
				}
				
				
			}
			
			total();
		})
		
		$('input[name="moneyGas"]').bind('keyup' , function(){
			
			$('input[name="usedGas"]').val("");
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:parseInt($(this).val());  
			var imsiCo2 = 0;
			$(this).val( numberWithCommas($(this).val()) )
			
			if(price == 0){
				
				gasCo2 = 0;
				gasTree = 0;
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
			}else{
				
				if(price > 0 && price <= 412){
					imsiCo2 = 1;	
				}else{
					imsiCo2 =  Math.round(price  / 824.378);
				}
				
				if(imsiCo2 == 0){
					gasCo2 = 0;
					gasTree = 0;
					
					printNumber('co2' , 0);
					printNumber('tree' , 0);
					
				}else{
					
					gasCo2 = calc(Math.round((imsiCo2 * 2.22) / 0.1) * 0.1);
					printNumber('co2' , calc(gasCo2));
					
					gasTree = Math.round( ( gasCo2 / 6.6 ) / 0.1  ) * 0.1 ;
					
					printNumber('tree' , calc(gasTree));
					
				}
				
			}
			
			total();
		})
		
	
		$('input[name="usedWater"]').bind('keyup' , function(){
			$('input[name="moneyWater"]').val("");
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:parseInt($(this).val());  
			$(this).val( numberWithCommas($(this).val()) )
			
			if(price == 0){
				
				waterCo2 = 0;
				waterTree = 0;
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
				
			}else{
				
				waterCo2 = calc(Math.round( (price * 0.332) / 0.1) * 0.1);
				
				if(waterCo2 == 0){
					
					waterTree =0;
					
					printNumber('co2' , 0);
					printNumber('tree' , 0);
					
				}else{
					
					waterTree =  Math.round( ( waterCo2 / 6.6) / 0.1 ) * 0.1;
					
					printNumber('co2' , calc(waterCo2));
					printNumber('tree' , calc(waterTree ));
					
				}
			}
			
			total();
			
		});
		
		$('input[name="moneyWater"]').bind('keyup' , function(){
			$('input[name="usedWater"]').val("")
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:parseInt($(this).val());  
			$(this).val( numberWithCommas($(this).val()) )
			
			if(price == 0){
				
				waterCo2 = 0;
				waterTree = 0;
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
				
			}else{
				
				var imsiWater = 0;
				
				if(price >= 1 && price <= 330){
					imsiWater = 1;
				}else{
					imsiWater = Math.round(price / 660.4);
				}
				
				waterCo2 = calc(Math.round( (imsiWater * 0.332) / 0.1) * 0.1);
				
				
				if(waterCo2 == 0){
					
					waterTree =0;
					printNumber('co2' , 0);
					printNumber('tree' , 0);
					
				}else{
					
					waterTree =  Math.round( ( waterCo2 / 6.6) / 0.1 ) * 0.1;
					printNumber('co2' , calc(waterCo2));
					printNumber('tree' , calc(waterTree ));
					
				}
				
			}
			
			
			total();
			
		})
		
		$('input[name="oilCar"]').bind('click' , function(){
			if($('input[name="usedCar"]').val() != ''){
				$('input[name="usedCar"]').keyup();
			}else if($('input[name="moneyCar"]').val() != ''){
				$('input[name="moneyCar"]').keyup();
			}
			
		})
		
		$('input[name="usedCar"]').bind('keyup' , function(){
			$('input[name="moneyCar"]').val("");
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:parseInt($(this).val());  
			$(this).val( numberWithCommas($(this).val()) )

			var oilType = $('input[name="oilCar"]:checked').val();
			if(oilType == 3){

				oilCo2 =0;
				oilTree =0;
				
				$('input[name="usedCar"]').val("");
				$('input[name="moneyCar"]').val("");
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
			}else if(price == 0){
				
				oilCo2 =0;
				oilTree =0;
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
			}else{
				
				if(oilType == 0){	//휘발유
					oilCo2 =  calc(Math.round(((price / 8.9) * 2.148) / 0.1) * 0.1);			
				}else if(oilType == 1){ //경유
					oilCo2 =  calc(Math.round(((price / 7.6) * 2.646) / 0.1) * 0.1);
				}else if(oilType == 2){ //LPG
					oilCo2 =  calc(Math.round(((price / 7.2) * 2.93) / 0.1) * 0.1);
				}
				
				
				if(oilCo2 == 0){
					
					oilTree = 0;
					printNumber('co2' , 0);
					printNumber('tree' , 0);
					
				}else{
					
					oilTree = calc(Math.round( ( oilCo2 / 6.6) / 0.1) * 0.1 );
					
					printNumber('co2' , calc(oilCo2));
					printNumber('tree' , calc(oilTree));
					
				}
				
				
			}
			
			total();
			
		})
		
		
		$('input[name="moneyCar"]').bind('keyup' , function(){
			$('input[name="usedCar"]').val("");
			
			$(this).val( ($(this).val()).replace(/[^0-9]/g,'') );
			
			var price = $(this).val()==''?0:parseInt($(this).val());  
			$(this).val( numberWithCommas($(this).val()) )

			var oilType = $('input[name="oilCar"]:checked').val();
			
			if(oilType == 3){

				oilCo2 =0;
				oilTree =0;
				
				$('input[name="usedCar"]').val("");
				$('input[name="moneyCar"]').val("");
				
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
			}else if(price == 0){
				
				oilCo2 =0;
				oilTree =0;
				printNumber('co2' , 0);
				printNumber('tree' , 0);
				
			}else{
				
				if(oilType == 0){	//휘발유
					oilCo2 =  calc(Math.round(((price / 1827.28) * 2.148) / 0.1) * 0.1);	
				}else if(oilType == 1){ //경유
					oilCo2 = calc(Math.round(((price / 1636.86 ) * 2.646) / 0.1) * 0.1);
				}else{	//LPG
					oilCo2 = calc(Math.round( ( (price / 1051.22 ) * 2.93) / 0.1) * 0.1);
				}
				
				if(oilCo2 == 0){
					
					oilTree = 0;
					
					printNumber('co2' , 0);
					printNumber('tree' , 0);
				}else{
				
					oilTree = calc(Math.round( ( oilCo2 / 6.6) / 0.1 ) * 0.1 );
					
					printNumber('co2' , calc(oilCo2));
					printNumber('tree' , calc(oilTree));
					
				}
				
				
			}
			
			total();
			
		})
		
		$('.saveBtn').click(function(){
			
			
			if($.trim($('input[name="memberName"]').val()) == ""){
				alert('이름을 입력해주시기 바랍니다.');
				$('input[name="memberName"]').focus();
				
			}else if($('input[name="agree"]:checked').length == 0){
				alert('개인정보 수집 및 이용에 동의해주시기 바랍니다.');
				$('input[name="agree"]').focus();
				
			}else{
				var target = $('form[name="inputForm"] div.hiddenZone');
				target.html("");
				
				
				target.append('<input type="hidden" name="elecCo2" value="'+ elecCo2 +'" />');
				target.append('<input type="hidden" name="gasCo2" value="'+ gasCo2 +'" />');
				target.append('<input type="hidden" name="waterCo2" value="'+ waterCo2 +'" />');
				target.append('<input type="hidden" name="carCo2" value="'+ oilCo2 +'" />');
				
				target.append('<input type="hidden" name="elecTree" value="'+ elecTree +'" />');
				target.append('<input type="hidden" name="gasTree" value="'+ gasTree +'" />');
				target.append('<input type="hidden" name="waterTree" value="'+ waterTree +'" />');
				target.append('<input type="hidden" name="carTree" value="'+ oilTree +'" />');
				
				target.append('<input type="hidden" name="memberTotalCo2" value="'+ totalCo2 +'" />');
				target.append('<input type="hidden" name="memberTotalTree" value="'+ totalTree +'" />');
				
				var targetUrl = "/tanso/insert_data.green";
				
				if(resultIdx != 0){	//update
					targetUrl = "/tanso/update_data.green";
					
					target.append('<input type="hidden" name="resultIdx" value="'+ resultIdx +'" />');
					
				}
				
				
				var formData = $('form[name="inputForm"]').serialize().replace(/,/gi , '').replace(/%/g, '%25').replace(/%252C/gi , '');
				$.ajax({
					url : targetUrl ,
					data : formData,
					type : 'POST',
					dataType :"json",
					contentType: 'application/x-www-form-urlencoded; charset=euc-kr',
					success : function(data){
						
						
						resultIdx = data.resultIdx;
						
						co2_total_avg = parseFloat(data.avgTotalCo2)
						co2_total_tree = parseFloat(data.avgTotalTree);
						
						co2_elec_avg = data.avgElec;
						co2_gas_avg = data.avgGas;
						co2_water_avg = data.avgWater;
						co2_car_avg = data.avgCar;
						
						co2_total = co2_elec_avg + co2_gas_avg + co2_water_avg + co2_car_avg;
						
//						totalCo2 = 1077.9; //하드코딩
//						totalTree = 3;
//						elecCo2 = 14.7;
//						gasCo2 = 7.7;
//						waterCo2 = 1.8;
//						oilCo2 = 177;
						
						
						$('span.tansoTotal').html( numberWithCommas(totalCo2) + "kg" );
						$('span.step4_totalCo2').html( numberWithCommas(totalCo2) + "kg" );
						
						
						$('span.tansoOther').html( numberWithCommas(co2_total) + "kg" );
						$('span.tansoTotal_second').html( numberWithCommas(totalCo2) + "kg" );
						
						$('span.tansoTree').html( numberWithCommas( totalTree ) + " 그루" );
						$('span.step4_totalTree').html( numberWithCommas( totalTree ) + " 그루" );
						
						var targetName= $('input[name="memberName"]').val();
						
						$('span.tansoName').html( targetName );
						$('span.tansoName2').html( targetName );
						$('span.tansoName3').html( targetName );
						$('span.mailName').html( targetName )
						$('span.name').html( targetName )
						
						
						
						var overCnt = 0;
						if(co2_elec_avg < elecCo2) overCnt++;
						if(co2_gas_avg < gasCo2) overCnt++;
						if(co2_water_avg < waterCo2) overCnt++;
						if(co2_car_avg < oilCo2) overCnt++;
						
						$('.overCount').html(overCnt);
						
						
						var percent = data.avgTotalCo2Percent;
						if(percent >= 0){
							$('span.tansoPercent').html( numberWithCommas(percent) + '% 더 많이 배출');
							$('span.stpe4_tansoPercent').html( numberWithCommas(percent) + '% 더 많이 배출');
						}else{
							$('span.tansoPercent').html( numberWithCommas(Math.abs(percent)) + '% 더 적게 배출');
							$('span.stpe4_tansoPercent').html( numberWithCommas(Math.abs(percent)) + '% 더 적게 배출');
						}
						
						insertOk = true;
						$('div.page2 div.tapMenu ul li:eq(1)').click();
						
					}
					
				})
				
			}
			
		})

		
		$('.prevBtn').click(function(){
			
			if(nowLevel == 1){
				
			}else if(nowLevel == 2){
				$('.pageMenu_level1').click();
			}else if(nowLevel == 3){
				$('.pageMenu_level2').click();
			}else if(nowLevel == 4){
				$('.pageMenu_level3').click();
			}
		})
		

		$('.nextBtn').click(function(){
			
			if(nowLevel == 1){
				
				$('.pageMenu_level2').click();
				
			}else if(nowLevel == 2){
				
				$('.pageMenu_level3').click();
				
			}else if(nowLevel == 3){
				
				$('.pageMenu_level4').click();
				
			}else if(nowLevel == 4){
//				$('#topHeader ul li:eq(1)').click();
				
				if($('input[name="usedElec"]').val() =='' &&  $('input[name="moneyElec"]').val() == '' ){
					alert('전기사용량 혹은 전기요금을 입력해 주시기 바랍니다.');
					$('.pageMenu_level1').click();
				}else if($('input[name="usedGas"]').val() =='' &&  $('input[name="moneyGas"]').val() == '' ){
					alert('가스사용량 혹은 가스요금을 입력해 주시기 바랍니다.');
					$('.pageMenu_level2').click();
				}else if($('input[name="usedWater"]').val() =='' &&  $('input[name="moneyWater"]').val() == '' ){
					alert('수도사용량 혹은 수도요금을 입력해 주시기 바랍니다.');
					$('.pageMenu_level3').click();
				}else{
					inputok = true;
					$('#topHeader ul li:eq(1)').click();
				}
				
				
				
			}
			
			
		})
		
		$('div#header div#topHeader ul li').click(function(){
			
			if(!$(this).hasClass('on')){
				
				var idx = $('div#header div#topHeader ul li').index(this);
				
				if(idx == 1 && inputok == false){
					alert('계산기 입력값을 끝까지 입력해주시기 바랍니다.');
					
				}else{
					$('div#header div#topHeader ul li.on').removeClass('on');
					$(this).addClass('on');


					$('div#content > form > div[class^="page"]').hide();
					$('div#content > form > div.page' + (parseInt(idx) +1)).show();
				}
			}
			
			
		})
		
		$('div.page2 div.tapMenu ul li').click(function(){
			
			if(!$(this).hasClass('on')){
				
				var idx = $('div.page2 div.tapMenu ul li').index(this);
				if(idx == 1){	//사용량분석
					
					if(insertOk == true){
						
						var co2_total_value = calc(co2_water_avg + co2_elec_avg + co2_gas_avg + co2_car_avg);
						var co2_total_tree_new = calc(Math.round( (co2_total_value / 6.6) / 0.1 )* 0.1); 
						
						
						var co2_total_max = (co2_total_value >  totalCo2)?co2_total_value:totalCo2;
						
						//co2발생량(총합)
						var co2_total_percent = calc(Math.round(( co2_total_value / co2_total_max ) / 0.01) * 0.01);
						var my_total_percent = calc(Math.round(( totalCo2 / co2_total_max ) / 0.01) * 0.01);
//						var my_total_percent = calc(1 - co2_total_percent);
						var co2_total_cm = calc(135 * co2_total_percent);
						var my_total_cm = calc(135 * my_total_percent); 
						
						$('div.firstChart div.one').stop().html(numberWithCommas(co2_total_value) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(co2_total_cm)) + 'px' } , 400)
						$('div.firstChart div.chartOne').stop().css('height' , '0px').animate({'height' :co2_total_cm + 'px' } , 400);
						
						$('div.firstChart img.chartOne_icon').stop().css('bottom' , '55px').animate({'bottom' : (61 + parseFloat(my_total_cm)) + 'px' } , 400)
						$('div.firstChart div.two').stop().html( numberWithCommas(calc(totalCo2)) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(my_total_cm)) + 'px' } , 400)
						$('div.firstChart div.chartTwo').stop().css('height' , '0px').animate({'height' :my_total_cm + 'px' } , 400);
						
						
						//내가심어야할 소나무
						
						var tree_total_max = (co2_total_tree_new > totalTree)? co2_total_tree_new : totalTree
						
						var tree_total_percent = calc(Math.round((co2_total_tree_new / tree_total_max ) / 0.1) * 0.1);
						var myTree_total_percent = calc(Math.round((totalTree / tree_total_max ) / 0.1) * 0.1);
//						var myTree_total_percent = calc(1 - tree_total_percent);
						var tree_total_cm = calc(135 *tree_total_percent);
						var myTree_total_cm = calc(135 * myTree_total_percent);
						
						$('div.firstChart div.three').stop().html(numberWithCommas(co2_total_tree_new) + '그루').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(tree_total_cm)) + 'px' } , 400)
						$('div.firstChart div.chartThree').stop().css('height' , '0px').animate({'height' :tree_total_cm + 'px' } , 400);
						
						$('div.firstChart img.chartTwo_icon').stop().css('bottom' , '55px').animate({'bottom' : (61 + parseFloat(myTree_total_cm)) + 'px' } , 400)
						$('div.firstChart div.four').stop().html(numberWithCommas(calc(totalTree)) + '그루').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(myTree_total_cm)) + 'px' } , 400)
						$('div.firstChart div.chartFour').stop().css('height' , '0px').animate({'height' :myTree_total_cm + 'px' } , 400);
						
						
						var maxValue = Math.max( co2_elec_avg , elecCo2 , co2_gas_avg ,  gasCo2 , co2_water_avg ,   waterCo2 , co2_car_avg , oilCo2 );
						
						//전기
						var elec_total_percent = calc(Math.round((co2_elec_avg / maxValue ) / 0.01) * 0.01);
						var elec_total_cm = calc(135 *elec_total_percent);
						var myElec_total_percent = calc(Math.round((elecCo2 / maxValue ) / 0.01) * 0.01);
						var myElec_total_cm = calc(135 * myElec_total_percent);
						
						$('div#elecChart div.one').stop().html(numberWithCommas(co2_elec_avg) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(elec_total_cm)) + 'px' } , 400)
						$('div#elecChart div.chartOne').stop().css('height' , '0px').animate({'height' : elec_total_cm + 'px' } , 400);
						
						$('div#elecChart div.two').stop().html(numberWithCommas(calc(elecCo2)) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(myElec_total_cm)) + 'px' } , 400)
						$('div#elecChart div.chartTwo').stop().css('height' , '0px').animate({'height' : myElec_total_cm + 'px' } , 400);
						
						
						//가스
						var gas_total_percent = calc(Math.round((co2_gas_avg / maxValue ) / 0.01) * 0.01);
						var gas_total_cm = calc(135 *gas_total_percent);
						var myGas_total_percent = calc(Math.round((gasCo2 / maxValue ) / 0.01) * 0.01);
						var myGas_total_cm = calc(135 * myGas_total_percent);
						
						$('div#gasChart div.one').stop().html(numberWithCommas(co2_gas_avg) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(gas_total_cm)) + 'px' } , 400)
						$('div#gasChart div.chartOne').stop().css('height' , '0px').animate({'height' : gas_total_cm + 'px' } , 400);
						
						$('div#gasChart div.two').stop().html( numberWithCommas(calc(gasCo2)) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(myGas_total_cm)) + 'px' } , 400)
						$('div#gasChart div.chartTwo').stop().css('height' , '0px').animate({'height' : myGas_total_cm + 'px' } , 400);
						
						
						//수도
						var water_total_percent = calc(Math.round((co2_water_avg / maxValue ) / 0.01) * 0.01);
						var water_total_cm = calc(135 *water_total_percent);
						var myWater_total_percent = calc(Math.round((waterCo2 / maxValue ) / 0.01) * 0.01);
						var myWater_total_cm = calc(135 * myWater_total_percent);
						
						$('div#waterChart div.one').stop().html(numberWithCommas(co2_water_avg) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(water_total_cm)) + 'px' } , 400)
						$('div#waterChart div.chartOne').stop().css('height' , '0px').animate({'height' : water_total_cm + 'px' } , 400);
						
						$('div#waterChart div.two').stop().html( numberWithCommas(calc(waterCo2)) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(myWater_total_cm)) + 'px' } , 400)
						$('div#waterChart div.chartTwo').stop().css('height' , '0px').animate({'height' : myWater_total_cm + 'px' } , 400);
						
						
						//교통
						var car_total_percent = calc(Math.round((co2_car_avg / maxValue ) / 0.01) * 0.01);
						var car_total_cm = calc(135 * car_total_percent);
						var myCar_total_percent = calc(Math.round((oilCo2 / maxValue ) / 0.01) * 0.01);
						var myCar_total_cm = calc(135 * myCar_total_percent);
						
						
						$('div#carChart div.one').stop().html(numberWithCommas(co2_car_avg) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(car_total_cm)) + 'px' } , 400)
						$('div#carChart div.chartOne').stop().css('height' , '0px').animate({'height' : car_total_cm + 'px' } , 400);
						
						$('div#carChart div.two').stop().html( numberWithCommas(calc(oilCo2)) + 'kg').css('bottom' , '43px').animate({'bottom' : (43 + parseFloat(myCar_total_cm)) + 'px' } , 400)
						$('div#carChart div.chartTwo').stop().css('height' , '0px').animate({'height' : myCar_total_cm + 'px' } , 400);
						
						
						$('div#content div.page2 div.pageDiv').css('background' , "url('{% static 'assets/img/co2/page2_bg.png' %}') no-repeat")
						$('div.page2 div[class^="step"]').hide();
						$('div.page2 div[class="step2"]').show();
						
						drawChart();
						
						$('div.page2 div.tapMenu ul li.on').removeClass('on');
						$(this).addClass('on');
					}else{
						alert('나의정보를 입력하시고 저장버튼을 눌러주시기 바랍니다.');
						$('div.page2 div.tapMenu ul li:eq(0)').click();
					}
					
					
				}else if(idx == 0){
					
					$('div#content div.page2 div.pageDiv').css('background' , "url('{% static 'assets/img/co2/page2_bg.png' %}') no-repeat")
					$('div.page2 div[class^="step"]').hide();
					$('div.page2 div[class="step1"]').show();
					$('div.page2 div.tapMenu ul li.on').removeClass('on');
					$(this).addClass('on');
				}else if(idx == 2){
					
					
					if(insertOk == true){
						$('div#content div.page2 div.pageDiv').css('background' , "url('{% static 'assets/img/co2/page2_bg.png' %}') no-repeat");
						$('div.page2 div[class^="step"]').hide();
						$('div.page2 div[class="step3"]').show();
						$('div.page2 div.tapMenu ul li.on').removeClass('on');
						$(this).addClass('on');

						printStep3_chart();
						
					}else{
						alert('나의정보를 입력하시고 저장버튼을 눌러주시기 바랍니다.');
						$('div.page2 div.tapMenu ul li:eq(0)').click();
					}
					
				}else if(idx == 3){
					
					
					$('div.page2 div.step3 span.name').html( $('input[name="memberName"]').val() );
					
					
					var target_total_co2 = calc(totalCo2 - saveElec_co2 - saveGas_co2 - saveWater_co2 -  saveCar_co2   );
					if(target_total_co2 < 0) target_total_co2 = 0;
					
					//좌측 첫번째 차트
					//var avg_total = calc(co2_total_avg + totalCo2 + target_total_co2);
					var avg_total =  (co2_total_avg > totalCo2)?co2_total_avg:totalCo2;
					avg_total = (avg_total >  target_total_co2)?avg_total:target_total_co2;
					
					
					var val1_percent = calc(Math.round((co2_total / avg_total ) / 0.01) * 0.01);
					var val1_cm = calc(90 *val1_percent);
					if(val1_cm > 90) val1_cm = 90;
					
					var val2_percent = calc(Math.round((totalCo2 / avg_total ) / 0.01) * 0.01);
					var val2_cm = calc(90 *val2_percent);
					if(val2_cm > 90) val2_cm = 90;
					
					var val3_percent = calc(Math.round((target_total_co2 / avg_total ) / 0.01) * 0.01);
					var val3_cm = calc(90 *val3_percent);
					if(val3_cm > 90) val3_cm = 90;
					
					$('div.page2 div.step4 div.report_first div.one').stop().html(numberWithCommas(co2_total) + 'kg' ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(val1_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_first div.chartOne').stop().css('height' , '0px').animate({'height' :val1_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_first div.two').stop().html(numberWithCommas(totalCo2) + 'kg' ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(val2_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_first div.chartTwo').stop().css('height' , '0px').animate({'height' :val2_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_first div.three').stop().html(numberWithCommas(target_total_co2) + 'kg' ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(val3_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_first div.chartThree').stop().css('height' , '0px').animate({'height' :val3_cm + 'px' } , 400);
					
					
					
					//부문별 배출현황 및 비교
					
					var target_elec_co2 = calc(elecCo2 - saveElec_co2   );
					if(target_elec_co2 < 0) target_elec_co2 = 0;
					
//					var elec_avg_total = calc(co2_elec_avg + elecCo2 + target_elec_co2);
					var elec_avg_total = (co2_elec_avg > elecCo2)?co2_elec_avg:elecCo2;
					elec_avg_total = (elec_avg_total > target_elec_co2)?elec_avg_total:target_elec_co2;
					
					var elec_val1_percent = calc(Math.round((co2_elec_avg / elec_avg_total ) / 0.01) * 0.01);
					var elec_val1_cm = calc(50 *elec_val1_percent);
					if(elec_val1_cm > 50) elec_val1_cm = 50;
					
					var elec_val2_percent = calc(Math.round((elecCo2 / elec_avg_total ) / 0.01) * 0.01);
					var elec_val2_cm = calc(50 *elec_val2_percent);
					if(elec_val2_cm > 50) elec_val2_cm = 50;
					
					var elec_val3_percent = calc(Math.round((target_elec_co2 / elec_avg_total ) / 0.01) * 0.01);
					var elec_val3_cm = calc(50 *elec_val3_percent);
					if(elec_val3_cm > 50) elec_val3_cm = 50;
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(0) div.one').stop().html(numberWithCommas(calc(co2_elec_avg)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(elec_val1_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(0) div.chartOne').stop().css('height' , '0px').animate({'height' :elec_val1_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(0) div.two').stop().html(numberWithCommas(calc(elecCo2)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(elec_val2_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(0) div.chartTwo').stop().css('height' , '0px').animate({'height' :elec_val2_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(0) div.three').stop().html(numberWithCommas(calc(target_elec_co2)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(elec_val3_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(0) div.chartThree').stop().css('height' , '0px').animate({'height' :elec_val3_cm + 'px' } , 400);
					
					
					
					var target_gas_co2 = calc(gasCo2 - saveGas_co2   );
					if(target_gas_co2 < 0) target_gas_co2 = 0;
					
//					var gas_avg_total = calc(co2_gas_avg + gasCo2 + target_gas_co2);
					var gas_avg_total = (co2_gas_avg > gasCo2)?co2_gas_avg:gasCo2;
					gas_avg_total = (gas_avg_total > target_gas_co2)? gas_avg_total:target_gas_co2;
					
					var gas_val1_percent = calc(Math.round((co2_gas_avg / gas_avg_total ) / 0.01) * 0.01);
					var gas_val1_cm = calc(50 * gas_val1_percent);
					if(gas_val1_cm > 50) gas_val1_cm = 50;
					
					var gas_val2_percent = calc(Math.round((gasCo2 / gas_avg_total ) / 0.01) * 0.01);
					var gas_val2_cm = calc(50 *gas_val2_percent);
					if(gas_val2_cm > 50) gas_val2_cm = 50;
					
					var gas_val3_percent = calc(Math.round((target_gas_co2 / gas_avg_total ) / 0.01) * 0.01);
					var gas_val3_cm = calc(50 *gas_val3_percent);
					if(gas_val3_cm > 50) gas_val3_cm = 50;
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(1) div.one').stop().html(numberWithCommas(calc(co2_gas_avg)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(gas_val1_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(1) div.chartOne').stop().css('height' , '0px').animate({'height' :gas_val1_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(1) div.two').stop().html(numberWithCommas(calc(gasCo2)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(gas_val2_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(1) div.chartTwo').stop().css('height' , '0px').animate({'height' :gas_val2_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(1) div.three').stop().html(numberWithCommas(calc(target_gas_co2)) + "kg").css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(gas_val3_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(1) div.chartThree').stop().css('height' , '0px').animate({'height' :gas_val3_cm + 'px' } , 400);
					
					
					var target_water_co2 = calc(waterCo2 - saveWater_co2   );
					if(target_water_co2 < 0) target_water_co2 = 0;
					
//					var water_avg_total = calc(co2_water_avg + waterCo2 + target_water_co2);
					var water_avg_total = (co2_water_avg > waterCo2)? co2_water_avg : waterCo2;
					water_avg_total = (water_avg_total > target_water_co2)? water_avg_total : target_water_co2
					
					var water_val1_percent = calc(Math.round((co2_water_avg / water_avg_total ) / 0.01) * 0.01);
					var water_val1_cm = calc(50 * water_val1_percent);
					if(water_val1_cm > 50) water_val1_cm = 50;
					
					var water_val2_percent = calc(Math.round((waterCo2 / water_avg_total ) / 0.01) * 0.01);
					var water_val2_cm = calc(50 *water_val2_percent);
					if(water_val2_cm > 50) water_val2_cm = 50;
					
					var water_val3_percent = calc(Math.round((target_water_co2 / water_avg_total ) / 0.01) * 0.01);
					var water_val3_cm = calc(50 *water_val3_percent);
					if(water_val3_cm > 50) water_val3_cm = 50;
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(2) div.one').stop().html(numberWithCommas(calc(co2_water_avg)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(water_val1_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(2) div.chartOne').stop().css('height' , '0px').animate({'height' :water_val1_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(2) div.two').stop().html(numberWithCommas(calc(waterCo2)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(water_val2_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(2) div.chartTwo').stop().css('height' , '0px').animate({'height' :water_val2_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(2) div.three').stop().html(numberWithCommas(calc(target_water_co2)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(water_val3_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(2) div.chartThree').stop().css('height' , '0px').animate({'height' :water_val3_cm + 'px' } , 400);
					
					
					
					var target_car_co2 = calc(oilCo2 - saveCar_co2   );
					if(target_car_co2 < 0) target_car_co2 = 0;
					
//					var car_avg_total = calc(co2_car_avg + oilCo2 + target_car_co2);
					var car_avg_total = (co2_car_avg > oilCo2)? co2_car_avg : oilCo2;
					car_avg_total = (car_avg_total > target_car_co2)?car_avg_total:target_car_co2;
					
					var car_val1_percent = calc(Math.round((co2_car_avg / car_avg_total ) / 0.01) * 0.01);
					var car_val1_cm = calc(50 * car_val1_percent);
					if(car_val1_cm > 50) car_val1_cm = 50;
					
					var car_val2_percent = calc(Math.round((oilCo2 / car_avg_total ) / 0.01) * 0.01);
					var car_val2_cm = calc(50 *car_val2_percent);
					if(car_val2_cm > 50) car_val2_cm = 50;
					
					var car_val3_percent = calc(Math.round((target_car_co2 / car_avg_total ) / 0.01) * 0.01);
					var car_val3_cm = calc(50 *car_val3_percent);
					if(car_val3_cm > 50) car_val3_cm = 50;
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(3) div.one').stop().html(numberWithCommas(calc(co2_car_avg)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(car_val1_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(3) div.chartOne').stop().css('height' , '0px').animate({'height' :car_val1_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(3) div.two').stop().html(numberWithCommas(calc(oilCo2)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(car_val2_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(3) div.chartTwo').stop().css('height' , '0px').animate({'height' :car_val2_cm + 'px' } , 400);
					
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(3) div.three').stop().html(numberWithCommas(calc(target_car_co2)) + "kg" ).css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(car_val3_cm)) + 'px' } , 400)
					$('div.page2 div.step4 div.report_second ul.chartUl > li:eq(3) div.chartThree').stop().css('height' , '0px').animate({'height' :car_val3_cm + 'px' } , 400);
					
					$('div#content div.page2 div.pageDiv').css('background' , "url('{% static 'assets/img/co2/page2_bg.png' %}') no-repeat")
					$('div.page2 div[class^="step"]').hide();
					$('div.page2 div[class="step4"]').show();
					$('div.page2 div.tapMenu ul li.on').removeClass('on');
					$(this).addClass('on');
					
				}
				
				
				
			}
			
		})	
		
		
		
		$('div.page2 div.step2 img.nextBtn').click(function(){
			$('div.page2 div.tapMenu ul li:eq(2)').click();
		})
		
		$('div.page2 div.step3 img.prevBtn').click(function(){
			$('div.page2 div.tapMenu ul li:eq(1)').click();
		})
		
		$('div.page2 div.step3 img.nextBtn').click(function(){
			$('div.page2 div.tapMenu ul li:eq(3)').click();
		})
		
		$('div.page2 div.step4 img.prevBtn').click(function(){
			$('div.page2 div.tapMenu ul li:eq(2)').click();
		})
		
		
	
		
		
		$('div.page2 div.step3 ul.menu li').click(function(){
			if(!$(this).hasClass('on')){
				var target = $('div.page2 div.step3 ul.menu li.on img');
				target.prop('src' , target.prop('src').replace('_on' , ''));
				
				$('div.page2 div.step3 ul.menu li.on').removeClass('on');
				$(this).find('img').prop('src' , $(this).find('img').prop('src').replace('.png' , '_on.png'));
				$(this).addClass('on');
				
				$('div.page2 div.step3 div.left div[id^="step3_"]').hide();
				
				var idx = $('div.page2 div.step3 ul.menu li').index($(this));
				$('div.page2 div.step3 div.left div[id="step3_'+ (idx +1) +'"]').show();
				
				$('div.page2 div.step3 div.right div.result_sale').css('background' , "url('{% static 'assets/img/co2/step2_right_bg' %}"+ (idx +1) +".jpg') no-repeat");
				$('div.page2 div.step3 div.right div.result_bottom').css('background' , "url('{% static 'assets/img/co2/step2_right_bottom_' %}"+ (idx +1) +".jpg') no-repeat");
				
				
				var bgColor = "#8045dd";
				
				if(idx == 1){
					bgColor = "#0b409c";
				}else if(idx == 2){
					bgColor = "#2f88fc";
				}else if(idx == 3){
					bgColor = "#ff4d4d";
				}
				
				$('div.page2 div.step3 div.left div.result_middle').css('background' , bgColor);
				
				$('.target_energy').html("-");
				$('.target_co2').html("-");
				$('.target_price').html("-");
				
				printStep3_chart();
				
			}
		})
		
		
		$('div.page2 div.step3 div.left div[id^="step3"] ul li').click(function(){
			
			var level = $(this).closest('div').prop('id').replace('step3_' , '');
			
			var co2 = parseFloat($(this).find('input[name="co2"]').val());
			var energy = parseFloat($(this).find('input[name="energy"]').val());
			var price = parseFloat($(this).find('input[name="price"]').val());
			
			$('.target_energy').html( numberWithCommas(calc(energy)) )
			$('.target_co2').html( numberWithCommas(calc(co2)) )
			$('.target_price').html( numberWithCommas(calc(price)) )
			
			if($(this).hasClass('on')){
				
				if(level == 1){	//전기
					
					saveElec_co2 -= co2;
					saveElec_price -= price;
					saveElec_energy -= energy;
					
				}else if(level == 2){ //가스
					
					saveGas_co2 -= co2;
					saveGas_price -= price;
					saveGas_energy -= energy;
					
				}else if(level == 3){ //수도
					
					saveWater_co2 -= co2;
					saveWater_price -= price;
					saveWater_energy -= energy;
					
				}else if(level == 4){ //교통
					
					saveCar_co2 -= co2;
					saveCar_price -= price;
					saveCar_energy -= energy;
					
				}
				
				$(this).removeClass('on');
				
			}else{
				
				if(level == 1){	//전기
					
					saveElec_co2 += co2;
					saveElec_price += price;
					saveElec_energy += energy;
					
				}else if(level == 2){ //가스
					
					saveGas_co2 += co2;
					saveGas_price += price;
					saveGas_energy += energy;
					
				}else if(level == 3){ //수도
					
					saveWater_co2 += co2;
					saveWater_price += price;
					saveWater_energy += energy;
					
				}else if(level == 4){ //교통
					
					saveCar_co2 += co2;
					saveCar_price += price;
					saveCar_energy += energy;
					
				}
				
				$(this).addClass('on');
				
			}
		
			showStep3();
			printStep3_chart();
		})
		
		
		$('select[name="selAddress"]').bind('change' , function(){
			
			if($(this).val() != ""){
				if($(this).val() == "direct"){
					$('input[name="emailAddress"]').prop('readonly' , false).val("").focus();
				}else{
					$('input[name="emailAddress"]').prop('readonly' , true).val( $(this).val() );
					$(this).val("");
				}
				
			}
		})
		
		
		$('.sendMail').click(function(){
			
			var mailregExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
			
			var mailValue = $('input[name="emailId"]').val() + "@" + $('input[name="emailAddress"]').val();
			
			
			if($('input[name="mailAgree"]:checked').length == 0){
				alert('개인정보 수집 및 이용에 동의함을 체크해주시기 바랍니다.');
				return false;
			}else if($.trim( $('input[name="emailId"]').val() ) == ''){
				alert('이메일 아이디를 입력해주시기 바랍니다.');
				$('input[name="emailId"]').focus();
			}else if( $.trim( $('input[name="emailAddress"]').val() ) == '' ){
				alert('이메일 주소를 입력해주시기 바랍니다.');
				$('input[name="emailAddress"]').focus();
			}else if(!mailregExp.test(mailValue) ){
				alert('이메일 형식을 확인해주시기 바랍니다.');
			}else{
				saveData('mail');
			}
			
			
		})
		
		
		$('.page3').find('.tapMenu ul li').click(function(){
			var index = $(this).index();
			$('.page3').find('.tapMenu ul li').removeClass('on');
			$(this).addClass('on');

			$(this).closest('div.pageDiv').find('.contentDiv ul').hide();
			$(this).closest('div.pageDiv').find('.contentDiv ul:eq('+index+')').show();
		});
		
		$('.close').click(function(){
			$('.shadow').hide();
		})
		
		$('.closeZone').click(function(){
			$('.shadow').hide();
		})
		
		
	}) //document Ready End
	
	function printStep3_chart(){
		
		
		var idx = $('div.page2 div.step3 ul.menu li').index( $('div.page2 div.step3 ul.menu li.on'));
		
		var val1;
		var val2;
		var val3;
		
		if(idx == 0){
			
			val1 = co2_elec_avg;
			val2 = elecCo2;
			val3 = elecCo2 - saveElec_co2;
				
		}else if(idx == 1){
			
			val1 = co2_gas_avg;
			val2 = gasCo2;
			val3 = gasCo2 - saveGas_co2;
			
		}else if(idx == 2){
			
			val1 = co2_water_avg;
			val2 = waterCo2;
			val3 = waterCo2 - saveWater_co2;
			
		}else if(idx == 3){
			
			val1 = co2_car_avg;
			val2 = oilCo2;
			val3 = oilCo2 - saveCar_co2;
			
		}
		
		val2 = calc(val2);
		
		val3 = calc(val3);
		if(val3 < 0) val3 = 0;
		
		
//		var avg = calc(val1 + val2 + val3);
		var avg = (val1 > val2)?val1:val2;
		avg = (avg > val3)?avg:val3;
		
		var val1_percent = calc(Math.round((val1 / avg ) / 0.01) * 0.01);
		var val1_cm = calc(300 *val1_percent);
		if(val1_cm > 200) val1_cm = 200;
		
		
		$('div.page2 div.step3 div.right div.result_bottom div.one').stop().html(numberWithCommas(val1) + 'kg').css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(val1_cm)) + 'px' } , 400)
		$('div.page2 div.step3 div.right div.result_bottom div.chartOne').stop().css('height' , '0px').animate({'height' : val1_cm + 'px' } , 400);
		
		var val2_percent = calc(Math.round((val2 / avg ) / 0.01) * 0.01);
		var val2_cm = calc(300 *val2_percent);
		if(val2_cm > 200) val2_cm = 200;
		
		
		$('div.page2 div.step3 div.right div.result_bottom div.two').stop().html(numberWithCommas(val2) + 'kg').css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(val2_cm)) + 'px' } , 400)
		$('div.page2 div.step3 div.right div.result_bottom div.chartTwo').stop().css('height' , '0px').animate({'height' : val2_cm + 'px' } , 400);
		
		var val3_percent = calc(Math.round((val3 / avg ) / 0.01) * 0.01);
		var val3_cm = calc(300 *val3_percent);
		if(val3_cm > 200) val3_cm = 200;
		
		$('div.page2 div.step3 div.right div.result_bottom div.three').stop().html(numberWithCommas(val3) + 'kg').css('bottom' , '5px').animate({'bottom' : (5 + parseFloat(val3_cm)) + 'px' } , 400)
		$('div.page2 div.step3 div.right div.result_bottom div.chartThree').stop().css('height' , '0px').animate({'height' : val3_cm + 'px' } , 400);
		
		
	}
	
	function showStep3(){
	
		
		$('.step3_elec_1').html(numberWithCommas(calc( saveElec_co2 )));
		$('.step3_elec_2').html(numberWithCommas(calc( saveElec_price )));
		
		$('.step4_elec_1').html(numberWithCommas(calc( saveElec_co2 )));
		$('.step4_elec_2').html(numberWithCommas(calc( saveElec_price )));
		
		$('.step3_gas_1').html(numberWithCommas(calc( saveGas_co2 )));
		$('.step3_gas_2').html(numberWithCommas(calc( saveGas_price )));
		
		$('.step4_gas_1').html(numberWithCommas(calc( saveGas_co2 )));
		$('.step4_gas_2').html(numberWithCommas(calc( saveGas_price )));
		
		$('.step3_water_1').html(numberWithCommas(calc( saveWater_co2 )));
		$('.step3_water_2').html(numberWithCommas(calc( saveWater_price )));
		
		$('.step4_water_1').html(numberWithCommas(calc( saveWater_co2 )));
		$('.step4_water_2').html(numberWithCommas(calc( saveWater_price )));
		
		$('.step3_car_1').html(numberWithCommas(calc( saveCar_co2 )));
		$('.step3_car_2').html(numberWithCommas(calc( saveCar_price )));
		
		$('.step4_car_1').html(numberWithCommas(calc( saveCar_co2 )));
		$('.step4_car_2').html(numberWithCommas(calc( saveCar_price )));
		
		
		var saleTotalCo2 = calc( saveElec_co2 + saveGas_co2 + saveWater_co2 + saveCar_co2);
		var saleTotalPrice = calc( saveElec_price + saveGas_price + saveWater_price + saveCar_price  );
		
		var saleTotalTree = Math.floor( (saleTotalCo2 * 0.4663) / 6.6);
		
		$('.step3_total_1').html(numberWithCommas(saleTotalCo2));
		$('.step3_total_2').html(numberWithCommas( saleTotalPrice ));
		
		$('.step4_total_1').html(numberWithCommas(saleTotalCo2));
		$('.step4_total_2').html(numberWithCommas(saleTotalPrice));
		
		$('.page2 .step4 .saleResultCo2').html( numberWithCommas(saleTotalCo2) + 'kg'  );
		$('.page2 .step4 .saleResultPrice').html( numberWithCommas(saleTotalPrice) + '원'  );
		$('.page2 .step4 .saleResultTree').html( numberWithCommas(saleTotalTree) + '그루'  );
		
	}
	
	function printNumber(target , num){
		
		var intNum = new Array();
		var floatNum = 0;
		
		var stringNum = num.toString();
		
		if(stringNum.indexOf('.') > -1){
			
			var imsiNum = stringNum.split('.');
			floatNum = imsiNum[1];
			
			for(var i =0; i < imsiNum[0].length; i++){
				intNum.push(imsiNum[0][i]);
			}
			
		}else{
			for(var i =0; i < stringNum.length; i++){
				intNum.push(stringNum[i]);
			}
		}
		
		if(target == 'co2'){
			var start = 7 -intNum.length + 1;
			
			for(var i =1; i <= start -1 ; i++){
				$('div.inputResultZone div.co2 .num' + i).html("0").css('visibility' , 'hidden');
			}
		
			for(var i =0; i < intNum.length ; i++){
				$('div.inputResultZone div.co2 .num' + (start++)).html(intNum[i]).css('visibility' , 'visible');
			}
		
			
			$('div.inputResultZone div.co2 .num8').html(floatNum);
			
		}else if(target == 'tree'){
			var start = 7 -intNum.length + 1;
			
			for(var i =1; i <= start -1 ; i++){
				$('div.inputResultZone div.tree .num' + i).html("0").css('visibility' , 'hidden');
			}
		
			for(var i =0; i < intNum.length ; i++){
				$('div.inputResultZone div.tree .num' + (start++)).html(intNum[i]).css('visibility' , 'visible');
			}
			
			$('div.inputResultZone div.tree .num8').html(floatNum);
			
		}else if(target == 'total_co2'){
			
			var start = 7 -intNum.length + 1;
			
			for(var i =1; i <= start -1 ; i++){
				$('div.inputTotalZone div.co2 .num' + i).html("0").css('visibility' , 'hidden');
			}
		
			for(var i =0; i < intNum.length ; i++){
				$('div.inputTotalZone div.co2 .num' + (start++)).html(intNum[i]).css('visibility' , 'visible');
			}
		
			
			$('div.inputTotalZone div.co2 .num8').html(floatNum);
			
		}else if(target == 'total_tree'){
			
			var start = 7 -intNum.length + 1;
			
			for(var i =1; i <= start -1 ; i++){
				$('div.inputTotalZone div.tree .num' + i).html("0").css('visibility' , 'hidden');
			}
		
			for(var i =0; i < intNum.length ; i++){
				$('div.inputTotalZone div.tree .num' + (start++)).html(intNum[i]).css('visibility' , 'visible');
			}
			
			
			$('div.inputTotalZone div.tree .num8').html(floatNum);
		}
		
	}
	
	
	
	function total(){
		
		totalCo2 = calc( elecCo2 + gasCo2  + waterCo2  + oilCo2  );
		totalTree = calc( elecTree  + gasTree  + waterTree  + oilTree  );
		
		
		printNumber('total_co2' , totalCo2);
		printNumber('total_tree' , totalTree);
		
	}
	
	function agreeMail(){
		$('.shadow').show();
	}	
	
	function saveData(type){
		
		var select_elec_idx = new Array();
		var select_gas_idx = new Array();
		var select_water_idx = new Array();
		var select_car_idx = new Array();
		
		if(type == 'down'){
			
			$('div.step3 div#step3_1 ul li.on').each(function(){
				select_elec_idx.push( $(this).find('input[name="elec_idx"]').val() );
			})
			
			$('div.step3 div#step3_2 ul li.on').each(function(){
				select_gas_idx.push( $(this).find('input[name="gas_idx"]').val() );
			})
			
			$('div.step3 div#step3_3 ul li.on').each(function(){
				select_water_idx.push( $(this).find('input[name="water_idx"]').val() );
			})
			
			$('div.step3 div#step3_4 ul li.on').each(function(){
				select_car_idx.push( $(this).find('input[name="car_idx"]').val() );
			})
		
			$.ajax({
				url : '/tanso/save_sale.green',
				type : 'POST',
				data : {
					'elecIdx' : select_elec_idx,
					'gasIdx' : select_gas_idx,
					'waterIdx' : select_water_idx,
					'carIdx' : select_car_idx,
					'memberIdx' : resultIdx
				},
				success : function(data){
					
					if(data.msg == "ok"){
						
						$('form[name="downF"] input[name="memberIdx"]').val( resultIdx  );
						$('form[name="downF"]').submit();
					}else{
						alert('파일을 저장하는데 실패하였습니다.\n관리자에게 문의하여 주시기 바랍니다.')
					}
					
				}
			})
			
			
			
		}else if(type == 'mail'){
			
			$('div.step3 div#step3_1 ul li.on').each(function(){
				select_elec_idx.push( $(this).find('input[name="elec_idx"]').val() );
			})
			
			$('div.step3 div#step3_2 ul li.on').each(function(){
				select_gas_idx.push( $(this).find('input[name="gas_idx"]').val() );
			})
			
			$('div.step3 div#step3_3 ul li.on').each(function(){
				select_water_idx.push( $(this).find('input[name="water_idx"]').val() );
			})
			
			$('div.step3 div#step3_4 ul li.on').each(function(){
				select_car_idx.push( $(this).find('input[name="car_idx"]').val() );
			})
			
			$.ajax({
				url : '/tanso/save_sale.green',
				type : 'POST',
				data : {
					'elecIdx' : select_elec_idx,
					'gasIdx' : select_gas_idx,
					'waterIdx' : select_water_idx,
					'carIdx' : select_car_idx,
					'memberIdx' : resultIdx
				},
				success : function(data){
					
					if(data.msg == "ok"){
						
						$.ajax({
							url : '/tanso/sendMail.green',
							type : 'POST',
							data : {
								'memberIdx'		:	resultIdx,
								'mailName'		:	$('input[name="emailId"]').val(),
								'mailAddress'	:	$('input[name="emailAddress"]').val(),
								'userName'		:	 $('input[name="memberName"]').val()
								
							},
							success : function(){
								alert('메일을 발송하였습니다.');
								$('.shadow').hide()
								
							},
							error : function(e){
								alert('에러가 발생하여 메일을 발송하지 못하였습니다.\n관리자에게 문의하여 주시기 바랍니다.');
							}
							
						})
						
						
					}else{
						alert('메일을 발송하는데 실패하였습니다.\n관리자에게 문의하여 주시기 바랍니다.')
					}
					
				}
			})
			
		}
		
		
	}
	