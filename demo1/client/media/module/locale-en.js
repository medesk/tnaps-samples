
var g_locale = {
	'type'	: 	'en-us',
	'title'	: 	'TNAPS Sample 1',
	'req' 	:{
		'tnapsVersion':'/internal/ver.json',
		'osVersion':'/internal/osver.json'
	},
	'path':{
		'icons'	: 	'media/images/icons/',
		'images'	: 	'media/images/',
		'up'		: 'up.png',
		'down'		: 'down.png',
		'up2'		: 'up2.png',
		'down2'		: 'down2.png'
	},
	'tabs':{
		'start': {'name':'start','state':true, 'header':'start','next':'multyos'},
		'multyos':{'name':'multyos','state':false, 'header':'multy os','next':'architecture'},
		'architecture':{'name':'architecture','state':false, 'header':'architecture','next':'converter'},
		'converter':{'name':'converter','state':false, 'header':'converter','next':'connector'},
		'connector':{'name':'connector','state':false, 'header':'connector','next':'credits'},
		/*'client':{'name':'client','state':false, 'header':'client','next':'credits'},*/
		'credits':{'name':'credits','state':false, 'header':'credits','next':null}
	},
	'start':{
		'header'	: 	'Welcome to TNAPS 3 Sample 1',
		'body'		: 	'\
			First of all, congratulations for that you have managed to come this far!<br/><br/> \
			This sample demonstrates some basic TNAPS usage. The web contents you see right now \
			are located inside application package and are hosted using standart TNAPS \
			Host Provider component. <br/><br/> \
		 	On the next pages you shall see a request log showing REST calls from client to the server \
		 	and server responses. This is because this app uses REST hosting mode (the other one is SOAP). \
		 	You can copy and curl logged requests manually to call server. <br/><br/> \
		 	Press [Continue] link every time you are ready to go to the next page.',
		'action'	:   'Continue',
		'next'		:	'multyos'	 
	},
	'multyos':{
		'header'	: 	'Cross-platform ready!',
		'body'		: 	'\
			TNAPS 3 runs on multiple platforms where .NET or Mono can be executed. \
			Usually it is not important for client application how server is hosted. \
			However, each client application can obtain TNAPS environment info through requests \
			to Host Provider component. \
			',
		'action'	:   'Continue',
		'next'		:	'architecture'
	},
	'architecture':{
		'header'	: 	'How it works?!',
		'body'		: 	'\
			The root component for this application is Host Provider. It references two other \
			components - binary converter and currency monitor. Host Provider receives HTTP requests \
			from client and routes them to methods of the components. For example, it routes \
			/components/currency/eur-usd.json to currency monitor method EuroDollarQuote() and returns result. <br/><br/> \
			Also, Host Provider hosts static web server with the client you see now.',
		'action'	:   'Continue',
		'next'		:	'converter'
	},
	'converter'	:{
		'header'	: 	'Convert number to binary and vise versa!',
		'body'		: 	'Modify decimal number or switch binary blocks and press green arrows to make request to component.',
		'action'	:   'Continue',
		'next'		:	'connector'
	},
	'connector'	:{
		'header'	: 	'Get connection with the whole world!',
		'body'		: 	'\
			TNAPS allows components to use internet connection if they have declared it in their manifest. \
			This kind of components are great to embed some third-party connectors into TNAPS. For example Twitter \
			or Evernote API wrappers. <br/><br/>\
			This sample component makes requests to Yahoo! finance API to get EUR/USD value. \
			Wait for the graphic to make some initial requests. Please consider that Yahoo! would update value \
			only once in 20 secods so be patient!',
		'action'	:   'Continue',
		'next'		:	'client'
	},
	/*'client'	:{
		'header'	: 	'Do you want more than a thin client? Get a thick client!!',
		'body'		: 	'You can download the thick client to your machine and use it whenever you want all days long!',
		'action'	:   'Continue',
		'next'		:	'credits'
	},*/
	'credits'	:{
		'header'	: 	'Arigato!',
		'body'		: 	'\
			We hope you\'ve enjoyed our trip and would like to manage the things by yourself! \
			Check out http://tncor.com/tnaps for more info! \
			<br/><br/> \
			Want to make this sample better? Fork it on github! http://github.com/tncor/tnaps-samples \
			<br/><br/> \
			(c) 2011 TN LLC \
			',
		'next'		:	null
	}
}

