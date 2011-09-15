//Базовые элементы IO
var IOElement = new Class({
	Implements: Options,
	options: {
		id: false,
		name:false,
		header: false,
		el: false,
		type: 'one-eyed',
		line: true
	},
    initialize: function(options){
    	this.setOptions(options);
    	
    	if(this.options.el)
    		this.input = this.options.el;
    	else	
    		this.input = new Element('input', {'type':'text'});
    		
    	if(this.options.id)
    		this.input.set('id',this.options.id);
    },
    
    toElement: function(){
    	var input_block = new Element('div',{'class':'input_block ie_layout'});		
    	
		var line = this.options.type == 'one-eyed'?new Element('div', {'class': 'n_line' }):new Element('div', {'class': 'w_line' });
		var block = new Element('div', {'class': 'block'});	
		
		input_block.adopt(this.input);
		block.adopt([input_block,line]);
		return block;
    },
    
    //Определение css свойств
	getCssSize: function(css_class){
		Fx.CSS.Styles = ["width", "height", "marginLeft", "marginTop", "marginBottom", "top", "paddingBottom",
			"paddingLeft", "paddingTop"];		
		var size = {};
		$each(document.styleSheets, function(style){
			var rules = style.rules || style.cssRules;
			$each(rules, function(rule){
				if (!rule.selectorText.test(css_class+'$')) 
					return;
				Fx.CSS.Styles.each(function(style){
					if (!rule.style || !rule.style[style]) 
						return;	
					size[style] = rule.style[style];					
				});			
			});
		});
		return size;
	}
});
// Select Tab Bar
var SelectTabBarEl = new Class({
	Extends: IOElement,
	options: {
		onMouseover: function(){},
		onMouseleave: function(){},
		onClick: function(){},
		list: [],
		iconW: 60,
		onChange: function(){},
		emptyTab: 'Empty',
		width: 300
	},
    initialize: function(options){
    	this.parent(options);
    	this.current=null;
    	this.tabs=[]; 
    	this.history=[]; 
    	this.block= new Element('div', {'class': 'element_block block'});	
    	var that = this;
    	this.options.list.each(function(val){
    		if(val.state){
    			that.tabs.push(val);
    			that.current = that.tabs[that.tabs.length-1];
    		}
    		else
    			that.tabs.push({name:val.name,state:false, header:val.header, next:val.next});	
    	});
    	//this.img = img;
    },
    
    toElement: function(){
    	this.block.set('html','');
    	var select_block = new Element('div',{'class':'select_block'});	
		
		var backScale = new Element('div', {'class':'tabBar'});
		select_block.adopt([backScale]);
		
		var top = this;
		var left = 0;
		var dist = 0;
		dist = (this.options.width - this.tabs.length*this.options.iconW)/(this.tabs.length+1);
		
		dist = Math.floor(dist); 
		left=dist;
		this.tabs.each(function(val,index){
			var opt = new Element('div',{'pos':index, 'style':'position:relative;float:left;left:'+left+'px;cursor:pointer;width:'+top.options.iconW+'px;'});
			var name = new Element('div',{'html':val.header});
			val.div = name;
			var img;
			if(top.tabs[index].state)
				img = new Element('img', {'src': g_locale.path.icons + 'tab-selected.png'});
			else
				img = new Element('img', {'src': g_locale.path.icons + 'tab-normal.png'});	
				
			val.img = img;
			opt.adopt([img,name]);//name
			backScale.adopt(opt);
			left += dist;
			
			opt.addEvents({
				click: function(){ 
					var pos = this.get('pos'); 				
					top.current = top.tabs[pos];
					top.addHistory(top.current.name);
					//top.options.onChange(top.tabs[pos], top);					
					top.options.onChange(top.tabs[pos], top, 'click');
					
					var items = backScale.getElements('img');
					for(i=0,ii=items.length;i<ii;i++){
						if(top.tabs[i].state){
							top.tabs[i].state = false;
							items[i].set('src',g_locale.path.icons + 'tab-normal.png');
						}
					}
					
					if(!top.tabs[pos].state){
						top.tabs[pos].state = !top.tabs[pos].state;
						this.getElement('img').set('src',g_locale.path.icons + 'tab-selected.png');
					}						
				}
			});
		});
		
		if(this.options.header){
			var header = new Element('div', {'html': this.options.header});
			this.block.adopt(header);
		}	
		
		this.block.adopt([select_block]);
		return this.block;
    },   
    openTab: function(name){
    	this.current.state = false;
    	//this.current.img.set('src','tab-normal.png');
    	this.current = this.getTabByName(name);
    	this.current.state = true;
    	this.toElement();
    	this.options.onChange(this.current, this, 'next');
    },
    setName: function(name){
    	this.current.name=name;
    	this.current.div.set('html',name);
    },
    setCurrentContent: function(content){
    	this.content = content;
    },
    setTab: function(tab, rewrite){
    	rewrite = rewrite!=='undefined'?rewrite:false;
    	if(rewrite || typeof this.current.body === 'undefined'){
    		//alert(this.current.body);
    		this.current.body = tab;
    	}
    },
    closeTab: function(){    	
    	this.history.pop();  
    	var last = this.getTabByName(this.history.getLast()); 
	  	
    	if(this.tabs.length>1){
	    	this.tabs.erase(this.current);  
	    	this.current = last!=null?last:this.tabs.getLast(); 
	    	this.current.state = true;
	    	this.toElement();
	    	this.options.onChange(this.current);
    	}
    	else{
    		this.current.name = this.options.emptyTab;
    		this.current.div.set('html',this.options.emptyTab);
    		this.current.body = undefined;
    		this.options.onChange(this.current);
    	}
    },
    addTab: function(val){
    	var isNew = false;
    	//Если не открыто ни одного таба
    	if(this.current.name === this.options.emptyTab){
    		this.current.name = val.name;
    		this.current.div.set('html',val.name);
    		if(typeof val.tab !=='undefined')
    			this.current.body = val.tab;
    		this.addHistory(this.current.name);	
    		isNew = true;
    	}
    	else{
	    	this.current.state = false;
	    	var existsTab = this.getTabByName(val.name); 
	    	//Exists Tab
	    	if(existsTab!=null){ 
	    		existsTab.state = true;
	    		this.current = existsTab;
	    		this.addHistory(existsTab.name);
	    		this.toElement();
	    		this.options.onChange(this.current);
	    	}
	    	//New Tab
	    	else{
		    	val.state = true;
		    	this.tabs.push(val);    	
		    	this.current = this.tabs[this.tabs.length-1]; 
		    	this.addHistory(val.name);
		    	this.toElement();
		    	isNew = true;
	    	}
    	}
    	return isNew;
    },
    getTabByName: function(name){
    	for(var i=0,j=this.tabs.length;i<j;i++)
    		if(this.tabs[i].name === name)
    			return this.tabs[i];
    	return null;		
    },
    addHistory: function(name){
    	if(this.history.contains(name)){
    		this.history.erase(name);
    		this.history.push(name);
    	}
    	else
    		this.history.push(name);  			
    },
    test: function()
    {
    	this.block.set('html','WIII');
    }
});