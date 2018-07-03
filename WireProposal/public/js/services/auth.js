angular.module('authService', [])    
// super simple service
    // each function returns a promise object 
    .factory('Auth', function($http) {
        return {
            login : function(userData) {
                return $http.post('/auth',userData);
            }
        }
    });