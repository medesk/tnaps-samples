echo off

rem This build script compiles 2 components 
rem using msbuild
rem and make components packages (tnpak)  from them.
rem
rem After that it packages those 2 independent
rem components into application.
rem
rem Script needs the following environment variables
rem
rem TNAPS_SDK - path to the installed TNAPS SDK Tools
rem
rem WARNING: tnaps_sdk should not contain final backslash!

echo Build Components

IF %PROCESSOR_ARCHITECTURE% EQU x86 (SET FRAMEWORK=%windir%\Microsoft.NET\Framework\v4.0.30319) ELSE (SET FRAMEWORK=%windir%\Microsoft.NET\Framework64\v4.0.30319)
SET MSBUILD=%FRAMEWORK%\msbuild.exe

echo Installing TNAPS assemblies to GAC

%GACUTIL% -i %TNAPS_SDK%\TN.ApplicationServer.dll
%GACUTIL% -i %TNAPS_SDK%\TN.ApplicationServer.Core.dll
%GACUTIL% -i %TNAPS_SDK%\TN.ApplicationServer.ComponentModel.dll

echo Compile C# Project

%MSBUILD% server\components.sln /p:Configuration=Release /p:Platform="Any CPU" /t:rebuild

echo Uninstalling TNAPS assemblies from GAC

%GACUTIL% -u TN.ApplicationServer
%GACUTIL% -u TN.ApplicationServer.Core
%GACUTIL% -u TN.ApplicationServer.ComponentModel

echo Build component packages

%TNAPS_SDK%\tnpack calculator.tnpak -component -impl server\calc\bin\Release\TN.ApplicationServer.Samples.Calculator.dll -author "TN LLC" -name Calculator -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0.0.0 -desc server\calc\compdoc.xml server\calc\comp.png -type clr -sign:rsa server\sign_key.rsa

%TNAPS_SDK%\tnpack currency.tnpak -component -impl server\currency\bin\Release\TN.ApplicationServer.Samples.Currency.dll -author "TN LLC" -name Currency -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0.0.0 -desc server\currency\compdoc.xml server\currency\comp.png -type clr -sign:rsa server\sign_key.rsa -envpar "Web=True"

echo Build application package

%TNAPS_SDK%\tnpack sample_1.tnpak -app -author "TN LLC" -name sample_1 -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0 -desc server\appdoc.xml server\app.png -dep Name=hostprovider,Version=1.0,SignatureToken=0024000004800000 r hp NONE -dep Name=calculator,Version=1.0,SignatureToken=7F33AE53726B526A d calc NONE -dep Name=currency,Version=1.0,SignatureToken=7F33AE53726B526A d currency NONE -rels hp calc -rels hp currency -sign:rsa server\sign_key.rsa -include Calculator.tnpak Calculator.tnpak public -include Currency.tnpak Currency.tnpak public -props server\app_props.xml -include:folder client /vdir permanent

echo Cleanup

del calculator.tnpak
del currency.tnpak

echo Done, install sample_1.tnpak into TNAPS