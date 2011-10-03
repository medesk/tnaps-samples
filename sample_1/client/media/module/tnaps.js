// object with interfaces for calling server side of application
function TNAPS(){		
	// Binary Converter method
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
	// Binary Converter Method
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
	// Currency Monitor Method
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
	// TNAPS HostProvider component method
	this.osVersion = function(successCallback, failCallback){
		failCallback = typeof(failCallback) != 'undefined' ? failCallback : function(xhr){};
		return new Request({
			url: '/internal/osver.json',
			method: 'GET',
			noCache: true,
			onRequest: function(){},
			onFailure: failCallback,
			onSuccess: successCallback
		});	
	}
	// TNAPS HostProvider component method
	this.tnapsVersion = function(successCallback, failCallback){
		failCallback = typeof(failCallback) != 'undefined' ? failCallback : function(xhr){};
		return new Request({
			url: '/internal/ver.json',
			method: 'GET',
			noCache: true,
			onRequest: function(){},
			onFailure: failCallback,
			onSuccess: successCallback
		});	
	}
}