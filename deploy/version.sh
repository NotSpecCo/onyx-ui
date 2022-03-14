VERSION=$1

echo "Applying version ${VERSION} to ./package/package.json"

jq ".version = \"${VERSION}\"" ./package/package.json > tmp.json && mv tmp.json ./package/package.json