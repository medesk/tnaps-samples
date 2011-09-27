###########################################
# This build script compiles 2 components 
# and make components packages from them.
# After that it packages those 2 independent
# components into application.

# Script needs the following environment variables
#
# MONO - path to mono installation (i.e. /opt/mono)
# TNAPS_SDK - path to the installed TNAPS SDK Tools (i.e. /opt/tnaps/sdk)

echo Building binaries
$MONO/bin/xbuild ./server/components.sln /t:rebuild /p:Configuration=Release /p:Platform="Any CPU"

echo Component packages

$MONO/bin/mono $TNAPS_SDK/tnpack.exe calculator.tnpak -component -impl ./server/calc/bin/Release/TN.ApplicationServer.Samples.Calculator.dll -author TN -name Calculator -hpage http://tncor.com/tnaps copy -ver 1.0.0.0 -desc ./server/calc/compdoc.xml ./server/calc/comp.png -type clr -sign:rsa ./server/sign_key.rsa

$MONO/bin/mono $TNAPS_SDK/tnpack.exe currency.tnpak -component -impl ./server/currency/bin/Release/TN.ApplicationServer.Samples.Currency.dll -author TN -name Currency -hpage http://tncor.com copy/tnaps -ver 1.0.0.0 -desc ./server/currency/compdoc.xml ./server/currency/comp.png -type clr -sign:rsa ./server/sign_key.rsa

echo Application package

$MONO/bin/mono $TNAPS_SDK/tnpack.exe demo_app.tnpak -app -author TN -name DemoApplication1 -hpage http://tncor.com/tnaps copy -ver 1.0 -desc ./server/appdoc.xml ./server/app.png -dep Name=hostprovider,Version=1.0,SignatureToken=0024000004800000 r hp NONE -dep Name=calculator,Version=1.0,SignatureToken=7F33AE53726B526A d calc NONE -dep Name=currency,Version=1.0,SignatureToken=7F33AE53726B526A d currency NONE -rels hp calc -rels hp currency -sign:rsa ./server/sign_key.rsa -include calculator.tnpak calculator.tnpak public -include currency.tnpak currency.tnpak public -props ./server/app_props.xml -include:folder client /vdir permanent

echo Cleanup

rm ./calculator.tnpak
rm ./currency.tnpak

