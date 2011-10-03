echo Build Components

IF %PROCESSOR_ARCHITECTURE% EQU x86 (SET FRAMEWORK=%windir%\Microsoft.NET\Framework\v4.0.30319) ELSE (SET FRAMEWORK=%windir%\Microsoft.NET\Framework64\v4.0.30319)
SET MSBUILD=%FRAMEWORK%\msbuild.exe

%MSBUILD% server\components.sln /p:Configuration=Release /p:Platform="Any CPU" /t:rebuild

echo Build component packages

%tnaps%\tnpack calculator.tnpak -component -impl server\calc\bin\Release\TN.ApplicationServer.Samples.Calculator.dll -author "TN LLC" -name Calculator -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0.0.0 -desc server\calc\compdoc.xml server\calc\comp.png -type clr -sign:rsa server\sign_key.rsa

%tnaps%\tnpack currency.tnpak -component -impl server\currency\bin\Release\TN.ApplicationServer.Samples.Currency.dll -author "TN LLC" -name Currency -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0.0.0 -desc server\currency\compdoc.xml server\currency\comp.png -type clr -sign:rsa server\sign_key.rsa

echo Build application package

%tnaps%\tnpack demo_app.tnpak -app -author "TN LLC" -name sample_1 -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0 -desc server\appdoc.xml server\app.png -dep Name=hostprovider,Version=1.0,SignatureToken=0024000004800000 r hp NONE -dep Name=calculator,Version=1.0,SignatureToken=7F33AE53726B526A d calc NONE -dep Name=currency,Version=1.0,SignatureToken=7F33AE53726B526A d currency NONE -rels hp calc -rels hp currency -sign:rsa server\sign_key.rsa -include Calculator.tnpak Calculator.tnpak public -include Currency.tnpak Currency.tnpak public -props server\app_props.xml -include:folder client /vdir permanent

echo Cleanup

del calculator.tnpak
del currency.tnpak
