"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuote = exports.getBase = void 0;
var axios_1 = __importDefault(require("axios"));
var markets_1 = __importDefault(require("./markets"));
var getBase = function (baseCurrency, baseVolume) {
    if (baseCurrency === void 0) { baseCurrency = 'btc'; }
    if (baseVolume === void 0) { baseVolume = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var base, filter, res, symbols;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    base = baseCurrency.toUpperCase();
                    filter = __spreadArray([], markets_1.default.fiat).map(function (str) { return base + str; });
                    return [4, axios_1.default.get('https://api.binance.com/api/v3/ticker/24hr')];
                case 1:
                    res = _a.sent();
                    symbols = [];
                    res.data.forEach(function (obj) {
                        var objSymbol = obj.symbol;
                        var objVolume = parseInt(obj.volume, 10);
                        if (objSymbol.startsWith(base) && objVolume > baseVolume) {
                            var flag_1 = 0;
                            filter.forEach(function (string) {
                                if (objSymbol === string) {
                                    flag_1 = 1;
                                }
                            });
                            if (flag_1) {
                                symbols.push({
                                    symbol: objSymbol,
                                    baseVolume: objVolume,
                                });
                            }
                        }
                    });
                    return [2, symbols.sort(function (a, b) { return b.baseVolume - a.baseVolume; })];
            }
        });
    });
};
exports.getBase = getBase;
var getQuote = function (quoteCurrency, quoteVolume) {
    if (quoteCurrency === void 0) { quoteCurrency = 'usdt'; }
    if (quoteVolume === void 0) { quoteVolume = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var quote, filter, res, symbols;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quote = quoteCurrency.toUpperCase();
                    filter = __spreadArray(__spreadArray([], markets_1.default.fiat), markets_1.default.etf).map(function (str) { return str + quote; });
                    return [4, axios_1.default.get('https://api.binance.com/api/v3/ticker/24hr')];
                case 1:
                    res = _a.sent();
                    symbols = [];
                    res.data.forEach(function (obj) {
                        var objSymbol = obj.symbol;
                        var objVolume = parseInt(obj.quoteVolume, 10);
                        if (objSymbol.endsWith(quote) && objVolume > quoteVolume) {
                            var flag_2 = 1;
                            filter.forEach(function (string) {
                                if (objSymbol.endsWith(string)) {
                                    flag_2 = 0;
                                }
                            });
                            if (flag_2) {
                                symbols.push({
                                    symbol: objSymbol,
                                    quoteVolume: objVolume,
                                });
                            }
                        }
                    });
                    return [2, symbols.sort(function (a, b) { return b.quoteVolume - a.quoteVolume; })];
            }
        });
    });
};
exports.getQuote = getQuote;
