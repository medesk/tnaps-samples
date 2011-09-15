
var g_locale = {
	'type'	: 	'en-us',
	'title'	: 	'TNAPS DEMO',
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
		'header'	: 	'Welcome to TNAPS 3 Hello World Demo!',
		'body'		: 	'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		'action'	:   'Continue',
		'next'		:	'multyos'	 
	},
	'multyos':{
		'header'	: 	'Flight free with multi-os technologies!',
		'body'		: 	'',
		'action'	:   'Continue',
		'next'		:	'architecture'
	},
	'architecture':{
		'header'	: 	'How it works?!',
		'body'		: 	'',
		'action'	:   'Continue',
		'next'		:	'converter'
	},
	'converter'	:{
		'header'	: 	'Convert number to binary and vise versa!',
		'body'		: 	'',
		'action'	:   'Continue',
		'next'		:	'connector'
	},
	'connector'	:{
		'header'	: 	'Get connection with the whole world!',
		'body'		: 	'',
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
		'body'		: 	'We hope you\'ve enjoyed our trip and would like to manage the things by yourself!',
		'next'		:	null
	}
}

