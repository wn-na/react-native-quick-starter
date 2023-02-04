#!/usr/bin/env bash

timestamp=`date +%Y%m%d%H%M`

PS3="빌드 환경: "
echo "앱 빌드 대상을 선택해주세요"
select type in "Android" "iOS" "Android & iOS"
do
  case $type in 
    "Android") 
      echo "info) 안드로이드 apk 빌드를 선택했습니다"; 
      break;   
    ;; 
    "iOS") 
      echo "info) iOS ipa 빌드를 선택했습니다"; 
      break;   
    ;; 
    "Android & iOS")
      echo "info) 안드로이드 apk, iOS ipa 빌드를 선택했습니다"; 
      break;   
    ;; 
    *)
      echo "다시 입력해주세요" 
    ;;
  esac
done

echo "info) fastlane 빌드를 진행합니다"
sed -ri '' 's/(enableSeparateBuildPerCPUArchitecture = )[^\n]+/\1false/' android/app/build.gradle
case $type in
  "Android")
    fastlane android build timestamp:"$timestamp"
  ;;
  "iOS") 
    fastlane ios build timestamp:"$timestamp"
  ;; 
  "Android & iOS")
    fastlane android build timestamp:"$timestamp"
    fastlane ios build timestamp:"$timestamp"
  ;; 
esac
sed -ri '' 's/(enableSeparateBuildPerCPUArchitecture = )[^\n]+/\1true/' android/app/build.gradle
exit 0