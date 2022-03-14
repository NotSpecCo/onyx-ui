VERSION=$1

echo "Applying version ${VERSION} to package.json"

jq ".version = \"${VERSION}\"" ./package.json > tmp.json && mv tmp.json ./package.json
jq ".version = \"${VERSION}\"" ./package-lock.json > tmp.json && mv tmp.json ./package-lock.json
jq ".version = \"${VERSION}\"" ./package/package.json > tmp.json && mv tmp.json ./package/package.json