//start multy os architecture converter connector client credits
var refreshInterval;
window.addEvent('domready', function(){		
	document.title = g_locale.title;
	var tabList = [];
	for(var field in g_locale.tabs){
		tabList.push(g_locale.tabs[field]);
	}
	var selectTab = new SelectTabBarEl({width:440,onChange:changeTab,
		list:tabList});
	var el = selectTab.toElement();	
	$('header').adopt(el);
	
	//показать первую закладку
	var open = openTab.bind({selectTab:selectTab});
	open(g_locale.tabs.start.name, g_locale.tabs.start.next);
});

var moveTab = function(content, selectTab, name){
	var mySlide = new Fx.Slide(content, {mode: 'horizontal'});
	mySlide.slideOut().chain(function(){
		selectTab.openTab(name);
	});				
}

var changeTab = function(el,selectTab,type){
	if(typeof refreshInterval !== 'undefined')
		clearInterval(refreshInterval);
	if(type=='next'){
		var open = openTab.bind({selectTab:selectTab});
		open(el.name, el.next);
	}
	else
		moveTab($('content').getElement('div'),selectTab,el.name);	
}

var openTab = function(name, next){
	var selectTab = this.selectTab;
	var header, body, action;
	header = g_locale[name].header;
	body = g_locale[name].body;
	action = g_locale[name].action;

	var tab;	
	if(typeof next !== 'undefined' && next != null){
		tab = new Tab({header:header,body:body,
			action:{name:action, 
				ifunc:function(content, tabClean){
					if(typeof /*tabClean.*/refreshInterval !== 'undefined')
						clearInterval(refreshInterval);
					moveTab(content, selectTab, next);//g_locale.tabs.multyos.name			
				}	
			}
		});}
	else
		tab = new Tab({header:header,body:body});	
	
	if(name === 'architecture')
		tab.addImage('model.png');
	if(name === 'converter')	
		tab.addConverter();
	if(name === 'connector')	
		tab.addConnector();	
	if(name === 'multyos')	
		tab.addServerInfo();
	if(name === 'credits')	
		tab.addCredits();		
	refreshInterval = tab.refreshInterval;	
		
	$('content').empty().adopt(tab.content);
	var mySlide = new Fx.Slide(tab.content, {mode: 'horizontal'});
	mySlide.hide();
	mySlide.slideIn();
}