app.controller("mainCtrl", function($scope, $http, $alert){
	
	$http.get('http://www.esniulm.it/api/get_users.php')
	.then(
	function(success){
		console.log(success.data);
		alerts.connectionError.hide();
		$scope.users = success.data;
	},
	function(failure){
		console.log(failure.status+' '+failure.statusText); 
		alerts.authNeeded.hide();
		return alerts.connectionError.show();
	});
	
	var alerts = {
		connectionError: $alert({
			title: 'Ooops..',
			content: 'si &egrave; verificato un errore di connessione!',
			type: 'danger',
			container: '#messageBox',
			show: false
		}),
		authNeeded: $alert({
			title: 'ATTENZIONE',
			content: 'Per visualizzare i contenuti di questa applicazione, devi inserire la password del tuo account IULManager',
			type: 'warning',
			container: '#messageBox',
			show: true
		}),
		authDenied: $alert({
			title: 'NON AUTORIZZATO',
			content: 'La password inserita non &egrave; corretta.',
			type: 'danger',
			container: '#messageBox',
			show: false
		})
	};
	
	
	$scope.warningRemove = function(){
		return alerts.authNeeded.hide();
	}
	
	
	$scope.authorized = false;
	$scope.user;
	$scope.pic = '../ufficio/img/fotoprofilo/nopic.jpg';
	$scope.userPic = function(img){
		$scope.pic = '../ufficio/img/fotoprofilo/'+img+'.jpg';
	}
	
	$scope.authCheck = function(){
		if (!$scope.password || $scope.password == ''){
			alerts.authDenied.hide();
			alerts.authNeeded.show();
		} else { 
		alerts.authNeeded.hide();
		alerts.authDenied.show(); 
		}
		var users = $scope.users;
		var psw = $scope.password;
		for (i in users.credentials){
			$scope.authorized = false;
			if (users.credentials[i].password == psw){
				$scope.authorized = true;
				$scope.userPic(users.credentials[i].picture);
				$scope.user = users.credentials[i].firstname + ' ' + users.credentials[i].lastname;
				alerts.authNeeded.hide();
				alerts.authDenied.hide();
				break;
			}
		}
		($scope.authorized) ? console.log('autorizzato') : console.log('non autorizzato');
	};
})