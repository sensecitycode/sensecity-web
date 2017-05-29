function date_by_subtracting_days(date, days) {
    return new Date(
        date.getFullYear(), 
        date.getMonth(), 
        date.getDate() - days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}
function date_by_subtracting_months(date, months) {
    return new Date(
        date.getFullYear(), 
        date.getMonth() - months, 
        date.getDate() ,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}
function date_by_subtracting_years(date, years) {
    return new Date(
        date.getFullYear()-years, 
        date.getMonth(), 
        date.getDate() ,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}
var today= new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0
var yyyy = today.getFullYear();
//Dhmioyrgw metavlhtes gia yesterday
var yesterday=date_by_subtracting_days(today,1)
var dy=yesterday.getDate();
var my=yesterday.getMonth()+1;
var yyyd=yesterday.getFullYear();	
var yesterday=yyyd+'-'+my+'-'+dy;
//Dhmiourgw metavlhtes gia vdomada
var week=date_by_subtracting_days(today, 7);
var dw=week.getDate();
var mw=week.getMonth()+1;
var yyyw=week.getFullYear(); 
var week=yyyw+'-'+mw+'-'+dw;
//Dhmiourgw metavlhtes gia mhna1
var month1=date_by_subtracting_months(today, 1)
var dm1=month1.getDate();
var m1=month1.getMonth()+1;
var yyym1=month1.getFullYear();
var month1=yyym1+'-'+m1+'-'+dm1;
//Dhmiourgw metavlhtes gia mhna3
var month3=date_by_subtracting_months(today, 3)
var dm3=month3.getDate();
var m3=month3.getMonth()+1;
var yyym3=month3.getFullYear();
var month3=yyym3+'-'+m3+'-'+dm3;
//Dhmiourgw metavlhtes gia mhna6
var month6=date_by_subtracting_months(today, 6)
var dm6=month6.getDate();
var m6=month6.getMonth()+1;
var yyym6=month6.getFullYear();
var month6=yyym6+'-'+m6+'-'+dm6;
//Dhmiourgw metavlhtes gia xrono
var yyyy1=date_by_subtracting_years(today, 1)
var dy1=yyyy1.getDate();
var my1=yyyy1.getMonth()+1;
var year1=yyyy1.getFullYear();
var yyyy1=year1+'-'+my1+'-'+dy1;			
today= yyyy+'-'+mm+'-'+dd;
var start=new Date();
start='2017-01-01';
		//Απο εδω και κάτω ξεκινάν οι controllers της angular
		var app = angular.module('myApp', []);
		
		app.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);    
}]);
		
		app.controller('myCtrl2', ['$scope', '$http', function ($scope, $http) {
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+from+"&enddate="+today).then(function (response) {
        $scope.issues = response.data;
        
    })}]);

	app.controller('myCtrl6', ['$scope', '$http', function ($scope, $http) {
	$("#search_btn").click("on", function(){	
    $http.get("http://api.sense.city:3000/api/1.0/issue?city="+$("#lambros").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&includeAnonymous=1").then(function (response) {
        $scope.issues = response.data;
        $scope.frequent = function () {


            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
				else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}	
                
            }
            var max=count[0];
            var value = 'ΚΑΘΑΡΙΟΤΗΤΑ';
		
            if (max<count[1]){
                max=count[1];
                value='ΗΛΕΚΤΡΟΦΩΤΙΣΜΟΣ';}
            if  (max<count[2]){
                max=count[2];
                value='ΥΔΡΕΥΣΗΣ';}
            if (max<count[3]){
                max=count[3];
                value='ΔΡΟΜΟΥ/ΠΕΖΟΔΡΟΜΙΟΥ';}
            if (max<count[4]){
                max=count[4];
                value='ΠΡΑΣΙΝΟΥ';}
            if (max <count[5]){
                max=count[5];
                value='ΠΟΛΙΤΙΚΗΣ ΠΡΟΣΤΑΣΙΑΣ';}
            if (max <count[6]){
                max=count[6];
                value='ΠΕΡΙΒΑΛΛΟΝΤΙΚΑ ΘΕΜΑΤΑ';}
            
			
            return value;
        }
		 $scope.number = function () {


            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
                else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}
            }
            var max=count[0];
             var value = 'Καθαριότητα';
		
            if (max<count[1]){
                max=count[1];
                value='Ηλεκτροφωτισμός';}
            if  (max<count[2]){
                max=count[2];
                value='Ύδρευσης';}
            if (max<count[3]){
                max=count[3];
                value='Δρόμου/Πεζοδρομίου/Πλατείας';}
            if (max<count[4]){
                max=count[4];
                value='Πρασίνου';}
            if (max <count[5]){
                max=count[5];
                value='Πολιτικής προστασίας';}
            if (max <count[6]){
                max=count[6];
                value='Περιβαλλοντικά θέματα';}
           
            return max;
        }
    })
	});
	}]);
	app.controller('myCtrl61', ['$scope', '$http', function ($scope, $http) {
	$("#search_btn").click("on", function(){	
    $http.get("http://api.sense.city:3000/api/1.0/issue?city="+$("#lambros1").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&includeAnonymous=1").then(function (response) {
        $scope.issues = response.data;
        $scope.frequent = function () {


            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
				else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}	
                
            }
            var max=count[0];
            var value = 'ΚΑΘΑΡΙΟΤΗΤΑ';
		
            if (max<count[1]){
                max=count[1];
                value='ΗΛΕΚΤΡΟΦΩΤΙΣΜΟΣ';}
            if  (max<count[2]){
                max=count[2];
                value='ΥΔΡΕΥΣΗΣ';}
            if (max<count[3]){
                max=count[3];
                value='ΔΡΟΜΟΥ/ΠΕΖΟΔΡΟΜΙΟΥ';}
            if (max<count[4]){
                max=count[4];
                value='ΠΡΑΣΙΝΟΥ';}
            if (max <count[5]){
                max=count[5];
                value='ΠΟΛΙΤΙΚΗΣ ΠΡΟΣΤΑΣΙΑΣ';}
            if (max <count[6]){
                max=count[6];
                value='ΠΕΡΙΒΑΛΛΟΝΤΙΚΑ ΘΕΜΑΤΑ';}
            
			
            return value;
        }
		 $scope.number = function () {


            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
                else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}
            }
            var max=count[0];
            var value = 'ΚΑΘΑΡΙΟΤΗΤΑ';
		
            if (max<count[1]){
                max=count[1];
                value='ΗΛΕΚΤΡΟΦΩΤΙΣΜΟΣ';}
            if  (max<count[2]){
                max=count[2];
                value='ΥΔΡΕΥΣΗΣ';}
            if (max<count[3]){
                max=count[3];
                value='ΔΡΟΜΟΥ/ΠΕΖΟΔΡΟΜΙΟΥ';}
            if (max<count[4]){
                max=count[4];
                value='ΠΡΑΣΙΝΟΥ';}
            if (max <count[5]){
                max=count[5];
                value='ΠΟΛΙΤΙΚΗΣ ΠΡΟΣΤΑΣΙΑΣ';}
            if (max <count[6]){
                max=count[6];
                value='ΠΕΡΙΒΑΛΛΟΝΤΙΚΑ ΘΕΜΑΤΑ';}
           
            return max;
        }
    })
	});
	}]);
	app.controller('myCtrl7', ['$scope', '$http', function ($scope, $http) {
		$("#search_btn").click("on", function(){
    $http.get("http://api.sense.city:3000/api/1.0/issue?city="+$("#lambros").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&includeAnonymous=1").then(function (response) {
        $scope.issues = response.data;
        $scope.frequent = function () {


            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
                else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}
            }
            var min=count[0];
            var value = 'ΚΑΘΑΡΙΟΤΗΤΑ';
		
            if (min>count[1]){
                min=count[1];
                value='ΗΛΕΚΤΡΟΦΩΤΙΣΜΟΣ';}
            if  (min>count[2]){
                min=count[2];
                value='ΥΔΡΕΥΣΗΣ';}
            if (min>count[3]){
                min=count[3];
                value='ΔΡΟΜΟΥ/ΠΕΖΟΔΡΟΜΙΟΥ/ΠΛΑΤΕΙΑΣ';}
            if (min>count[4]){
                min=count[4];
                value='ΠΡΑΣΙΝΟΥ';}
            if (min>count[5]){
                min=count[5];
                value='ΠΟΛΙΤΙΚΗΣ ΠΡΟΣΤΑΣΙΑΣ';}
            if (min>count[6]){
                min=count[6];
                value='ΠΕΡΙΒΑΛΛΟΝΤΙΚΑ ΘΕΜΑΤΑ';}
           
			
            return value;
        }
		 $scope.number = function () {


            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
                else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}
            }
            var min=count[0];
            var value = 'garbage';
		
            if (min>count[1]){
                min=count[1];
                value='lighting';}
            if  (min>count[2]){
                min=count[2];
                value='plumbing';}
            if (min>count[3]){
                min=count[3];
                value='road-constructor';}
            if (min>count[4]){
                min=count[4];
                value='green';}
            if (min>count[5]){
                min=count[5];
                value='protection-policy';}
            if (min>count[6]){
                min=count[6];
                value='environment';}
            
			
            return min;
        }
    })
		});
	}]);
	
	app.controller('myCtrl71', ['$scope', '$http', function ($scope, $http) {
		$("#search_btn").click("on", function(){
    $http.get("http://api.sense.city:3000/api/1.0/issue?city="+$("#lambros1").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&includeAnonymous=1").then(function (response) {
        $scope.issues = response.data;
        $scope.frequent = function () {
            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
                else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}
            }
            var min=count[0];
            var value = 'ΚΑΘΑΡΙΟΤΗΤΑ';
		
            if (min>count[1]){
                min=count[1];
                value='ΗΛΕΚΤΡΟΦΩΤΙΣΜΟΣ';}
            if  (min>count[2]){
                min=count[2];
                value='ΥΔΡΕΥΣΗΣ';}
            if (min>count[3]){
                min=count[3];
                value='ΔΡΟΜΟΥ/ΠΕΖΟΔΡΟΜΙΟΥ/ΠΛΑΤΕΙΑΣ';}
            if (min>count[4]){
                min=count[4];
                value='ΠΡΑΣΙΝΟΥ';}
            if (min>count[5]){
                min=count[5];
                value='ΠΟΛΙΤΙΚΗΣ ΠΡΟΣΤΑΣΙΑΣ';}
            if (min>count[6]){
                min=count[6];
                value='ΠΕΡΙΒΑΛΛΟΝΤΙΚΑ ΘΕΜΑΤΑ';}
           
			
            return value;
        }
		 $scope.number = function () {


            var count=[];
            for (var j=0;j<=6;j++){
                count[j]=0;}
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].issue=='garbage'){
                    count[0]=count[0]+1;}
                else if (response.data[i].issue=='lighting'){
                    count[1]=count[1]+1;}
                else if (response.data[i].issue=='plumbing'){
                    count[2]=count[2]+1;}
                else if (response.data[i].issue=='road-constructor'){
                    count[3]=count[3]+1;}
                else if (response.data[i].issue=='green'){
                    count[4]=count[4]+1;}
                else if (response.data[i].issue=='protection-policy'){
                    count[5]=count[5]+1;}
                else if (response.data[i].issue=='environment'){
                    count[6]=count[6]+1;}
            }
            var min=count[0];
            var value = 'garbage';
		
            if (min>count[1]){
                min=count[1];
                value='lighting';}
            if  (min>count[2]){
                min=count[2];
                value='plumbing';}
            if (min>count[3]){
                min=count[3];
                value='road-constructor';}
            if (min>count[4]){
                min=count[4];
                value='green';}
            if (min>count[5]){
                min=count[5];
                value='protection-policy';}
            if (min>count[6]){
                min=count[6];
                value='environment';}
            
			
            return min;
        }
    })
		});
	}]);
			app.controller('myCtrl9', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&includeAnonymous=1").then(function (response) {
        $scope.issues = response.data;
		$scope.desktop= function (){
						var count=0;
						for (i=0;i<$scope.issues.length;i++){
							if ($scope.issues[i].device_id=='webapp'){
								count++;
							}
						}
						
						count=(count/response.data.length)*100;
						return count.toFixed(2);
		}
		$scope.auth= function (){
						count=0;
						for (i=0;i<response.data.length;i++){
							if (response.data[i].cf_authenticate=='0'){
								count++;
							}
						}
						count=(count/response.data.length)*100;
						return count.toFixed(2);
						}
						
        
    })
					});
	}]);
			
	

app.controller('tmhma1', ['$scope','$http',function ($scope,$http) {  
		$("#search_btn").click("on", function(){						
			angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
				$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%B5%CF%80%CE%AF%CE%BB%CF%85%CF%83%CE%B7%CF%82%20%CF%80%CF%81%CE%BF%CE%B2%CE%BB%CE%B7%CE%BC%CE%AC%CF%84%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}			
        });
	});		
    } 
    ]);
app.controller('tmhma2', ['$scope', '$http', function ($scope, $http) {			
			$("#search_btn").click("on", function(){							
			angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];	
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%91%CF%85%CF%84%CE%BF%CF%84%CE%B5%CE%BB%CE%AD%CF%82%20%CF%84%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A0%CE%BF%CE%BB%CE%B9%CF%84%CE%B9%CE%BA%CE%AE%CF%82%20%CE%A0%CF%81%CE%BF%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});		
			}			
        });
	});		
    } 
    ]);
app.controller('tmhma3', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A3%CF%85%CE%B3%CE%BA%CE%BF%CE%B9%CE%BD%CF%89%CE%BD%CE%B9%CE%B1%CE%BA%CE%BF%CF%8D%20%26%20%CE%9A%CF%85%CE%BA%CE%BB%CE%BF%CF%86%CE%BF%CF%81%CE%B9%CE%B1%CE%BA%CE%BF%CF%8D%20%CE%A3%CF%87%CE%B5%CE%B4%CE%B9%CE%B1%CF%83%CE%BC%CE%BF%CF%8D").then(function (response) {
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;					
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	       
    });   
	});
    }]);	
app.controller('tmhma4', ['$scope', '$http', function ($scope, $http) {	    
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
	$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%80%CE%BF%CE%BA%CE%BF%CE%BC%CE%B9%CE%B4%CE%AE%CF%82%20%CE%91%CF%80%CE%BF%CF%81%CF%81%CE%B9%CE%BC%CE%BC%CE%AC%CF%84%CF%89%CE%BD%20%26%20%CE%91%CE%BD%CE%B1%CE%BA%CF%85%CE%BA%CE%BB%CF%8E%CF%83%CE%B9%CE%BC%CF%89%CE%BD%20%CE%A5%CE%BB%CE%B9%CE%BA%CF%8E%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    );
});	
}]);
app.controller('tmhma5', ['$scope', '$http', function ($scope, $http) {
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%85%CF%84%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82%20%CE%88%CF%81%CE%B3%CF%89%CE%BD%20%CE%A5%CF%80%CE%BF%CE%B4%CE%BF%CE%BC%CE%AE%CF%82").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    ); 
});	
}]);	
app.controller('tmhma6', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%85%CF%84%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82%20%CE%9A%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    );   
	});
}]);		
app.controller('tmhma7', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%9A%CF%84%CE%B9%CF%81%CE%AF%CF%89%CE%BD%20%26%20%CE%97%CE%BB%CE%B5%CE%BA%CF%84%CF%81%CE%BF%CF%86%CF%89%CF%84%CE%B9%CF%83%CE%BC%CE%BF").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;					
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    );   
	});
}]);	
app.controller('tmhma8', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
   $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%95%CE%BB%CE%AD%CE%B3%CF%87%CE%BF%CF%85%20%CE%9A%CE%BF%CE%B9%CE%BD%CE%BF%CF%87%CF%81%CE%AE%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}			
        });
	});		
    } 
    ]);	
app.controller('tmhma9', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9A%CE%B1%CE%B8%CE%B1%CF%81%CE%B9%CF%83%CE%BC%CE%BF%CF%8D%20%CE%9A%CE%BF%CE%B9%CE%BD%CE%BF%CF%87%CF%81%CE%AE%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD%20%26%20%CE%95%CE%B9%CE%B4%CE%B9%CE%BA%CF%8E%CE%BD%20%CE%A3%CF%85%CE%BD%CE%B5%CF%81%CE%B3%CE%B5%CE%AF%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});			
			}	
        }
    );   
	});
}]);
app.controller('tmhma10', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9C%CE%B5%CE%BB%CE%B5%CF%84%CF%8E%CE%BD%20%CE%88%CF%81%CE%B3%CF%89%CE%BD%20%CE%A0%CF%81%CE%B1%CF%83%CE%AF%CE%BD%CE%BF%CF%85").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    );  
});	
}]);	
app.controller('tmhma11', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+today+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9F%CE%B4%CE%BF%CF%80%CE%BF%CE%B9%CE%AF%CE%B1%CF%82").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					var k=[];
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    ); 
});	
}]);	
app.controller('tmhma12', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A0%CF%81%CE%B1%CF%83%CE%AF%CE%BD%CE%BF%CF%85").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    );
});	
}]);	
app.controller('tmhma13', ['$scope', '$http', function ($scope, $http) {	
			$("#search_btn").click("on", function(){
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A3%CF%87%CE%B5%CE%B4%CE%B9%CE%B1%CF%83%CE%BC%CE%BF%CF%8D%20%CE%9C%CE%B5%CE%BB%CE%B5%CF%84%CF%8E%CE%BD%20%CE%BA%CE%B1%CE%B9%20%CE%95%CE%BB%CE%AD%CE%B3%CF%87%CE%BF%CF%85").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=2;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
								$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor(((sumd%($scope.array1D.length*86400000))/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor(((sumd%($scope.array1D.length*86400000))%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
						}	
				});						
			}	
        }
    );   
			});
			}]);	
app.controller('tmhma21', ['$scope','$http','$location',function ($scope,$http,$location) { 
			var start1=$location.search().start;
			var end1=$location.search().end;		
			angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
				$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%B5%CF%80%CE%AF%CE%BB%CF%85%CF%83%CE%B7%CF%82%20%CF%80%CF%81%CE%BF%CE%B2%CE%BB%CE%B7%CE%BC%CE%AC%CF%84%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}	
				});						
			}
        });			
    } 
    ]);
app.controller('tmhma22', ['$scope', '$http','$location', function ($scope, $http ,$location) {
				var start1=$location.search().start;
				var end1=$location.search().end;
			angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];	
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%91%CF%85%CF%84%CE%BF%CF%84%CE%B5%CE%BB%CE%AD%CF%82%20%CF%84%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A0%CE%BF%CE%BB%CE%B9%CF%84%CE%B9%CE%BA%CE%AE%CF%82%20%CE%A0%CF%81%CE%BF%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}
						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}
				});						
			}			
        });			
    } 
    ]);	
app.controller('tmhma23', ['$scope', '$http','$location', function ($scope, $http ,$location) {		
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A3%CF%85%CE%B3%CE%BA%CE%BF%CE%B9%CE%BD%CF%89%CE%BD%CE%B9%CE%B1%CE%BA%CE%BF%CF%8D%20%26%20%CE%9A%CF%85%CE%BA%CE%BB%CE%BF%CF%86%CE%BF%CF%81%CE%B9%CE%B1%CE%BA%CE%BF%CF%8D%20%CE%A3%CF%87%CE%B5%CE%B4%CE%B9%CE%B1%CF%83%CE%BC%CE%BF%CF%8D").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;					
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];
							}
						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {							
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();								
						}	
				});						
			}	
    });   	
    }]);	
app.controller('tmhma24', ['$scope', '$http','$location',function ($scope, $http, $location) {
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
	$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%80%CE%BF%CE%BA%CE%BF%CE%BC%CE%B9%CE%B4%CE%AE%CF%82%20%CE%91%CF%80%CE%BF%CF%81%CF%81%CE%B9%CE%BC%CE%BC%CE%AC%CF%84%CF%89%CE%BD%20%26%20%CE%91%CE%BD%CE%B1%CE%BA%CF%85%CE%BA%CE%BB%CF%8E%CF%83%CE%B9%CE%BC%CF%89%CE%BD%20%CE%A5%CE%BB%CE%B9%CE%BA%CF%8E%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];
							}
						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();								
						}	
				});						
			}	
        }
    );
}]);
app.controller('tmhma25', ['$scope', '$http','$location', function ($scope, $http,$location) {
	var start1=$location.search().start;
				var end1=$location.search().end;
	angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
			
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%85%CF%84%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82%20%CE%88%CF%81%CE%B3%CF%89%CE%BD%20%CE%A5%CF%80%CE%BF%CE%B4%CE%BF%CE%BC%CE%AE%CF%82").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}	
				});		
				
			}	
        }
    ); 	
}]);
app.controller('tmhma26', ['$scope', '$http','$location', function ($scope, $http,$location) {	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%85%CF%84%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82%20%CE%9A%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							console.log($scope.meres);
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}
				});		
				
			}	
        }
    );   
	
}]);
app.controller('tmhma27', ['$scope', '$http','$location', function ($scope, $http, $location) {
	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%9A%CF%84%CE%B9%CF%81%CE%AF%CF%89%CE%BD%20%26%20%CE%97%CE%BB%CE%B5%CE%BA%CF%84%CF%81%CE%BF%CF%86%CF%89%CF%84%CE%B9%CF%83%CE%BC%CE%BF").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							console.log($scope.meres);
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}
				});		
				
			}	
        }
    );   
	
}]);

app.controller('tmhma28', ['$scope', '$http','$location', function ($scope, $http,$location) {
	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
   $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%95%CE%BB%CE%AD%CE%B3%CF%87%CE%BF%CF%85%20%CE%9A%CE%BF%CE%B9%CE%BD%CE%BF%CF%87%CF%81%CE%AE%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								
								)
								
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var test=0;
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}	
				});		
				
			}	
        }
    );

}]);
app.controller('tmhma29', ['$scope', '$http','$location', function ($scope, $http,$location) {
	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9A%CE%B1%CE%B8%CE%B1%CF%81%CE%B9%CF%83%CE%BC%CE%BF%CF%8D%20%CE%9A%CE%BF%CE%B9%CE%BD%CE%BF%CF%87%CF%81%CE%AE%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD%20%26%20%CE%95%CE%B9%CE%B4%CE%B9%CE%BA%CF%8E%CE%BD%20%CE%A3%CF%85%CE%BD%CE%B5%CF%81%CE%B3%CE%B5%CE%AF%CF%89%CE%BD").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							console.log($scope.meres);
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}
				});		
				
			}	
        }
    );   
	
}]);
app.controller('tmhma210', ['$scope', '$http','$location', function ($scope, $http,$location) {
	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9C%CE%B5%CE%BB%CE%B5%CF%84%CF%8E%CE%BD%20%CE%88%CF%81%CE%B3%CF%89%CE%BD%20%CE%A0%CF%81%CE%B1%CF%83%CE%AF%CE%BD%CE%BF%CF%85").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}
				});		
				
			}
        }
    );  
	
}]);	

app.controller('tmhma211', ['$scope', '$http','$location', function ($scope, $http,$location) {
	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9F%CE%B4%CE%BF%CF%80%CE%BF%CE%B9%CE%AF%CE%B1%CF%82").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					var k=[];
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
							var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}	
				});		
				
			}
        }
    ); 

}]);

app.controller('tmhma212', ['$scope', '$http','$location', function ($scope, $http,$location) {
	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A0%CF%81%CE%B1%CF%83%CE%AF%CE%BD%CE%BF%CF%85").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}	
				});		
				
			}	
        }
    );
	
}]);

app.controller('tmhma213', ['$scope', '$http','$location', function ($scope, $http,$location) {
	
			var start1=$location.search().start;
				var end1=$location.search().end;
				angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
    $http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A3%CF%87%CE%B5%CE%B4%CE%B9%CE%B1%CF%83%CE%BC%CE%BF%CF%8D%20%CE%9C%CE%B5%CE%BB%CE%B5%CF%84%CF%8E%CE%BD%20%CE%BA%CE%B1%CE%B9%20%CE%95%CE%BB%CE%AD%CE%B3%CF%87%CE%BF%CF%85").then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					$scope.cnt=0;
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if ((($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[0]=="RESOLVED")||($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED"))&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
								var sumd=0;
							for (var k=0;k<$scope.array1D.length;k++){
									sumd+=$scope.array1D[k].diasthma;
																	
							}
							$scope.meres=Math.floor(sumd/($scope.array1D.length*86400000));
							$scope.wres=Math.floor((sumd%($scope.array1D.length*86400000)/($scope.array1D.length*3600000)));
							$scope.lepta=Math.floor((sumd%($scope.array1D.length*86400000)%($scope.array1D.length*3600000))/(60000*$scope.array1D.length));
							var m=$scope.meres;
							m=Math.round(m/10)*10;
							if(m==0) m=10;
							var vhma=(2*m*86400000)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma +vhma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+9*vhma) count[8]++;
								else count[9]++;
								}
								
							var nvd3Charts = function() {	
							var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
											"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
											"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
											"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
											"#C51B7D","#DE77AE","#EDD3F2"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};	
						var startChart4 = function() {
							nv.addGraph(function() {
								var chart = nv.models.discreteBarChart().x(function(d) {
									return d.label;
								})//Specify the data accessors.
								.y(function(d) {
									return d.value;
								}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
								.tooltips(false)//Don't show tooltips
								.showValues(true)//...instead, show the bar value right on top of each bar.
								.transitionDuration(350)
											.color(d3.scale.myColors().range());;

								d3.select('#chart-4 svg').datum(exampleData()).call(chart);

								nv.utils.windowResize(chart.update);
								chart.xAxis//Chart x-axis settings
								.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
								return chart;
							});
							var x=$scope.array1D[0].diasthma;
							var A1=Math.round(x/86400000);	
							var A= A1.toString();
							var B1=Math.round((x+vhma)/86400000);							
							var B= B1.toString();
							var C1=Math.round((x+2*vhma)/86400000);							
							var C= C1.toString();
							var D1=Math.round((x+3*vhma)/86400000);
							var D= D1.toString();
							var E1=Math.round((x+4*vhma)/86400000);							
							var E= E1.toString();
							var F1=Math.round((x+5*vhma)/86400000);							
							var F= F1.toString();
							var G1=Math.round((x+6*vhma)/86400000);							
							var G= G1.toString();
							var H1=Math.round((x+7*vhma)/86400000);							
							var H= H1.toString();
							var I1=Math.round((x+8*vhma)/86400000);							
							var I= I1.toString();
							var K1=Math.round((x+9*vhma)/86400000);							
							var K= K1.toString();
							//Each bar represents a single discrete quantity.
							function exampleData() {
								return [{
									key : "Cumulative Return",
									values : [{
										"label" : A+'-'+B+' M',
										"value" : count[0]
									}, {
										"label" : B+'-'+C+' M',
										"value" : count[1]
									}, {
										"label" : C+'-'+D+' M',
										"value" : count[2]
									}, {
										"label" : D+'-'+E+' M',
										"value" : count[3]
									}, {
										"label" : E+'-'+F+' M',
										"value" : count[4]
									}, {
										"label" : F+'-'+G+' M',
										"value" : count[5]
									}, {
										"label" : G+'-'+H+' M',
										"value" : count[6]
									}, {
										"label" :H+'-'+I+' M' ,
										"value" :count[7]
									}, {
										"label" : I+'-'+K+' M',
										"value" : count[8]
									}, {
										"label" : K+'++'+'M',
										"value" : count[9]
									}
									]
								}];

							}

						};	
						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}
							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}
						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}
						return {		
							init : function() {
								
								startChart4();			
							}
						};
					}();
					nvd3Charts.init();	
							
						}	
				});		
				
			}
        }
    );   
		
			}]);
	
	app.controller('kentrikh1', ['$scope', '$http', function ($scope, $http) {
var morrisCharts = function() {
		
	$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=1000&includeAnonymous=1").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example8',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
	
	
				});
				
			
	  
	  }();

}]);
app.controller('kentrikh2', ['$scope', '$http', function ($scope, $http) {
	var morrisCharts = function() {
	

	$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&issue=garbage").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
	
	
				
	
				});
				
			
	  
	  }();

}]);
app.controller('kentrikh3', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=green&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example2',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
					
				
				});
				
			
	  
	  }();

}]);
app.controller('kentrikh4', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=plumbing&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example4',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
					});
				
			
	  
	  }();

}]);
app.controller('kentrikh5', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=protection-policy&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example3',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
				});
				
			
	  
	  }();

}]);
app.controller('kentrikh6', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=lighting&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example5',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
				});
				
			
	  
	  }();

}]);
app.controller('kentrikh7', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=road-constructor&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example6',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
					colors: ['#90EE90', '#CD5C5C']
				});
				});
				
			
	  
	  }();

}]);
app.controller('kentrikh8', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=environment&startdate=2017-01-01&enddate="+today+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;
					
					var prog=0;
					
					
					for (var i=0;i<response.data.length;i++){
						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;
						
						
					}
					
					Morris.Donut({
						element: 'morris-donut-example7',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
					colors: ['#90EE90', '#CD5C5C']
				});
				});
				
			
	  
	  }();

}]);
app.controller('vdomada', ['$scope', '$http', function ($scope, $http) {
		$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?issue="+$("#lambros").val()+"&city=patras&startdate="+week+"&enddate="+today+"&status=CONFIRMED|IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&resolution=FIXED|INVALID|DUPLICATED&includeAnonymous=1").then(function (response) {					
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					}				
						var nvd3Charts = function() {							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A","#DA3610",
												"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
												"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
												"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
												"#C51B7D","#DE77AE","#EDD3F2"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};															
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;
									d3.select('#chart-41 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα
									nv.utils.windowResize(chart.update);
									return chart;
								});
								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];
								}
							};
							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}
								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}
							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}
							return {		
								init : function() {
									startChart4();	
								}
							};
						}();
						nvd3Charts.init();						
						});
	});					
}]);
app.controller('mhnas', ['$scope', '$http', function ($scope, $http) {
			$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?issue="+$("#lambros").val()+"&city=patras&startdate="+month1+"&enddate="+today+"&status=CONFIRMED|IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&resolution=FIXED|INVALID|DUPLICATED&includeAnonymous=1").then(function (response) {
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					}				
						var nvd3Charts = function() {							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A","#DA3610",
												"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
												"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
												"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
												"#C51B7D","#DE77AE","#EDD3F2"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};															
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;
									d3.select('#chart-42 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα
									nv.utils.windowResize(chart.update);
									return chart;
								});
								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];
								}
							};
							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}
								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}
							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}
							return {		
								init : function() {
									startChart4();	
								}
							};
						}();
						nvd3Charts.init();												
						});
	});					
}]);
app.controller('trimhno', ['$scope', '$http', function ($scope, $http) {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?issue="+$("#lambros").val()+"&city=patras&startdate="+month3+"&enddate="+today+"&status=CONFIRMED|IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&resolution=FIXED|INVALID|DUPLICATED&includeAnonymous=1").then(function (response) {
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					}				
						var nvd3Charts = function() {							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A","#DA3610",
												"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
												"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
												"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
												"#C51B7D","#DE77AE","#EDD3F2"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};															
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;
									d3.select('#chart-43 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα
									nv.utils.windowResize(chart.update);
									return chart;
								});
								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];
								}
							};
							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}
								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}
							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}
							return {		
								init : function() {
									startChart4();	
								}
							};
						}();
						nvd3Charts.init();						
						});
	});					
}]);
app.controller('eksamhno', ['$scope', '$http', function ($scope, $http) {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?issue="+$("#lambros").val()+"&city=patras&startdate="+month6+"&enddate="+today+"&status=CONFIRMED|IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&resolution=FIXED|INVALID|DUPLICATED&includeAnonymous=1").then(function (response) {
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					}				
						var nvd3Charts = function() {							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A","#DA3610",
												"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
												"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
												"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
												"#C51B7D","#DE77AE","#EDD3F2"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};															
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;
									d3.select('#chart-44 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα
									nv.utils.windowResize(chart.update);
									return chart;
								});
								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];
								}
							};
							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}
								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}
							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}
							return {		
								init : function() {
									startChart4();	
								}
							};
						}();
						nvd3Charts.init();						
						});
	});					
}]);
app.controller('xronos', ['$scope', '$http', function ($scope, $http) {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?issue="+$("#lambros").val()+"&city=patras&startdate="+yyyy1+"&enddate="+today+"&status=CONFIRMED|IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&resolution=FIXED|INVALID|DUPLICATED&includeAnonymous=1").then(function (response) {
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					}				
						var nvd3Charts = function() {							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A","#DA3610",
												"#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
												"#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
												"#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
												"#C51B7D","#DE77AE","#EDD3F2"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};															
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;
									d3.select('#chart-45 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα
									nv.utils.windowResize(chart.update);
									return chart;
								});
								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];
								}
							};
							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}
								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}
							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}
							return {		
								init : function() {
									startChart4();	
								}
							};
						}();
						nvd3Charts.init();												
						});
	});					
}]);
app.controller('apodosh1', ['$scope', '$http', function ($scope, $http) {
	var morrisCharts = function() {	
	$("#search_btn").click("on", function(){
	$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&issue=garbage").then(function(response){
					var res=0;					
					var prog=0;										
					for (var i=0;i<response.data.length;i++){						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;												
					}					
					Morris.Donut({
						element: 'morris-donut-example',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});							
				});							
	  });
	  }();
}]);
app.controller('apodosh2', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=green&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;					
					var prog=0;										
					for (var i=0;i<response.data.length;i++){						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;												
					}					
					Morris.Donut({
						element: 'morris-donut-example2',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});									
				});				
			});	  
	  }();
}]);
app.controller('apodosh3', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=plumbing&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;					
					var prog=0;										
					for (var i=0;i<response.data.length;i++){						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;												
					}				
					Morris.Donut({
						element: 'morris-donut-example4',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
					});							
	  });
	  }();
}]);
app.controller('apodosh4', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=protection-policy&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;					
					var prog=0;										
					for (var i=0;i<response.data.length;i++){						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;												
					}					
					Morris.Donut({
						element: 'morris-donut-example3',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
				});				
			});	  
	  }();
}]);
app.controller('apodosh5', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=lighting&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;					
					var prog=0;										
					for (var i=0;i<response.data.length;i++){						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;												
					}					
					Morris.Donut({
						element: 'morris-donut-example5',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
						colors: ['#90EE90', '#CD5C5C']
					});
				});							
	  });
	  }();
}]);
app.controller('apodosh6', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=road-constructor&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;					
					var prog=0;										
					for (var i=0;i<response.data.length;i++){						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;												
					}					
					Morris.Donut({
						element: 'morris-donut-example6',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
					colors: ['#90EE90', '#CD5C5C']
				});
				});							
	  });
	  }();
}]);
app.controller('apodosh7', ['$scope', '$http', function ($scope, $http) {
			var morrisCharts = function() {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&issue=environment&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1").then(function(response){
					var res=0;					
					var prog=0;										
					for (var i=0;i<response.data.length;i++){						
							if (response.data[i].status=="RESOLVED"){
								res+=1;
							}
							else prog++;												
					}					
					Morris.Donut({
						element: 'morris-donut-example7',
						data: [
							{label: "Ολοκληρωμένα", value: res},
							{label: "Σε εξέλιξη", value: prog}
						],
					colors: ['#90EE90', '#CD5C5C']
				});
				});							
	  });
	  }();
}]);
				
app.controller('yphresia1', ['$scope', '$http', function ($scope, $http) {	
		$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%B5%CF%80%CE%AF%CE%BB%CF%85%CF%83%CE%B7%CF%82%20%CF%80%CF%81%CE%BF%CE%B2%CE%BB%CE%B7%CE%BC%CE%AC%CF%84%CF%89%CE%BD").then(function (response) {
					
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
							if (response.data[i].status=="IN_PROGRESS"){
									count_progress++;
								}
							else count_resolved++;
							}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-41 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-10 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
app.controller('yphresia2', ['$scope', '$http', function ($scope, $http) {	
	$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%91%CF%85%CF%84%CE%BF%CF%84%CE%B5%CE%BB%CE%AD%CF%82%20%CF%84%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A0%CE%BF%CE%BB%CE%B9%CF%84%CE%B9%CE%BA%CE%AE%CF%82%20%CE%A0%CF%81%CE%BF%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-42 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-11 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
	app.controller('yphresia3', ['$scope', '$http', function ($scope, $http) {
	$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A3%CF%85%CE%B3%CE%BA%CE%BF%CE%B9%CE%BD%CF%89%CE%BD%CE%B9%CE%B1%CE%BA%CE%BF%CF%8D%20%26%20%CE%9A%CF%85%CE%BA%CE%BB%CE%BF%CF%86%CE%BF%CF%81%CE%B9%CE%B1%CE%BA%CE%BF%CF%8D%20%CE%A3%CF%87%CE%B5%CE%B4%CE%B9%CE%B1%CF%83%CE%BC%CE%BF%CF%8D").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-43 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-12 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
			app.controller('yphresia4', ['$scope', '$http', function ($scope, $http) {
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%80%CE%BF%CE%BA%CE%BF%CE%BC%CE%B9%CE%B4%CE%AE%CF%82%20%CE%91%CF%80%CE%BF%CF%81%CF%81%CE%B9%CE%BC%CE%BC%CE%AC%CF%84%CF%89%CE%BD%20%26%20%CE%91%CE%BD%CE%B1%CE%BA%CF%85%CE%BA%CE%BB%CF%8E%CF%83%CE%B9%CE%BC%CF%89%CE%BD%20%CE%A5%CE%BB%CE%B9%CE%BA%CF%8E%CE%BD").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-44 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
														var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-13 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
app.controller('yphresia5', ['$scope', '$http', function ($scope, $http) {				
				$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%85%CF%84%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82%20%CE%88%CF%81%CE%B3%CF%89%CE%BD%20%CE%A5%CF%80%CE%BF%CE%B4%CE%BF%CE%BC%CE%AE%CF%82").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-45 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-14 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();	
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						});
	
					});
					
	}]);
		app.controller('yphresia6', ['$scope', '$http', function ($scope, $http) {			
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%91%CF%85%CF%84%CE%B5%CF%80%CE%B9%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82%20%CE%9A%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-46 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-15 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();	 
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
					});
	
					});
					
	}]);
				app.controller('yphresia7', ['$scope', '$http', function ($scope, $http) {	
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%9A%CF%84%CE%B9%CF%81%CE%AF%CF%89%CE%BD%20%26%20%CE%97%CE%BB%CE%B5%CE%BA%CF%84%CF%81%CE%BF%CF%86%CF%89%CF%84%CE%B9%CF%83%CE%BC%CE%BF").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-47 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-16 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
				app.controller('yphresia8', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%95%CE%BB%CE%AD%CE%B3%CF%87%CE%BF%CF%85%20%CE%9A%CE%BF%CE%B9%CE%BD%CE%BF%CF%87%CF%81%CE%AE%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-48 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-17 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();	 
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
				app.controller('yphresia9', ['$scope', '$http', function ($scope, $http) {	
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9A%CE%B1%CE%B8%CE%B1%CF%81%CE%B9%CF%83%CE%BC%CE%BF%CF%8D%20%CE%9A%CE%BF%CE%B9%CE%BD%CE%BF%CF%87%CF%81%CE%AE%CF%83%CF%84%CF%89%CE%BD%20%CE%A7%CF%8E%CF%81%CF%89%CE%BD%20%26%20%CE%95%CE%B9%CE%B4%CE%B9%CE%BA%CF%8E%CE%BD%20%CE%A3%CF%85%CE%BD%CE%B5%CF%81%CE%B3%CE%B5%CE%AF%CF%89%CE%BD").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-49 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-18 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();	 
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
		app.controller('yphresia10', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9C%CE%B5%CE%BB%CE%B5%CF%84%CF%8E%CE%BD%20%CE%88%CF%81%CE%B3%CF%89%CE%BD%20%CE%A0%CF%81%CE%B1%CF%83%CE%AF%CE%BD%CE%BF%CF%85").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-410 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-19 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();	
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
			app.controller('yphresia11', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%9F%CE%B4%CE%BF%CF%80%CE%BF%CE%B9%CE%AF%CE%B1%CF%82").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-411 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-20 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();	
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
					});
	
					});
					
	}]);
					app.controller('yphresia12', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get( "http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A0%CF%81%CE%B1%CF%83%CE%AF%CE%BD%CE%BF%CF%85").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-412 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-21 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
					app.controller('yphresia13', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED&departments=%CE%A4%CE%BC%CE%AE%CE%BC%CE%B1%20%CE%A3%CF%87%CE%B5%CE%B4%CE%B9%CE%B1%CF%83%CE%BC%CE%BF%CF%8D%20%CE%9C%CE%B5%CE%BB%CE%B5%CF%84%CF%8E%CE%BD%20%CE%BA%CE%B1%CE%B9%20%CE%95%CE%BB%CE%AD%CE%B3%CF%87%CE%BF%CF%85").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-413 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-22 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
	
	app.controller('sygkrish1', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city="+$("#lambros").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					}
					for (var i=0;i<response.data.length;i++){
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-41 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-10 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
				app.controller('sygkrish2', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/issue?city="+$("#lambros1").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&resolution=FIXED|INVALID|DUPLICATED").then(function (response) {
					var count_resolved=0;
					var count_progress=0;
					var count_confirmed=0;
					var cnt_fixed=0;
					var cnt_invalid=0;
					var cnt_duplicated=0;
					var cnt=0;
					for (var i=0;i<response.data.length;i++){
						   if (response.data[i].resolution=="FIXED"){
								cnt_fixed++;
							}
							else if (response.data[i].resolution=="INVALID"){
								cnt_invalid++;
							}
							else if (response.data[i].resolution=="DUPLICATED"){
								cnt_duplicated++;
							}
							else cnt++;
					}
					for (var i=0;i<response.data.length;i++){
					if (response.data[i].status=="IN_PROGRESS"){
							count_progress++;
						}
						else count_resolved++;
					}
				
						var nvd3Charts = function() {
							
								var myColors = ['#90EE90', '#CD5C5C',"#00BFDD","#FF702A"];
								d3.scale.myColors = function() {
									return d3.scale.ordinal().range(myColors);
								};
								

							
							var startChart4 = function() {
								nv.addGraph(function() {
									var chart = nv.models.discreteBarChart().x(function(d) {
										return d.label;
									})//Specify the data accessors.
									.y(function(d) {
										return d.value;
									}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
									.tooltips(false)//Don't show tooltips
									.showValues(true)//...instead, show the bar value right on top of each bar.
									.transitionDuration(350)
												.color(d3.scale.myColors().range());;

									d3.select('#chart-42 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

									nv.utils.windowResize(chart.update);

									return chart;
								});

								//Each bar represents a single discrete quantity.
								function exampleData() {
									return [{
										key : "Cumulative Return",
										values : [{
											"label" : "Αποκατεστημένα",
											"value" : cnt_fixed
										}, {
											"label" : "Εσφαλμένες αναφορές",
											"value" : cnt_invalid
										}, {
											"label" : "Αναφορά σε άλλο αίτημα",
											"value" : cnt_duplicated
										}]
									}];

								}

							};
							var startChart9 = function() {
						//Regular pie chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true).color(d3.scale.myColors().range());;

							d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Donut chart example
						nv.addGraph(function() {
							var chart = nv.models.pieChart().x(function(d) {
								return d.label;
							}).y(function(d) {
								return d.value;
							}).showLabels(true)//Display pie labels
							.labelThreshold(.05)//Configure the minimum slice size for labels to show up
							.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
							.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
							.donutRatio(0.35)//Configure how big you want the donut hole size to be.
							.color(d3.scale.myColors().range());;

							d3.select("#chart-11 svg").datum(exampleData()).transition().duration(350).call(chart);

							return chart;
						});

						//Pie chart example data. Note how there is only a single array of key-value pairs.
						function exampleData() {
							return [{
								"label" : "Ολοκληρωμένα",
								"value" : count_resolved
							}, {
								"label" : "Σε εξέλιξη",
								"value" : count_progress
							}];
						}

					};

							function stream_layers(n, m, o) {
								if (arguments.length < 3)
									o = 0;
								function bump(a) {
									var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
									for (var i = 0; i < m; i++) {
										var w = (i / m - y) * z;
										a[i] += x * Math.exp(-w * w);
									}
								}

								return d3.range(n).map(function() {
									var a = [], i;
									for ( i = 0; i < m; i++)
										a[i] = o + o * Math.random();
									for ( i = 0; i < 5; i++)
										bump(a);
									return a.map(stream_index);
								});
							}

							function stream_index(d, i) {
								return {
									x : i,
									y : Math.max(0, d)
								};
							}

							return {		
								init : function() {
									startChart4();
									startChart9();
								}
							};
						}();

						nvd3Charts.init();
						
						});
	
					});
					
	}]);
					app.controller('sygkrish3', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/feelings?city="+$("#lambros").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&includeAnonymous=1").then(function (response) {
					var count_happy=0;
					var count_angry=0;
					var count_neutral=0;
					
					for (var i=0;i<response.data.length;i++){
					if (response.data[i].issue=="happy"){
							count_happy++;
						}
						else if (response.data[i].issue=="angry"){
							count_angry++;
						}
						else count_neutral++;
					}


					var nvd3Charts = function() {
						
						
							var myColors = ['#90EE90', '#CD5C5C',"#FF8C00"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};

						
								
						var startChart9 = function() {
							//Regular pie chart example
							nv.addGraph(function() {
								var chart = nv.models.pieChart().x(function(d) {
									return d.label;
								}).y(function(d) {
									return d.value;
								}).showLabels(true).color(d3.scale.myColors().range());;

								d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

								return chart;
							});

							//Donut chart example
							nv.addGraph(function() {
								var chart = nv.models.pieChart().x(function(d) {
									return d.label;
								}).y(function(d) {
									return d.value;
								}).showLabels(true)//Display pie labels
								.labelThreshold(.05)//Configure the minimum slice size for labels to show up
								.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
								.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
								.donutRatio(0.35)//Configure how big you want the donut hole size to be.
								.color(d3.scale.myColors().range());;

								d3.select("#chart-12 svg").datum(exampleData()).transition().duration(350).call(chart);

								return chart;
							});

							//Pie chart example data. Note how there is only a single array of key-value pairs.
							
										
						
						function exampleData() {
							return [{
								"label" : "Χαρούμενοι",
								"value" : count_happy
							}, {
								"label" : "Εκνευρισμένοι",
								"value" : count_angry
							}, {
								"label" : "Ουδέτεροι",
								"value" : count_neutral
							}];
						}
									
								
						};

						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}

							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}

						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}

						return {		
							init : function() {


								startChart9();
							}
						};
						
					}();

					nvd3Charts.init();
						});
	
					});
					
	}]);
					app.controller('sygkrish4', ['$scope', '$http', function ($scope, $http) {
					$("#search_btn").click("on", function(){
			$http.get("http://api.sense.city:3000/api/1.0/feelings?city="+$("#lambros1").val()+"&startdate="+$("#txt_issue1").val()+"&enddate="+$("#txt_issue2").val()+"&includeAnonymous=1").then(function (response) {
					var count_happy=0;
					var count_angry=0;
					var count_neutral=0;
					for (var i=0;i<response.data.length;i++){
					if (response.data[i].issue=="happy"){
							count_happy++;
						}
						else if (response.data[i].issue=="angry"){
							count_angry++;
						}
						else count_neutral++;
					}


					var nvd3Charts = function() {
						
						
							var myColors = ['#90EE90', '#CD5C5C',"#FF8C00"];
							d3.scale.myColors = function() {
								return d3.scale.ordinal().range(myColors);
							};

						
								
						var startChart9 = function() {
							//Regular pie chart example
							nv.addGraph(function() {
								var chart = nv.models.pieChart().x(function(d) {
									return d.label;
								}).y(function(d) {
									return d.value;
								}).showLabels(true).color(d3.scale.myColors().range());;

								d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

								return chart;
							});

							//Donut chart example
							nv.addGraph(function() {
								var chart = nv.models.pieChart().x(function(d) {
									return d.label;
								}).y(function(d) {
									return d.value;
								}).showLabels(true)//Display pie labels
								.labelThreshold(.05)//Configure the minimum slice size for labels to show up
								.labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
								.donut(true)//Turn on Donut mode. Makes pie chart look tasty!
								.donutRatio(0.35)//Configure how big you want the donut hole size to be.
								.color(d3.scale.myColors().range());;

								d3.select("#chart-13 svg").datum(exampleData()).transition().duration(350).call(chart);

								return chart;
							});

							//Pie chart example data. Note how there is only a single array of key-value pairs.
							
										
						
						function exampleData() {
							return [{
								"label" : "Χαρούμενοι",
								"value" : count_happy
							}, {
								"label" : "Εκνευρισμένοι",
								"value" : count_angry
							}, {
								"label" : "Ουδέτεροι",
								"value" : count_neutral
							}];
						}
									
								
						};

						function stream_layers(n, m, o) {
							if (arguments.length < 3)
								o = 0;
							function bump(a) {
								var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
								for (var i = 0; i < m; i++) {
									var w = (i / m - y) * z;
									a[i] += x * Math.exp(-w * w);
								}
							}

							return d3.range(n).map(function() {
								var a = [], i;
								for ( i = 0; i < m; i++)
									a[i] = o + o * Math.random();
								for ( i = 0; i < 5; i++)
									bump(a);
								return a.map(stream_index);
							});
						}

						function stream_index(d, i) {
							return {
								x : i,
								y : Math.max(0, d)
							};
						}

						return {		
							init : function() {


								startChart9();
							}
						};
						
					}();

					nvd3Charts.init();
										});
	
					});
					
	}]);
	
app.controller('chart', ['$scope','$http','$location',function ($scope,$http,$location) {
  
			var start1=$location.search().start;
				var end1=$location.search().end;	
			var tmhma=$location.search().dpt;
				console.log(start1);
				console.log(end1);
				console.log(tmhma);
			angular.extend($scope,{
				array1D:{}
			})
			$scope.array1D=[];
				$http.get("http://api.sense.city:3000/api/1.0/issue?city=patras&startdate="+start1+"&enddate="+end1+"&status=RESOLVED&image_field=0&sort=-1&limit=500&includeAnonymous=1&departments="+tmhma).then(function (response) {
					$scope.number=response.data.length;
					$scope.sum=0;
					$scope.meres=0;
					$scope.wres=0;
					$scope.lepta=0;
					$scope.m1=0;
					$scope.w1=0;
					$scope.l1=0;
					$scope.m2=0;
					$scope.w2=0;
					$scope.l2=0;
					$scope.meres2=0;
					$scope.wres2=0;
					$scope.lepta2=0;
					console.log($scope.number);
					$scope.cnt=0;
					$scope.date1=$("#txt_issue1").val();
					$scope.date2=$("#txt_issue2").val();
					console.log($scope.date1);
					for (var i=0;i<response.data.length;i++){
					 $http.get("http://api.sense.city:3000/api/1.0/fullissue/"+response.data[i]._id).then(function (response) {
						var is=false;
						$scope.issues = response.data;
						$scope.cnt++;
						var ln=$scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments.length;
						
						var k1=new Date();
						var k2=new Date();
						for (var j=1;j<ln;j++){
							if (($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1]=="RESOLVED")&&(is==false)){
								k1=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time);
								k2=Date.parse($scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time);
									$scope.m2=((k2-k1)/86300000);
									$scope.meres2=Math.floor($scope.m2);
									$scope.w2=((k2-k1)%86300000)/3600000;
									$scope.wres2=Math.floor($scope.w2);
									$scope.l2=(((k2-k1)%86300000)%3600000)/60000;
									$scope.lepta2=Math.floor($scope.l2);
									is=true;
								$scope.array1D.push({
									status : $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[j].tags[1],
									startdate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[2].creation_time,
									enddate: $scope.issues[1].bugs[Object.keys($scope.issues[1].bugs)[0]].comments[ln-1].creation_time,
									diasthma: k2-k1,
									problima: $scope.issues[0].value_desc,
									meres: $scope.meres2,
									wres: $scope.wres2,
									lepta: $scope.lepta2,
									eidos: $scope.issues[0].resolution,
									link: $scope.issues[0]._id,
									bug: $scope.issues[0].bug_id
								}
								)
							}
						}
						if (($scope.number==$scope.cnt)&&($scope.array1D.length!=0)){
							console.log($scope.array1D);
							$scope.array1D.sort(function(a,b){
								return a.diasthma-b.diasthma;
							});
							console.log($scope.array1D);
							var count=[];
							for (var j=0;j<=9;j++){
								count[j]=0;}
							var vhma=($scope.array1D[$scope.array1D.length-1].diasthma-$scope.array1D[0].diasthma)/10;
							for (var k=0;k<$scope.array1D.length;k++){
								if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma) count[0]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+vhma) count[1]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+2*vhma) count[2]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+3*vhma) count[3]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+4*vhma) count[4]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+5*vhma) count[5]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+6*vhma) count[6]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+7*vhma) count[7]++;
								else if($scope.array1D[k].diasthma<=$scope.array1D[0].diasthma+8*vhma) count[8]++;
								else count[9]++;
								}
							var nvd3Charts = function() {	
        var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
                        "#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
                        "#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
                        "#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
                        "#C51B7D","#DE77AE","#EDD3F2"];
        d3.scale.myColors = function() {
            return d3.scale.ordinal().range(myColors);
        };	
	var startChart4 = function() {
		nv.addGraph(function() {
			var chart = nv.models.discreteBarChart().x(function(d) {
				return d.label;
			})//Specify the data accessors.
			.y(function(d) {
				return d.value;
			}).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
			.tooltips(false)//Don't show tooltips
			.showValues(true)//...instead, show the bar value right on top of each bar.
			.transitionDuration(350)
                        .color(d3.scale.myColors().range());;

			d3.select('#chart-4 svg').datum(exampleData()).call(chart);

			nv.utils.windowResize(chart.update);
			chart.xAxis//Chart x-axis settings
			.axisLabel('Time (ms)').tickFormat(d3.format(',r'));
			return chart;
		});
	var num=18;
	var n = num.toString()+' '+'lepta';
		//Each bar represents a single discrete quantity.
		function exampleData() {
			return [{
				key : "Cumulative Return",
				values : [{
					"label" : "A Label",
					"value" : count[0]
				}, {
					"label" : "B Label",
					"value" : count[1]
				}, {
					"label" : "C Label",
					"value" : count[2]
				}, {
					"label" : "D Label",
					"value" : count[3]
				}, {
					"label" : "E Label",
					"value" : count[4]
				}, {
					"label" : "F Label",
					"value" : count[5]
				}, {
					"label" : "G Label",
					"value" : count[6]
				}, {
					"label" :"H Label" ,
					"value" :count[7]
				}, {
					"label" : "I Label",
					"value" : count[8]
				}, {
					"label" : "k Label",
					"value" : count[9]
				}
				]
			}];

		}

	};	
	function stream_layers(n, m, o) {
		if (arguments.length < 3)
			o = 0;
		function bump(a) {
			var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
			for (var i = 0; i < m; i++) {
				var w = (i / m - y) * z;
				a[i] += x * Math.exp(-w * w);
			}
		}
		return d3.range(n).map(function() {
			var a = [], i;
			for ( i = 0; i < m; i++)
				a[i] = o + o * Math.random();
			for ( i = 0; i < 5; i++)
				bump(a);
			return a.map(stream_index);
		});
	}
	function stream_index(d, i) {
		return {
			x : i,
			y : Math.max(0, d)
		};
	}
	return {		
		init : function() {
			
			startChart4();			
		}
	};
}();
nvd3Charts.init();
							
							
							
							
							
							
							for (var k=0;k<$scope.array1D.length;k++){

									$scope.meres+=$scope.array1D[k].meres;
									$scope.wres+=$scope.array1D[k].wres;
									$scope.lepta+=$scope.array1D[k].lepta;
									
							}
							console.log($scope.meres);
							$scope.meres=Math.floor($scope.meres/$scope.array1D.length);
							$scope.wres=Math.floor($scope.wres/$scope.array1D.length);
							$scope.lepta=Math.floor($scope.lepta/$scope.array1D.length);
						}	
				});		
				
			}
			
        });
	
		
    } 

    ]);
	
	