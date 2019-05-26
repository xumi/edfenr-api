"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dateFns = _interopRequireDefault(require("date-fns"));

var _axios = _interopRequireDefault(require("axios"));

var _qs = require("qs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DATE_FORMAT = 'MM-DD-YYYY';
var WIDGET_ID = 1224;
_axios["default"].defaults.baseURL = 'https://apiws-espaceclient.edfenr.com';
_axios["default"].defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
_axios["default"].defaults.headers['Referer'] = 'https://espaceclient.edfenr.com/';
_axios["default"].defaults.headers['Accept'] = 'application/json, text/plain, */*';
_axios["default"].defaults.headers['Origin'] = 'https://espaceclient.edfenr.com';

var Client =
/*#__PURE__*/
function () {
  function Client(email, password) {
    _classCallCheck(this, Client);

    this.email = email, this.password = password;
    this.security = {
      token: undefined,
      expiresAt: undefined
    };
    this.user = {
      id: undefined,
      name: undefined
    };
    this.installation;
  }

  _createClass(Client, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios["default"].post('/connect', (0, _qs.stringify)({
                  grant_type: 'password',
                  UserName: this.email,
                  Password: this.password
                }));

              case 2:
                result = _context.sent;
                this.security.token = result.data.access_token;
                this.security.expiresAt = _dateFns["default"].addSeconds(new Date(), result.data.expires_in);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "getInfo",
    value: function () {
      var _getInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var token, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getAuthorization();

              case 2:
                token = _context2.sent;
                _context2.next = 5;
                return _axios["default"].get('/api/Installation/GetInstallations', {
                  headers: {
                    Authorization: "Bearer ".concat(token)
                  }
                });

              case 5:
                result = _context2.sent;
                this.user.id = result.data.id;
                this.user.name = "".concat(result.data.firstName, " ").concat(result.data.lastName);
                this.installation = result.data.places[0].installations[0].number;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getInfo() {
        return _getInfo.apply(this, arguments);
      }

      return getInfo;
    }()
  }, {
    key: "getDailyStatsFromRange",
    value: function () {
      var _getDailyStatsFromRange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(startDate, endDate) {
        var pvId, token, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getInstallationId();

              case 2:
                pvId = _context3.sent;
                _context3.next = 5;
                return this.getAuthorization();

              case 5:
                token = _context3.sent;
                _context3.next = 8;
                return _axios["default"].get('/api/Dashboard/GetGraphWidget', {
                  params: {
                    startDate: _dateFns["default"].format(startDate, DATE_FORMAT),
                    endDate: _dateFns["default"].format(endDate, DATE_FORMAT),
                    pvId: pvId,
                    type: 1,
                    widgetId: WIDGET_ID
                  },
                  headers: {
                    Authorization: "Bearer ".concat(token)
                  }
                });

              case 8:
                result = _context3.sent;
                return _context3.abrupt("return", {
                  day: startDate,
                  stats: result.data.Data.ElecEnergies
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getDailyStatsFromRange(_x, _x2) {
        return _getDailyStatsFromRange.apply(this, arguments);
      }

      return getDailyStatsFromRange;
    }()
  }, {
    key: "getDailyStatsFromDaysAgo",
    value: function getDailyStatsFromDaysAgo(distance) {
      var baseDate = _dateFns["default"].subDays(new Date(), distance);

      return this.getDailyStatsFromRange(baseDate, _dateFns["default"].addDays(baseDate, 1));
    }
  }, {
    key: "getTodayStats",
    value: function getTodayStats() {
      return this.getDailyStatsFromDaysAgo(0);
    }
  }, {
    key: "getYesterdayStats",
    value: function getYesterdayStats() {
      return this.getDailyStatsFromDaysAgo(1);
    }
  }, {
    key: "getInstallationId",
    value: function () {
      var _getInstallationId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.installation === undefined)) {
                  _context4.next = 3;
                  break;
                }

                _context4.next = 3;
                return this.getInfo();

              case 3:
                return _context4.abrupt("return", this.installation);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getInstallationId() {
        return _getInstallationId.apply(this, arguments);
      }

      return getInstallationId;
    }()
  }, {
    key: "getAuthorization",
    value: function () {
      var _getAuthorization = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var isUnauthenticated, hasAuthenticationExpired;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                isUnauthenticated = this.security.token === undefined;
                hasAuthenticationExpired = _dateFns["default"].isAfter(new Date(), this.security.expiresAt);

                if (!(isUnauthenticated || hasAuthenticationExpired)) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 5;
                return this.connect();

              case 5:
                return _context5.abrupt("return", this.security.token);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getAuthorization() {
        return _getAuthorization.apply(this, arguments);
      }

      return getAuthorization;
    }()
  }]);

  return Client;
}();

exports["default"] = Client;