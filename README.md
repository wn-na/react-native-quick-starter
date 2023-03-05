# React Native Quick Starter

- React Native `v0.70.6`

---

## How To Use

1. run init script

```bash
npm run init
```

2. if use fastlane, run init fastlane init script

```bash
npm run fastlane:install-plugin && npm run init:fastlane
```

3. install library

```bash
npm install
```

4. install iOS Pod

```bash
npm run ios-install:m1
# or
npm run ios-install
```

## How to Build

### Android

- build with test phone or simulator

  - **debug**

    ```
    npm run android
    ```

  - **release**
    ```
    npm run android:release
    ```

- build with `apk` file

  - **debug**

    ```
    npm run build:android-debug
    ```

  - **release**
    ```
    npm run build:android-release
    ```

---

## include library

- [x] codepush
- [x] @react-native-clipboard/clipboard
- [x] @react-native-community/masked-view
- [x] @react-native-community/netinfo
- [x] @react-native-community/push-notification-ios
- [x] @react-native-firebase/app
- [x] @react-native-firebase/messaging
- [x] react-navigation v6
- [x] axios /w mock-adapter
- [x] color-token
- [x] i18next
- [x] patch-package
- [x] qs
- [x] react-native-asset
- [x] react-native-config
- [x] react-native-device-info
- [x] react-native-fast-image
- [x] react-native-feather
- [x] react-native-gesture-handler
- [x] react-native-localize
- [x] eact-native-modal
- [x] react-native-permissions
- [x] react-native-push-notification
- [x] react-native-reanimated
- [x] react-native-safe-area-context
- [x] react-native-simple-toast
- [x] react-native-splash-screen
- [x] react-native-svg
- [x] react-native-svg-transformer
- [x] react-query
- [x] recoil
- [x] styled-components
