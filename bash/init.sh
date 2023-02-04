#!/usr/bin/env bash
PROJECT_HOME=..

echo "=========================================";
read -p "Enter application name: " APPLICATION_NAME;
read -p "Enter application display name: " APPLICATION_DISPLAY_NAME;
read -p "Enter android package name(ex com.test.app): " ANDROID_PACKAGE_NAME;
read -p "Enter ios bundle name(ex com.test.app): " IOS_BUNDLE_ID;
echo "=========================================";

echo "APPLICATION_NAME=$APPLICATION_NAME
APPLICATION_DISPLAY_NAME=$APPLICATION_DISPLAY_NAME
ANDROID_PACKAGE_NAME=$ANDROID_PACKAGE_NAME
IOS_BUNDLE_ID=$IOS_BUNDLE_ID
CODEPUSH_ANDROID_KEY=
CODEPUSH_IOS_KEY=
USE_FIREBASE=false
USE_CODEPUSH=false
USE_PUSH=false" > $PROJECT_HOME/env/.env.debug

echo "APPLICATION_NAME=$APPLICATION_NAME
APPLICATION_DISPLAY_NAME=$APPLICATION_DISPLAY_NAME
ANDROID_PACKAGE_NAME=$ANDROID_PACKAGE_NAME
IOS_BUNDLE_ID=$IOS_BUNDLE_ID
CODEPUSH_ANDROID_KEY=
CODEPUSH_IOS_KEY=
USE_FIREBASE=false
USE_CODEPUSH=false
USE_PUSH=false" > $PROJECT_HOME/env/.env.staging

echo "APPLICATION_NAME=$APPLICATION_NAME
CODEPUSH_IOS_KEY=$IOS_RELEASE_CODEPUSH_KEY
ANDROID_PACKAGE_NAME=$ANDROID_PACKAGE_NAME
IOS_BUNDLE_ID=$IOS_BUNDLE_ID
CODEPUSH_ANDROID_KEY=
CODEPUSH_IOS_KEY=
USE_FIREBASE=false
USE_CODEPUSH=false
USE_PUSH=false" > $PROJECT_HOME/env/.env.product


echo ">> change app.json";
echo "{
  \"name\": \"$APPLICATION_NAME\",
  \"displayName\": \"$APPLICATION_DISPLAY_NAME\"
}" > $PROJECT_HOME/app.json
echo ">> change package.json, package-lock.json";
sed -ri '' "s/MyApp/$APPLICATION_NAME/g" $PROJECT_HOME/package*.json

FOLDER_ROOT=$(echo $ANDROID_PACKAGE_NAME | sed "s/\./\//g") 
echo ">> change android main folder";
mkdir -p $PROJECT_HOME/android/app/src/main/java/$FOLDER_ROOT 
mv -- $PROJECT_HOME/android/app/src/main/java/com/myapp/* $PROJECT_HOME/android/app/src/main/java/$FOLDER_ROOT 
# rm -rf $PROJECT_HOME/android/app/src/main/java/com/myapp

echo ">> change android debug folder";
mkdir -p $PROJECT_HOME/android/app/src/debug/java/$FOLDER_ROOT 
mv -- $PROJECT_HOME/android/app/src/debug/java/com/myapp/* $PROJECT_HOME/android/app/src/debug/java/$FOLDER_ROOT 
# rm -rf $PROJECT_HOME/android/app/src/debug/java/com/myapp

echo ">> change android package name";
find $PROJECT_HOME/android -type f | xargs perl -pi -e "s/com.myapp/$ANDROID_PACKAGE_NAME/g"
find $PROJECT_HOME/android -type f | xargs perl -pi -e "s/MyApp/$APPLICATION_NAME/g"


## ==== IOS ====

echo ">> change ios bundle id";
sed -ri '' "s/IOS_BUNDLE_ID/$IOS_BUNDLE_ID/g" $PROJECT_HOME/ios/MyApp/Info.plist
echo ">> change ios application name";
find $PROJECT_HOME/ios -type f | xargs perl -pi -e "s/MyApp/$APPLICATION_NAME/g"
find $PROJECT_HOME/ios -name "MyApp*" -exec rename -- "s/MyApp/$APPLICATION_NAME/g" {} \; 
find $PROJECT_HOME/ios -name "*.pbxproj" |xargs perl -pi -e "s/org\.reactjs\.native\.example\..\(PRODUCT_NAME:rfc1034identifier\)/com.test.com/g" 
echo ">> done";
