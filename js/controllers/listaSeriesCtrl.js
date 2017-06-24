
angular.module("listaSeries").controller("listaSeriesCtrl", function ($scope,$http,$mdSidenav) {
	$scope.app = "Lista De Séries";
	$scope.series = [];
	$scope.minhasSeries = [];
	$scope.watchlist = [];
	$scope.idSerieBuscada = {};
	$scope.toggleLeft = buildToggler('left');
	$scope.notasSeries = [];
	$scope.serieDoPerfil = {};


	$scope.pesquisarSerie = function(serie){
		$http.get("https://omdbapi.com/?s=" + serie + "&apikey=93330d3c&type=series").then(function(response) {
			if(response.data.Response == "True"){
				$scope.series = response.data.Search;

			delete $scope.serie;	
			}else{
				alert("a série nao existe");
			};


	});
	}	
	 function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

	$scope.buscaInfoSerie = function(key){
		

		$http.get("https://omdbapi.com/?i=" + key + "&apikey=93330d3c").then(function(response) {
			
				
			$scope.idSerieBuscada = response.data;
			
			$scope.mudaSerieDaVez(response.data);
			});

	}

	$scope.mudaSerieDaVez = function(serie){
		for (var i = $scope.notasSeries.length - 1; i >= 0; i--) {
			if($scope.notasSeries[i].serie.Title == serie.Title){
				$scope.serieDoPerfil = $scope.notasSeries[i];
				
			}
		}
	}


	$scope.addNota = function(serie,notaSerie){
		for (var i = $scope.notasSeries.length - 1; i >= 0; i--) {
			if($scope.notasSeries[i].serie.Title == serie.Title){
				$scope.notasSeries[i].nota = notaSerie;
				
			}
		}
		delete $scope.notaSerie;

	}
	$scope.addEpisodio = function(serie,ep){
		for (var i = $scope.notasSeries.length - 1; i >= 0; i--) {
			if($scope.notasSeries[i].serie.Title == serie.Title){
				$scope.notasSeries[i].episodio = ep;
				
			}
		}
		console.log($scope.notasSeries);	
	}

	$scope.pertencePerfil = function(serie){
		for (var i = $scope.notasSeries.length - 1; i >= 0; i--) {
			if($scope.notasSeries[i].serie.Title == serie.Title){
				return true;
				
			}
		}
		return false;
	}

	$scope.verificaArray = function(serie,array){
		for (var i = array.length - 1; i >= 0; i--) {
			if(array[i].Title == serie.Title){
				return true;
				
			}
		}
		return false;
	}
	$scope.addSerieWatch = function(serie){
		if($scope.verificaArray(serie,$scope.watchlist)){
			alert("série já pertence ao seu watchlist");
		}else if ($scope.verificaArray(serie,$scope.minhasSeries)){ 
			alert("série já pertence ao seu perfil");

		}else{

		 
	 
		$scope.watchlist.push(serie);
		}
		
	}

	$scope.addSeriePerfil = function(serie){
		if($scope.verificaArray(serie,$scope.minhasSeries)){

			alert("série já pertence ao seu perfil");
		}else{
			$scope.minhasSeries.push(serie);
			$scope.notasSeries.push({serie,"nota":"","episodio":""});
		}
		$scope.removeSerieWatchlist(serie);
	}
	$scope.removeSerieWatchlist = function(serie){
		for (var i = $scope.watchlist.length - 1; i >= 0; i--) {
			if($scope.watchlist[i].Title == serie.Title){
				$scope.watchlist.splice(i, 1);
				
			}
		}
	}	


	$scope.confirmaExclusao = function(serie) {
    	var confirmacao = confirm("Deseja excluir " + serie.Title + "do seu perfil?");

    	if (confirmacao) {
    		$scope.removeSeriePerfil(serie);
    	} 
}

	$scope.removeSeriePerfil = function(serie){


		for (var i = $scope.minhasSeries.length - 1; i >= 0; i--) {
			if($scope.minhasSeries[i].Title == serie.Title){
				$scope.minhasSeries.splice(i, 1);
				$scope.removerNotas(serie);
			}
		}
	}	

	$scope.removerNotas = function(serie){
		for (var i = $scope.notasSeries.length - 1; i >= 0; i--) {
			if($scope.notasSeries[i].serie.Title == serie.Title){
				$scope.notasSeries.splice(i, 1);
				
			}
		}
	}
	

  

  



  
  

});