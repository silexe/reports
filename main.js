var jq = $.noConflict();
		var app = angular.module('report', ['ngSanitize']);
		app.controller('myCtrl',['$scope', '$http', function($scope, $http) {
			$scope.prefile = '';
			$scope.err = false;
			$scope.err2 = false;
			$scope.yay = false;
			$scope.res = false;
			$scope.add = function() {
				if($scope.query == "" || $scope.query == undefined || $scope.query == 'undefined') {
					$scope.err = true;
				}else{
					$scope.err = false;
					$scope.res = true;
					$scope.newq = '\t\t{\n\t\t\t"title": "' + $scope.title + '",\n\t\t\t"query": "' + $scope.clean($scope.query) + '"\n\t\t}';
					if($scope.file !== undefined && $scope.file !== 'undefined' && $scope.file !== '') {
						$scope.prefile = $scope.prefile + ',\n' + $scope.newq;
					}else{
						$scope.prefile = $scope.newq;
					}
					$scope.file = 'reports({\n\t"queries": [\n' + $scope.prefile + '\n\t]\n});';
					$scope.display = $scope.file;
				}
			}
			$scope.reset = function() {
				$scope.prefile = '';
				$scope.file = '';
				$scope.res = false;
			}
			$scope.clean = function(line) {
				return line.replace(/\n/g, '\\n');
			}
			$scope.close = function(type) {
				switch(type) {
					case 1:
						$scope.err2 = false;
						break;
					case 2:
						$scope.yay = false;
						break;
				}
			}
			$scope.cleanprefile = function(line) {
				var end= line.indexOf('\n\t]\n});');
				console.log(end);
				var respondo = line.substring(24, end);
				return respondo;
			}
			$scope.post = function() {
				$scope.cleand = encodeURI($scope.file);
				$scope.data = 'fname=' + $scope.name + '&fdata=' + $scope.cleand + '&io=write';
				$http.post('/v/reports/zfile.asp', $scope.data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
					then(function(response){
						$scope.datas = response.data.indexOf("<success>");
						$scope.datae = response.data.indexOf("<error>");
						if($scope.datas > -1 ){
							$scope.end = response.data.indexOf("</success>");
							$scope.poopy = response.data.substring($scope.datas+9,$scope.end);
							$scope.success = "	File created:	" + $scope.poopy;
							$scope.yay = true;
							$scope.res = false;
						}else if($scope.datae > -1) {
							$scope.end = response.data.indexOf("</error>");
							$scope.poopy = response.data.substring($scope.datae+7,$scope.end);
							$scope.warning = '	' + $scope.poopy;
							$scope.err2 = true;
						}else {
							$scope.display = "You done goofed"
						}
					}, function(response) {	
						$scope.warning = 'Server error: ' + response.status + response.statusText;
						$scope.err2 = true;
					})
			}
			$scope.read = function() {
				$scope.data = 'fname=' + $scope.name + '&io=read';
				$http.post('/v/reports/zfile.asp', $scope.data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
					then(function(response){
						$scope.datas = response.data.indexOf("<success>");
						$scope.datae = response.data.indexOf("<error>");
						if($scope.datas > -1 ){
							if(response.data.indexOf("undefined") > -1){
								$scope.warning = 'File was empty';
								$scope.res = false;
								$scope.err2 = true;
							} else {
								$scope.end = response.data.indexOf("</success>");
								$scope.poopy = response.data.substring($scope.datas+9,$scope.end);
								$scope.file = $scope.poopy;
								$scope.display = $scope.file;
												console.log($scope.prefile);
								$scope.prefile = $scope.cleanprefile($scope.file); /*<--- clean the loaded file and load into prefile */
								console.log($scope.prefile);
								$scope.success = "File loaded";
								$scope.yay = true;
								$scope.res = true;
							}
						}else if($scope.datae > -1) {
							$scope.end = response.data.indexOf("</error>");
							$scope.poopy = response.data.substring($scope.datae+7,$scope.end);
							$scope.warning = '	' + $scope.poopy;
							$scope.err2 = true;
						}else {
							$scope.display = "You done goofed"
						}
					}, function(response) {
						$scope.warning = '     Server error: ' + response.status + ' -- ' + response.statusText;
						$scope.err2 = true;
					})
			}
		}]);