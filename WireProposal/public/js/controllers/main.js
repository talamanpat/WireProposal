angular.module('mainController', ['ngCookies'])
  .controller('mainController', function($scope, $http, Props, Auth,$cookies,$window) {
        
        $scope.formData = {};

        $scope.Login = function() {
            if (!$.isEmptyObject($scope.formData)) {
           Auth.login($scope.formData)
                    .then(function(res) {
                        var data = res.data;
                        if(!data.success)
                            alert(data.message);
                        else{
                            var expireDate = new Date();
                            expireDate.setDate(expireDate.getDate() + 1);
                            $cookies.put('myToken', data.token, {'expires': expireDate});
                            $http.defaults.headers.common['x-access-token']=$cookies.myToken;
                            $window.location.href = '/index.html';
                        }
                    });
            }
        };

        //set token and redirects if the token does not exist
        if($cookies.get('myToken')===undefined && $window.location.pathname !== '/login.html')
            $window.location.href = '/login.html';
        else
            $http.defaults.headers.common['x-access-token']=$cookies.get('myToken');


        //search all proposals from the company and redirects to login if token has expired
        Props.search()
            .then(function(res) {
                if(res.data.success===false && $window.location.pathname !== '/login.html')
                    $window.location.href = '/login.html';
                $scope.props = res.data;
            });

        $scope.AcceptProp =  function() {

            if (!$.isEmptyObject($scope.formData)) {
                Props.accept($scope.formData)
                    .then(function(res) {
                        $scope.formData = {};
                        $scope.props = res.data;
                    });
            }
        };

        $scope.RejectProp =  function() {

            if (!$.isEmptyObject($scope.formData)) {
                Props.reject($scope.formData)
                    .then(function(res) {
                        $scope.formData = {};
                        $scope.props = res.data;
                    });
            }
        };

        $scope.EvaluateProp = function (prop){
            $scope.formData.id=prop.id;
            $scope.formData.description=prop.description;
            
        }

     

    });
    
    
