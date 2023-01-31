#!/usr/bin/env bash

echo "================ Android ================";
read -p "Enter codepush debug key: " ANDROID_DEBUG_CODEPUSH_KEY;
read -p "Enter codepush staging key: " ANDROID_STAGING_CODEPUSH_KEY;
read -p "Enter codepush release key: " ANDROID_RELEASE_CODEPUSH_KEY;
echo "=========================================";
echo "================== iOS ==================";
read -p "Enter codepush debug key: " IOS_DEBUG_CODEPUSH_KEY;
read -p "Enter codepush release key: " IOS_RELEASE_CODEPUSH_KEY;
echo "=========================================";

sed -ri '' "s/CODEPUSH_KEY_IOS_DEBUG/$IOS_DEBUG_CODEPUSH_KEY/" ios/*/*.pbxproj
sed -ri '' "s/CODEPUSH_KEY_IOS_RELEASE/$IOS_RELEASE_CODEPUSH_KEY/" ios/*/*.pbxproj
sed -ri '' "s/(CODEPUSH_KEY_ANDROID_DEBUG=)/\1$ANDROID_DEBUG_CODEPUSH_KEY/" android/gradle.properties
sed -ri '' "s/(CODEPUSH_KEY_ANDROID_STAGING=)/\1$ANDROID_STAGING_CODEPUSH_KEY/" android/gradle.properties
sed -ri '' "s/(CODEPUSH_KEY_ANDROID_RELEASE=)/\1$ANDROID_RELEASE_CODEPUSH_KEY/" android/gradle.properties
 