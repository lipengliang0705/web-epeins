var myApp = angular.module('leasing.common', []);

myApp.factory('LeasingCommon', function($q, Restangular) {
    return {
        getUserNames: function() {     	
        	var userNames = {};
    		Restangular.one('system/users').get({userName:""}).then(function(users) {
    			if (users.length < 1) {
    				console.log("no user data found.");
    			} else {
    				_(users).forEach(function(user){
    					userNames[user.id] = user.realname;
    				});
    			}
    		}, function(response) {
    			console.log("Error with status code", response.status);
    		});
        	
            return userNames;
        },

/*
        getUserNames: function() {   
        	var deferred = $q.defer();
        	var userNames = {};
    		Restangular.one('system/users').get({userName:""}).then(function(users) {
    			if (users.length < 1) {
    				console.log("no user data found.");
    			} else {
    				_(users).forEach(function(user){
    					userNames[user.id] = user.realname;
    				});
    			}
    			deferred.resolve(userNames);
    		}, function(response) {
    			console.log("Error with status code", response.status);
    			deferred.reject(response);
    		});
        	
            return deferred.promise;
        },
        */
        getDictByGroupId: function(groupId) {       	
        	var deferred = $q.defer();
        	var dics = [];
    		Restangular.one('master/syselement',groupId).get().then(function(result) {
    			_(result).forEach(function(dic){
    				//dics.push(_.pick(dic, ['eleCode', 'eleName']));
    				var item = {};
    				item.id = dic.eleCode;
    				item.name = dic.eleName;
    				dics.push(item);
    			});
    			deferred.resolve(dics);
    		}, function(response) {
    			console.log("Error with status code", response.status);
    			deferred.reject(response);
    		});
    		
    		return deferred.promise;
          
        },        

        getDictByGroupIdInt: function(groupId) {       	
        	var deferred = $q.defer();
        	var dics = [];
    		Restangular.one('master/syselement',groupId).get().then(function(result) {
    			_(result).forEach(function(dic){
    				//dics.push(_.pick(dic, ['eleCode', 'eleName']));
    				var item = {};
    				item.id = parseInt(dic.eleCode);
    				item.name = dic.eleName;
    				dics.push(item);
    			});
    			deferred.resolve(dics);
    		}, function(response) {
    			console.log("Error with status code", response.status);
    			deferred.reject(response);
    		});
    		
    		return deferred.promise;
          
        },
        
        
	    dict2Object: function(dicArray) {    	
	    	var ob = {};
			_(dicArray).forEach(function(dic){
				//ob[dic.eleCode] = dic.eleName;
				ob[dic.id] = dic.name;
			});  	
	        return ob;
	    },
	    
/*
	    dict2ObjectInt: function(dicArray) {    	
	    	var ob = {};
	    	var intId;
			_(dicArray).forEach(function(dic){
				//ob[dic.eleCode] = dic.eleName;
				intId = parseInt(dic.id);
				ob[intId] = dic.name;
			});  	
	        return ob;
	    },*/
    
	    downladPdf : function (title, content) {
	    	var form = document.createElement("form");
	    	form.name = "pdfForm";
	    	form.action="download-pdf";
	    	form.method="post";
	    	
	        var contentInput = document.createElement("input"); 
	        contentInput.name = "content"; 
	        contentInput.value = content; 
	        form.appendChild(contentInput); 
	    	
	        var titleInput = document.createElement("input"); 
	        titleInput.name = "title";
	        titleInput.value = title;
	        form.appendChild(titleInput); 

	    	form.submit();
	    },
	    
	    exportExcel : function (id) {
	    	var filename = _.now().toString();
	    	tableExport(id, filename, 'xls');
	    },
	    
	    exportCsv : function (id) {
	    	var filename = _.now().toString();
	    	tableExport(id, filename, 'csv');
	    },
    };
});