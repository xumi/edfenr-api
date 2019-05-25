# edfenr-api

API Wrapper for EDF ENR data about your network consumption and solar production

## Usage

```js
import { Client } from 'edfenr-api';

const { EMAIL, PASSWORD } = process.env;
const client = new Client( EMAIL, PASSWORD );
try {
  const stats = await client.getTodayStats();
  // const stats = await client.getYesterdayStats();
  // const stats = await client.getDailyStatsFromDaysAgo( 5 );
  console.log( stats );
} catch ( error ) {
  console.log( error );
}
```
