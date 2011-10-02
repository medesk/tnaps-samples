##############################################################################
# This build script compiles 2 components 
# using xbuild (Mono version of msbuild)
# and make components packages (tnpak)  from them.
#
# After that it packages those 2 independent
# components into application.

# Script needs the following environment variables
#
# MONO - path to mono installation
# TNAPS_SDK - path to the installed TNAPS SDK Tools
#
# Examples
# export MONO=/opt/mono-2.10.1 #typical for linux
#
# export MONO=/usr             #typical for Mac as Mono installs into /usr/bin
#
# export TNAPS_SDK=/opt/tnaps
##############################################################################

echo Building component binaries...
$MONO/bin/xbuild ./server/components.sln /t:rebuild /p:Configuration=Release /p:Platform="Any CPU"

echo Making component packages...

$MONO/bin/mono $TNAPS_SDK/tnpack.exe calculator.tnpak -component -impl ./server/calc/bin/Release/TN.ApplicationServer.Samples.Calculator.dll -author "TN LLC" -name BinaryCalculator -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0.0.0 -desc ./server/calc/compdoc.xml ./server/calc/comp.png -type clr -sign:rsa ./server/sign_key.rsa

$MONO/bin/mono $TNAPS_SDK/tnpack.exe currency.tnpak -component -impl ./server/currency/bin/Release/TN.ApplicationServer.Samples.Currency.dll -author "TN LLC" -name CurrencyMonitor -hpage http://github.com/tncor/tnaps-samples -ver 1.0.0.0 -desc ./server/currency/compdoc.xml ./server/currency/comp.png -type clr -sign:rsa ./server/sign_key.rsa

echo Making application package...

$MONO/bin/mono $TNAPS_SDK/tnpack.exe demo1.tnpak -app -author "TN LLC" -name sample_1 -hpage http://github.com/tncor/tnaps-samples copy -ver 1.0 -desc ./server/appdoc.xml ./server/app.png -dep Name=hostprovider,Version=1.0,SignatureToken=0024000004800000 r hp NONE -dep Name=BinaryCalculator,Version=1.0,SignatureToken=7F33AE53726B526A d calc NONE -dep Name=CurrencyMonitor,Version=1.0,SignatureToken=7F33AE53726B526A d currency NONE -rels hp calc -rels hp currency -sign:rsa ./server/sign_key.rsa -include calculator.tnpak calculator.tnpak public -include currency.tnpak currency.tnpak public -props ./server/app_props.xml -include:folder client /vdir permanent

echo Cleanup...

rm ./calculator.tnpak
rm ./currency.tnpak

echo Done, install demo1.tnpack into TNAPS
