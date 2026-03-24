# Sample: Standalone Google Pay on Android

A minimal React Native sample showing how to integrate Google Pay on Android
using Gr4vy as the payment gateway, without the Gr4vy SDK.

This sample mirrors the structure of
[sample-standalone-google-pay](https://github.com/gr4vy/sample-standalone-google-pay)
(the web version) and follows the
[Gr4vy Android without SDK guide](https://docs.gr4vy.com/guides/features/google-pay/mobile-without-sdk).

## How it works

1. **Get a Gr4vy API token** — your backend generates a short-lived token using your private key
2. **Fetch payment options** — call `POST /payment-options` to get the Google Pay gateway config
3. **Request payment** — pass the config into the Google Pay request; on success submit the token to Gr4vy to create a transaction

The entire integration lives in `App.js`.

## Prerequisites

- Node v18 or above
- An Android device or emulator with Google Play Services and a Google account signed in
- A Gr4vy sandbox account with an API key (`private_key.pem`)
- A connector configured in your Gr4vy dashboard that supports Google Pay

## Setup

```bash
npx @react-native-community/cli@latest init MySample --version 0.74.0
cd MySample
npm install @google/react-native-make-payment
```

Copy `App.js` into your project replacing the existing one, then update the config:

```js
const config = {
  gr4vyId: "YOUR_GR4VY_ID",
  merchantAccountId: "default",
  sandbox: true,
  amount: 12.99,
  currency: "USD",
  country: "US",
};
```

Generate a sandbox token:

```bash
node -e "
  const { Client } = require('@gr4vy/node');
  const fs = require('fs');
  const key = fs.readFileSync('./private_key.pem', 'utf8');
  const client = new Client({ gr4vyId: 'YOUR_GR4VY_ID', privateKey: key, environment: 'sandbox' });
  client.getEmbedToken({ amount: 1299, currency: 'USD' }).then(t => console.log(t));
"
```

Paste the token into `App.js` where indicated. Tokens expire after 1 hour.

Run on Android:

```bash
npx react-native run-android
```

## Docs gap: `merchantInfo.merchantId` is missing from the Android docs

The current [Android without SDK docs](https://docs.gr4vy.com/guides/features/google-pay/mobile-without-sdk)
show this `merchantInfo` example:

```js
merchantInfo: {
  merchantName: 'Example Merchant',
}
```

This is incomplete. `merchantId` is also required:

```js
merchantInfo: {
  merchantId: "BCR2DN4T7C3KX6DY", // Gr4vy's platform-level Google Pay merchant ID
  merchantName: googlePayOptions.merchant_name,
}
```

`BCR2DN4T7C3KX6DY` is Gr4vy's platform-level Google Pay merchant ID — the same
for every merchant on the Gr4vy platform. This value is documented on the
[web without Embed page](https://docs.gr4vy.com/guides/features/google-pay/web-without-sdk)
but is missing from the Android page.

## Going to production

Sandbox works without any Gr4vy configuration changes. To switch to production:

```js
const config = { sandbox: false, ... };
```

Add to `android/gradle.properties`:

```
GOOGLE_PAY_ENVIRONMENT=PRODUCTION
```
