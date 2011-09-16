rem Build Components

%windir%\Microsoft.NET\Framework\v4.0.30319\msbuild server\components.sln /p:Configuration=Release /p:Platform="Any CPU"

rem Build component packages

%tnaps%\tnpack calculator.tnpak -component -impl server\calc\bin\Release\TN.ApplicationServer.Samples.Calculator.dll -author %USERNAME% -name Calculator -hpage http://tnaps.tncor.com copy -ver 1.0.0.0 -desc server\calc\compdoc.xml server\calc\comp.png -type clr -sign:rsa server\sign_key.rsa

%tnaps%\tnpack currency.tnpak -component -impl server\currency\bin\Release\TN.ApplicationServer.Samples.Currency.dll -author %USERNAME% -name Currency -hpage http://tnaps.tncor.com copy -ver 1.0.0.0 -desc server\currency\compdoc.xml server\currency\comp.png -type clr -sign:rsa server\sign_key.rsa

rem Build application package

%tnaps%\tnpack demo_app.tnpak -app -author TN -name DemoApplication1 -hpage http://tnaps.tncor.com copy -ver 1.0 -desc server\appdoc.xml server\app.png -dep Name=hostprovider,Version=1.0,SignatureToken=0024000004800000 r hp NONE -dep Name=calculator,Version=1.0,SignatureToken=7F33AE53726B526A d calc NONE -dep Name=currency,Version=1.0,SignatureToken=7F33AE53726B526A d currency NONE -rels hp calc -rels hp currency -sign:rsa server\sign_key.rsa -include Calculator.tnpak Calculator.tnpak public -include Currency.tnpak Currency.tnpak public -props server\app_props.xml -include:folder client /vdir permanent

rem Cleanup

del calculator.tnpak
del currency.tnpak
