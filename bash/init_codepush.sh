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

echo "CODEPUSH_ANDROID_KEY=$ANDROID_DEBUG_CODEPUSH_KEY
CODEPUSH_IOS_KEY=$IOS_DEBUG_CODEPUSH_KEY" > ../env/.env.debug
echo "CODEPUSH_ANDROID_KEY=$ANDROID_STAGING_CODEPUSH_KEY
CODEPUSH_IOS_KEY=" > ../env/.env.staging
echo "CODEPUSH_ANDROID_KEY=$ANDROID_RELEASE_CODEPUSH_KEY
CODEPUSH_IOS_KEY=$IOS_RELEASE_CODEPUSH_KEY" > ../env/.env.product