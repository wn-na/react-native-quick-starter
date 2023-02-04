#!/usr/bin/env bash

echo "================ Android ================";
read -p "Enter android package name " ANDROID_PACKAGE_NAME;
echo "=========================================";
echo "================== iOS ==================";
read -p "Enter ios scheme: " IOS_SCHEME;
read -p "Enter ios match git: " IOS_MATCH_GIT;
read -p "Enter ios deveploer id: " IOS_DEVELOPER_ID;
read -p "Enter ios app identifier: " IOS_APP_IDENTIFIER;
echo "=========================================";
echo "================== S3 ==================";
read -p "Enter s3 access key: " S3_ACCESS_KEY;
read -p "Enter s3 secret access key: " S3_SECRET_ACCESS_KEY;
read -p "Enter s3 bucket: " S3_BUCKET;
read -p "Enter s3 region: " S3_REGION;
echo "========================================";


echo "
# iOS
IOS_SCHEME=$IOS_SCHEME
IOS_PROJECT='ios/$IOS_SCHEME.xcodeproj'
IOS_OUT_DIRECTORY='ios/out'
IOS_IPA_NAME='$IOS_SCHEME.ipa'
IOS_EXPORT_TYPE='ad-hoc'
IOS_MATCH_TYPE='adhoc'
IOS_MATCH_GIT='$IOS_MATCH_GIT'
IOS_DEVELOPER_ID='$IOS_DEVELOPER_ID'
IOS_APP_IDENTIFIER='$IOS_APP_IDENTIFIER'

# Android
ANDROID_PROJECT_DIR='android'
ANDROID_PACKAGE_NAME=$ANDROID_PACKAGE_NAME

# S3
S3_ACCESS_KEY=$S3_ACCESS_KEY
S3_SECRET_ACCESS_KEY=$S3_SECRET_ACCESS_KEY
S3_BUCKET=$S3_BUCKET
S3_REGION=$S3_REGION
" > ../fastlane/.env