[![Edfapay](https://edfapay.com/api/asseset/logo.png)](https://edfapay.com)

# Edfapay SDK
[![npm version](https://badge.fury.io/js/edfapay.svg)](https://badge.fury.io/js/edfapay)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

Edfapay SDK is a Node.js library that simplifies the integration with the Edfapay payment gateway. It provides a straightforward API for initiating payments, processing refunds, and checking the status of transactions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Initialization](#initialization)
  - [Initiate a Payment](#initiate-a-payment)
  - [Refund a Payment](#refund-a-payment)
  - [Check Payment Status](#check-payment-status)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Initiate Payment**: Start a payment transaction with ease.
- **Refund Payment**: Refund a transaction that has been completed.
- **Check Payment Status**: Verify the status of any payment transaction.

## Installation

Install the package via npm:

```bash
npm install edfapay
```

## Getting Started

### Initialization

To get started, you need to initialize the Edfapay SDK with your API key and secret. You can obtain these credentials by signing up for an account on the [Edfapay website](https://edfapay.com).

```typescript
import { Edfapay } from 'edfapay';

const edfapay = new Edfapay(
    EDFAPAY_API_KEY,
    EDFAPAY_SECRET_KEY,
    EDFAPAY_RETURN_URL
);
```

### Initiate a Payment
```typescript
import { OrderPayload, PayerPayload } from 'edfapay/Types';

const orderPayload: OrderPayload = {
    order_id: 'order_id_example',
    order_amount: '100.00',
    order_currency: 'USD',
    order_description: 'Product Description',
};

const payerPayload: PayerPayload = {
    payer_first_name: 'Kareem',
    payer_last_name: 'Adel',
    payer_email: 'kareem.adel.zayed@gmail.com',
    payer_ip: '192.168.1.1',
    payer_phone: '1234567890',
    payer_address: '123 Main St',
    payer_country: 'US',
    payer_city: 'New York',
    payer_zip: '10001',
};

edfapay.initiatePayment(orderPayload, payerPayload)
    .then(response => console.log('Payment initiated successfully:', response))
    .catch(error => console.error('Error initiating payment:', error.message));
```

## Sponsor

[![TarmeezTech](https://www.tarmeeztech.com/front/images/logo/logo.svg)](https://www.tarmeeztech.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
