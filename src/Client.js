import dateFns        from 'date-fns';
import axios          from 'axios';
import { stringify }  from 'qs';

const DATE_FORMAT = 'MM-DD-YYYY';
const WIDGET_ID   = 1224;

axios.defaults.baseURL                    = 'https://apiws-espaceclient.edfenr.com';
axios.defaults.headers[ 'Content-Type' ]  = 'application/x-www-form-urlencoded';
axios.defaults.headers[ 'Referer' ]       = 'https://espaceclient.edfenr.com/';
axios.defaults.headers[ 'Accept' ]        = 'application/json, text/plain, */*';
axios.defaults.headers[ 'Origin' ]        = 'https://espaceclient.edfenr.com';

export default class Client {
  constructor( email, password ) {
    this.email    = email,
    this.password = password;
    this.security = {
      token:     undefined,
      expiresAt: undefined,
    };
    this.user     = {
      id:   undefined,
      name: undefined,
    };
    this.installation;
  }

  async connect() {
    const result = await axios.post( '/connect', stringify( {
      grant_type: 'password',
      UserName:   this.email,
      Password:   this.password,
    } ) );
    this.security.token = result.data.access_token;
    this.security.expiresAt = dateFns.addSeconds( new Date(), result.data.expires_in );
  }

  async getInfo() {
    const token = await this.getAuthorization();
    const result = await axios.get( '/api/Installation/GetInstallations', {
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    } );
    this.user.id = result.data.id;
    this.user.name = `${ result.data.firstName } ${ result.data.lastName }`;
    this.installation = result.data.places[ 0 ].installations[ 0 ].number;
  }

  async getDailyStatsFromRange( startDate, endDate ) {
    const pvId = await this.getInstallationId();
    const token = await this.getAuthorization();
    const result = await axios.get( '/api/Dashboard/GetGraphWidget', {
      params: {
        startDate: dateFns.format( startDate, DATE_FORMAT ),
        endDate:   dateFns.format( endDate, DATE_FORMAT ),
        pvId,
        type:      1,
        widgetId:  WIDGET_ID,
      },
      headers: {
        Authorization: `Bearer ${ token }`,
      },
    } );

    return {
      day:   startDate,
      stats: result.data.Data.ElecEnergies,
    };
  }

  getDailyStatsFromDaysAgo( distance ) {
    const baseDate = dateFns.subDays( new Date(), distance );

    return this.getDailyStatsFromRange(
      baseDate,
      dateFns.addDays( baseDate, 1 )
    );
  }

  getTodayStats() {
    return this.getDailyStatsFromDaysAgo( 0 );
  }

  getYesterdayStats() {
    return this.getDailyStatsFromDaysAgo( 1 );
  }

  async getInstallationId() {
    if ( this.installation === undefined ) {
      await this.getInfo();
    }

    return this.installation;
  }

  async getAuthorization() {
    const isUnauthenticated = this.security.token === undefined;
    const hasAuthenticationExpired = dateFns.isAfter( new Date(), this.security.expiresAt );
    if ( isUnauthenticated || hasAuthenticationExpired ) {
      await this.connect();
    }

    return this.security.token;
  }
}
