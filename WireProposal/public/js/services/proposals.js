angular.module('propService', [])    
// super simple service
    // each function returns a promise object 
    .factory('Props', function($http) {
        return {
            search : function() {
                return $http.put('/api/props' );
            },
            accept : function(propData) {
                return $http.patch('/api/props/'+propData.id, {'status':1});
            },
            reject : function(propData) {
                return $http.patch('/api/props/'+propData.id, {'status':2});
            },
            canceled : function(propData) {
                return $http.patch('/api/props/'+propData.id, {'status':3});
            }
        }
    });