var Tab = new Class({
	Implements: Options,
	options: {		
	},
    initialize: function(params, options){
    	if(typeof options !== 'undefined')
    		this.setOptions(options);
    	//this.header = params.header;
    	//this.body = params.body;
    	//this.action = params.action;	
    	this.content = new Element('div');
    	this.createContent(params.header, params.body, params.action);
    	this.tnaps = new TNAPS();
    	this.refreshInterval;
    },
    createContent: function(header, body, action)
    {
    	this.header = new Element('div', {'class':'h2', 'html':header});
    	this.body = new Element('div', {'class':'body', 'html':body});
    	this.content.adopt([this.header,this.body]);
    	this.log = new Element('div', {'id':'log', 'html':'Started'});
    	this.log.hide();
    	this.body.grab(this.log, 'after');
    	var that = this;
    	if(typeof action !== 'undefined'){
    		var callback = typeof action.ifunc !== 'undefined' ? action.ifunc : function(){}
    		this.action = new Element('div', {'class':'next','html':action.name});

    		this.action.addEvent('click',function(){ 
    			callback(that.content, that);
    		});
    		this.content.adopt(this.action);
    	}
    },
    addImage: function(image){
    	this.body.empty();
    	var img = new Element('img',{src:g_locale.path.images + image});
    	if(g_locale.architecture.body!==''){
    		var text = new Element('div',{'html':g_locale.architecture.body,'class':'explScheme'});
    		this.body.adopt(text);  
    	}
    	this.body.adopt(img);
    	
    },
    addConverter: function(){
    	var that = this;
    	this.log.show();
    	var value = 0;
    	var binVal = '0000000';
    	var content = new Element('div');
    	var decimal = new Element('div',{'class':'decimal'});
    	var up = new Element('img',{src:g_locale.path.icons + g_locale.path.up});
    	var number = new Element('div',{'class':'number', 'html':value});
    	var down = new Element('img',{src:g_locale.path.icons + g_locale.path.down});
    	
    	up.setStyle('cursor','pointer').addEvent('mousedown',function(){
    		if(value<127)
    			number.set('html',++value);
    	});
    	
    	down.setStyle('cursor','pointer').addEvent('mousedown',function(){
    		if(value>0)
    			number.set('html',--value);
    	});
    	content.adopt([up,number,down]);
    	
    	var operation = new Element('div');
    	var up2 = new Element('img',{src:g_locale.path.icons + g_locale.path.up2});
    	var down2 = new Element('img',{src:g_locale.path.icons + g_locale.path.down2});    	    	    	
    	
    	operation.adopt(up2,down2);
    	content.adopt(operation);
    	
    	var binary = new Element('div',{'class':'binary', 'html':binVal});
    	content.adopt(binary);
    	
    	up2.setStyle('cursor','pointer').addEvent('click',function(){
    		var resp = function(responseText){
    			that.addToLog('Response: '+responseText);
    			number.set('html',responseText);
    			value = parseInt(responseText);
    		}
    		binVal = binary.get('text');
    		that.addToLog('Request: /components/calc/bin_to_int.json?value=' + binVal);		
    		that.addToLog('Pending...');
    		that.tnaps.binToInt(binVal,resp,that.fail.bind(that)).send();
    	});
    	
    	down2.setStyle('cursor','pointer').addEvent('click',function(){
    		//var num = that.convertToBinary(value);
    		//binary.set('html',num);    		
    		var resp = function(responseText){
    			that.addToLog('Response: '+responseText);
    			var zero ='';
    			var result = JSON.parse(responseText);
    			for(var i=0,ii=7-result.length;i<ii;i++){
    				zero+='0';
    			}
    			
    			binary.set('html',zero+result);
    			var bits = that.content.getElements('.bit');
    			for(var i=0,ii=result.length;i<ii;i++){
    				var bit = result.substr(result.length-i-1,1);
    				if(bit == '1'){
    					bits[6-i].addClass('on');
    					bits[6-i].setStyle('background-color','green');
    				}
    				else{
    					bits[6-i].removeClass('on');
    					bits[6-i].setStyle('background-color','gray');
    				}
    			}
    		}    
    		that.addToLog('Request: /components/calc/int_to_bin.json?value=' + value);	
    		that.addToLog('Pending...');			
    		that.tnaps.intToBin(value,resp,that.fail.bind(that)).send();
    	});
    	
    	var binGraphic = new Element('div',{'class':'binGraphic'});
    	for(var i=0,ii=7;i<ii;i++){
    		var bit = new Element('div',{'class':'bit'});
    		binGraphic.adopt(bit);
    	}
    	
    	binGraphic.getElements('.bit').setStyle('cursor','pointer').addEvent('click',function(){
    		if(this.hasClass('on')){
    			this.removeClass('on');
    			this.setStyle('background-color','gray');
    		}
    		else{
    			this.addClass('on');
    			this.setStyle('background-color','green');
    		}
    		var result = '';
    		binGraphic.getElements('.bit').each(function(bit){
    			if(bit.hasClass('on'))
    				result+='1';
    			else
    				result+='0';	
    		});
    		binary.set('html',result);
    	});
    	
    	content.adopt(binGraphic);
    	
    	this.body.empty();
    	
    	if(g_locale.converter.body!==''){
    			var text = new Element('div',{'html':g_locale.converter.body,'class':'explConverter'});
    			this.body.adopt(text);  
    		} 
    	
    	this.body.adopt(content);
    },
    addConnector:function(){
    	var that = this;
    	this.log.show();
    	
    	var content = new Element('div');    	
    	var table_content = "<thead><tr><th>EUR/USD</th></tr></thead><tbody></tbody><tfoot><tr><td></td></tr></tfoot>";
    	var el = new Element('table', {'id':'chart', 'html':table_content});
    	//var el = $('chart');
    	var cleanEl = table_content;
    	//cleanEl.getElement('tbody').empty();
    	content.adopt(el.setStyle('display','block'));
    	
    	this.body.empty()
    	if(g_locale.connector.body!==''){
    			var text = new Element('div',{'html':g_locale.connector.body,'class':'explConnector'});
    			this.body.adopt(text);  
    		} 
    	this.body.adopt(content);
    	content.hide();
    	
    	var options = {
				chart_type: "Column",
				width: 480,
		        height: 100,
				colors: ['#4f81bd', '#c0504d', '#9bbb59', '#8064a2'],
		        padding: 12,
		        font: "Arial",
		        fontColor: "#000000",
		        fontSize: 12,
		        background: "transparent",
		        chartLineColor: "#878787",
		        chartLineWeight: 1,
		        border: false,
		        borderWeight: 1,
		        borderColor: "#878787",
		        titleSize: 18,
		        titleFont: "Arial",
		        titleColor: "#000000",
		        showRowNames: false,
		        showValues: true,
		        showKey: true,
				useZero: false
			};
  
    	//var chart = new MilkChart['Line'](el,options);
  	
    	
    	//http://127.0.0.1:8085/client/index.html
		var func = function(){	
			var update = function(responseText){
				content.show();
				that.addToLog('Response: '+responseText);
				//var content2 = new Element('div'); 		
				var table = new Element('table', {'id':'chart', 'html':cleanEl});
				var r = JSON.parse(responseText);
				var newRow = new Element('tr',{'html':'<td>'+r+'</td>'});
				//alert(table.getElements('tfoot'));
		    	table.getElement('tbody').adopt(newRow);
		    	var newX = new Element('td',{'html':''});
		    	table.getElement('tfoot').getElement('tr').adopt(newX);
		    	cleanEl = table.get('html');
		    	content.empty().adopt(table);
		    	var chart = new MilkChart['Line'](table,options); 	
	    	}
	    	that.addToLog('Request: /components/currency/eur-usd.json');
	    	that.addToLog('Pending...');
	    	that.tnaps.eurUSD(update, that.fail.bind(that)).send();	   	    		
    	}
		func();
    	this.refreshInterval = setInterval(func, 5000);
    },  
    addToLog: function(msg){
    	var html = this.log.get('html');
    	this.log.set('html',msg+'<br>'+html);
    }, 
    fail:function(xhr){
	 	this.addToLog('Failed: ' + xhr.responseText);
	},	
    addServerInfo: function(){
    	var that = this;
    	this.log.show();
    	
    	var content = new Element('div'); 
    	var tnapsVersion = new Element('div',{'html':'TNAPS Version: '}); 
    	var osVersion = new Element('div',{'html':'OS Version: '}); 
    	content.adopt([tnapsVersion,osVersion]);
    	
    	var getTnapsVersion = function(responseText){
    		that.addToLog('Response: '+responseText);
    		tnapsVersion.set('html',tnapsVersion.get('html') + JSON.parse(responseText));
    		that.addToLog('Request: ' + g_locale.req.osVersion);
    		that.addToLog('Pending...');
    		that.tnaps.osVersion(getOsVersion,that.fail.bind(that)).send();	    		
    	}
    	var getOsVersion = function(responseText){
    		that.addToLog('Response: '+responseText);
    		osVersion.set('html',osVersion.get('html') + JSON.parse(responseText));
    		that.body.empty().adopt(content);  
    		if(g_locale.multyos.body!==''){
    			var text = new Element('div',{'html':g_locale.multyos.body,'class':'explServer'});
    			that.body.adopt(text);  
    		} 
    	}
    	that.addToLog('Request: ' + g_locale.req.tnapsVersion);
    	that.addToLog('Pending...');
    	that.tnaps.tnapsVersion(getTnapsVersion,that.fail.bind(that)).send();	
    },
    convertToBinary: function(dec) {
        var bits = [];
        var dividend = dec;
        var remainder = 0;
        while (dividend >= 2) {
            remainder = dividend % 2;
            bits.push(remainder);
            dividend = (dividend - remainder) / 2;
        }
        bits.push(dividend);
        bits.reverse();
        return bits.join("");
    },
    addCredits: function(){ 
    	var that=this;   	
    	this.header.addEvent('click', function(){
    		var el = new Element('div',{'style':'margin-top:30px;' });
    		var textarea = new Element('textarea',
    			{'id':'cheerleader','rows':5,'cols':14, 'style':'background-color: transparent;border: none; resize: none; overflow:hidden;outline: none;color:#927742;'});
    		el.adopt(textarea);
    		that.body.adopt(el);
    		var myScript = Asset.javascript('media/module/x.js', {
			    onLoad: function(){
			        showAct();
			    }
			});
    	}); 
    	var showAct = function(){
    		tick();
    	}   	
    }
});