function TNAPS(){		
	this.binToInt = function(value, successCallback, failCallback){
		failCallback = typeof(failCallback) != 'undefined' ? failCallback : function(xhr){};
		return new Request({
			url: '/components/calc/bin_to_int.json?value=' + value,
			method: 'GET',
			noCache: true,
			onRequest: function(){},
			onFailure: failCallback,
			onSuccess: successCallback
		});	
	}
	this.intToBin = function(value, successCallback, failCallback){
		failCallback = typeof(failCallback) != 'undefined' ? failCallback : function(xhr){};
		return new Request({
			url: '/components/calc/int_to_bin.json?value=' + value,
			method: 'GET',
			noCache: true,
			onRequest: function(){},
			onFailure: failCallback,
			onSuccess: successCallback
		});	
	}
	this.eurUSD = function(successCallback, failCallback){
		failCallback = typeof(failCallback) != 'undefined' ? failCallback : function(xhr){};
		return new Request({
			url: '/components/currency/eur-usd.json',
			method: 'GET',
			noCache: true,
			onRequest: function(){},
			onFailure: failCallback,
			onSuccess: successCallback
		});	
	}
	this.osVersion = function(successCallback, failCallback){
		failCallback = typeof(failCallback) != 'undefined' ? failCallback : function(xhr){};
		return new Request({
			url: g_locale.req.osVersion,
			method: 'GET',
			noCache: true,
			onRequest: function(){},
			onFailure: failCallback,
			onSuccess: successCallback
		});	
	}
	this.tnapsVersion = function(successCallback, failCallback){
		failCallback = typeof(failCallback) != 'undefined' ? failCallback : function(xhr){};
		return new Request({
			url: g_locale.req.tnapsVersion,
			method: 'GET',
			noCache: true,
			onRequest: function(){},
			onFailure: failCallback,
			onSuccess: successCallback
		});	
	}
}