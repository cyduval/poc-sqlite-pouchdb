echo "Buiiiiiiiiiiiilding js application...";
rm -rf www
mkdir www
npm run build:cordova
echo "Done";
