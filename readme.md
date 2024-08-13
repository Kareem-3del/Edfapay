

[![Msegat](https://www.msegat.com/public/assets/img/logo/msegat.png)](https://www.msegat.com/)
[![TarmeezTech](https://www.tarmeeztech.com/front/images/logo/logo.svg)]()


## Sponsored & Supported by [TarmeezTech](https://www.tarmeeztech.com/)

# Msegat
[![npm](https://img.shields.io/npm/dm/msegat)](https://www.npmjs.com/package/msegat)
[![npm](https://img.shields.io/npm/v/msegat)](https://www.npmjs.com/package/msegat)
[![npm](https://img.shields.io/npm/dt/msegat)](https://www.npmjs.com/package/msegat)
[![GitHub](https://img.shields.io/github/license/abranhe/msegat)]()
[![Msegat](https://msegat.com/public/assets/img/preview/sms.png)]()

A Node.js package for interacting with the Msegat API to send SMS messages, calculate message costs, and more.

## Installation

You can install the `msegat` package using npm:

```bash
npm install msegat
```

## Usage

### Importing the Package

To use the `msegat` package, import it into your Node.js application:

```javascript
const { Msegat } = require('msegat');
```

```typescript
import { Msegat } from 'msegat';
```

### Configuration

Create an instance of the `Msegat` class by providing your Msegat credentials:

```javascript
const msegat = new Msegat('YOUR_USERNAME', 'YOUR_API_KEY', 'YOUR_USER_SENDER');
```

### Methods

#### `sendMessage(number: string, message: string): Promise<any>`

Send a message to a single number.

- **Parameters:**
  - `number` (string): The recipient's phone number.
  - `message` (string): The message content.

- **Returns:** A promise that resolves with the API response.

**Example:**

```javascript
msegat.sendMessage('1234567890', 'Hello, World!')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

#### `sendPersonalizedMessages(numbers: string[], msg: string, vars: object[], options?: object): Promise<any>`

Send personalized messages to multiple numbers with variables.

- **Parameters:**
  - `numbers` (string[]): An array of recipient phone numbers.
  - `msg` (string): The message content.
  - `vars` (object[]): An array of variables for message personalization.
  - `options` (object, optional): Additional options (e.g., `timeToSend`, `exactTime`, `msgEncoding`, `reqBulkId`, `reqFilter`).

- **Returns:** A promise that resolves with the API response.

**Example:**

```javascript
const numbers = ['1234567890', '0987654321'];
const msg = 'Hello, {name}!';
const vars = [{ name: 'John' }, { name: 'Jane' }];

msegat.sendPersonalizedMessages(numbers, msg, vars)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

#### `calculateMessageCost(contactType: string, contacts: string, msg: string, by: string, msgEncoding: string): Promise<any>`

Calculate the cost of sending a message.

- **Parameters:**
  - `contactType` (string): Type of contacts (e.g., 'single', 'bulk').
  - `contacts` (string): Contact details.
  - `msg` (string): The message content.
  - `by` (string): Calculation method.
  - `msgEncoding` (string): Message encoding (e.g., 'UTF8').

- **Returns:** A promise that resolves with the API response.

**Example:**

```javascript
msegat.calculateMessageCost('single', '1234567890', 'Hello, World!', 'per_sms', 'UTF8')
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## Error Handling

The methods will throw an error if the request fails. Make sure to handle errors using `try...catch` or `.catch()`.

```javascript
msegat.sendMessage('1234567890', 'Hello, World!')
  .then(response => console.log(response))
  .catch(error => console.error('Error:', error.message));
```

## License

This package is licensed under the MIT License.
