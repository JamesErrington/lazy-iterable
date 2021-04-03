(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LazyIterableLib = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function enumerate(iterable) {
        return new LazyIterable((function () {
            var i, iterable_1, iterable_1_1, value, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        i = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!iterable_1_1.done) return [3 , 5];
                        value = iterable_1_1.value;
                        return [4 , [i, value]];
                    case 3:
                        _b.sent();
                        i++;
                        _b.label = 4;
                    case 4:
                        iterable_1_1 = iterable_1.next();
                        return [3 , 2];
                    case 5: return [3 , 8];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 , 8];
                    case 7:
                        try {
                            if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1["return"])) _a.call(iterable_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 ];
                    case 8: return [2 ];
                }
            });
        })());
    }
    function enumerateAsync(iterable) {
        return new AsyncLazyIterable((function () {
            return __asyncGenerator(this, arguments, function () {
                var i, iterable_2, iterable_2_1, value, e_2_1;
                var e_2, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            i = 0;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 8, 9, 14]);
                            iterable_2 = __asyncValues(iterable);
                            _b.label = 2;
                        case 2: return [4 , __await(iterable_2.next())];
                        case 3:
                            if (!(iterable_2_1 = _b.sent(), !iterable_2_1.done)) return [3 , 7];
                            value = iterable_2_1.value;
                            return [4 , __await([i, value])];
                        case 4: return [4 , _b.sent()];
                        case 5:
                            _b.sent();
                            i++;
                            _b.label = 6;
                        case 6: return [3 , 2];
                        case 7: return [3 , 14];
                        case 8:
                            e_2_1 = _b.sent();
                            e_2 = { error: e_2_1 };
                            return [3 , 14];
                        case 9:
                            _b.trys.push([9, , 12, 13]);
                            if (!(iterable_2_1 && !iterable_2_1.done && (_a = iterable_2["return"]))) return [3 , 11];
                            return [4 , __await(_a.call(iterable_2))];
                        case 10:
                            _b.sent();
                            _b.label = 11;
                        case 11: return [3 , 13];
                        case 12:
                            if (e_2) throw e_2.error;
                            return [7 ];
                        case 13: return [7 ];
                        case 14: return [2 ];
                    }
                });
            });
        })());
    }
    function range(start, stop, step) {
        if (step === void 0) { step = 1; }
        if (step === 0) {
            console.warn("[LazyIterable] Constant range iterable detected - prefer to use 'repeat(item)'");
        }
        if (start < stop) {
            if (step < 0) {
                console.warn("[LazyIterable] Infinite range iterable detected - prefer to use 'infinite(start, step)'");
            }
            return new LazyIterable((function () {
                var i;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = start;
                            _a.label = 1;
                        case 1:
                            if (!(i < stop)) return [3 , 4];
                            return [4 , i];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i += step;
                            return [3 , 1];
                        case 4: return [2 ];
                    }
                });
            })());
        }
        if (step < 0) {
            console.warn("[LazyIterable] Infinite range iterable detected - prefer to use 'infinite(start, step)'");
        }
        return new LazyIterable((function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = start;
                        _a.label = 1;
                    case 1:
                        if (!(i > stop)) return [3 , 4];
                        return [4 , i];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i -= step;
                        return [3 , 1];
                    case 4: return [2 ];
                }
            });
        })());
    }
    function repeat(value) {
        return new LazyIterable((function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 , value];
                    case 1:
                        _a.sent();
                        return [3 , 0];
                    case 2: return [2 ];
                }
            });
        })());
    }
    function infinite(start, step) {
        if (start === void 0) { start = 1; }
        if (step === void 0) { step = 1; }
        if (step === 0) {
            console.warn("[LazyIterable] Repeat iterable detected - prefer to use 'repeat(value)'");
        }
        return new LazyIterable((function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = start;
                        _a.label = 1;
                    case 1:
                        return [4 , i];
                    case 2:
                        _a.sent();
                        i += step;
                        return [3 , 1];
                    case 3: return [2 ];
                }
            });
        })());
    }
    function zip(iterableA, iterableB) {
        var iterators = [iterableA, iterableB].map(function (iterable) { return LazyIterable.fromIterable(iterable); });
        return new LazyIterable((function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = iterators.map(function (iterator) { return iterator.next(); });
                        if (results.some(function (result) { return result.done; })) {
                            return [2 ];
                        }
                        return [4 , results.map(function (result) { return result.value; })];
                    case 1:
                        _a.sent();
                        return [3 , 0];
                    case 2: return [2 ];
                }
            });
        })());
    }
    function zipWith(callback, iterableA, iterableB) {
        return new LazyIterable((function () {
            var _a, _b, _c, i, _d, valueA, valueB, e_3_1;
            var e_3, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 5, 6, 7]);
                        _a = __values(enumerate(zip(iterableA, iterableB))), _b = _a.next();
                        _f.label = 1;
                    case 1:
                        if (!!_b.done) return [3 , 4];
                        _c = __read(_b.value, 2), i = _c[0], _d = __read(_c[1], 2), valueA = _d[0], valueB = _d[1];
                        return [4 , callback(valueA, valueB, i)];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 , 1];
                    case 4: return [3 , 7];
                    case 5:
                        e_3_1 = _f.sent();
                        e_3 = { error: e_3_1 };
                        return [3 , 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_e = _a["return"])) _e.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 ];
                    case 7: return [2 ];
                }
            });
        })());
    }

    var AsyncLazyIterable =  (function () {
        function AsyncLazyIterable(generator) {
            this.generator = generator;
        }
        AsyncLazyIterable.prototype[Symbol.asyncIterator] = function () {
            return this.generator;
        };
        AsyncLazyIterable.prototype.next = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 , this.generator.next()];
                });
            });
        };
        AsyncLazyIterable.prototype.take = function (items) {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    var _a, _b, _c, i, value, e_1_1;
                    var e_1, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _e.trys.push([0, 9, 10, 15]);
                                _a = __asyncValues(enumerateAsync(self));
                                _e.label = 1;
                            case 1: return [4 , __await(_a.next())];
                            case 2:
                                if (!(_b = _e.sent(), !_b.done)) return [3 , 8];
                                _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                                if (!(i >= items)) return [3 , 4];
                                return [4 , __await(void 0)];
                            case 3: return [2 , _e.sent()];
                            case 4: return [4 , __await(value)];
                            case 5: return [4 , _e.sent()];
                            case 6:
                                _e.sent();
                                _e.label = 7;
                            case 7: return [3 , 1];
                            case 8: return [3 , 15];
                            case 9:
                                e_1_1 = _e.sent();
                                e_1 = { error: e_1_1 };
                                return [3 , 15];
                            case 10:
                                _e.trys.push([10, , 13, 14]);
                                if (!(_b && !_b.done && (_d = _a["return"]))) return [3 , 12];
                                return [4 , __await(_d.call(_a))];
                            case 11:
                                _e.sent();
                                _e.label = 12;
                            case 12: return [3 , 14];
                            case 13:
                                if (e_1) throw e_1.error;
                                return [7 ];
                            case 14: return [7 ];
                            case 15: return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.takeWhile = function (predicate) {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    var _a, _b, _c, i, value, e_2_1;
                    var e_2, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _e.trys.push([0, 9, 10, 15]);
                                _a = __asyncValues(enumerateAsync(self));
                                _e.label = 1;
                            case 1: return [4 , __await(_a.next())];
                            case 2:
                                if (!(_b = _e.sent(), !_b.done)) return [3 , 8];
                                _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                                if (!predicate(value, i)) return [3 , 5];
                                return [4 , __await(value)];
                            case 3: return [4 , _e.sent()];
                            case 4:
                                _e.sent();
                                return [3 , 7];
                            case 5: return [4 , __await(void 0)];
                            case 6: return [2 , _e.sent()];
                            case 7: return [3 , 1];
                            case 8: return [3 , 15];
                            case 9:
                                e_2_1 = _e.sent();
                                e_2 = { error: e_2_1 };
                                return [3 , 15];
                            case 10:
                                _e.trys.push([10, , 13, 14]);
                                if (!(_b && !_b.done && (_d = _a["return"]))) return [3 , 12];
                                return [4 , __await(_d.call(_a))];
                            case 11:
                                _e.sent();
                                _e.label = 12;
                            case 12: return [3 , 14];
                            case 13:
                                if (e_2) throw e_2.error;
                                return [7 ];
                            case 14: return [7 ];
                            case 15: return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.drop = function (items) {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    var _a, _b, _c, i, value, e_3_1;
                    var e_3, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _e.trys.push([0, 7, 8, 13]);
                                _a = __asyncValues(enumerateAsync(self));
                                _e.label = 1;
                            case 1: return [4 , __await(_a.next())];
                            case 2:
                                if (!(_b = _e.sent(), !_b.done)) return [3 , 6];
                                _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                                if (!(i >= items)) return [3 , 5];
                                return [4 , __await(value)];
                            case 3: return [4 , _e.sent()];
                            case 4:
                                _e.sent();
                                _e.label = 5;
                            case 5: return [3 , 1];
                            case 6: return [3 , 13];
                            case 7:
                                e_3_1 = _e.sent();
                                e_3 = { error: e_3_1 };
                                return [3 , 13];
                            case 8:
                                _e.trys.push([8, , 11, 12]);
                                if (!(_b && !_b.done && (_d = _a["return"]))) return [3 , 10];
                                return [4 , __await(_d.call(_a))];
                            case 9:
                                _e.sent();
                                _e.label = 10;
                            case 10: return [3 , 12];
                            case 11:
                                if (e_3) throw e_3.error;
                                return [7 ];
                            case 12: return [7 ];
                            case 13: return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.dropWhile = function (predicate) {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    var dropping, _a, _b, _c, i, value, e_4_1;
                    var e_4, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                dropping = true;
                                _e.label = 1;
                            case 1:
                                _e.trys.push([1, 8, 9, 14]);
                                _a = __asyncValues(enumerateAsync(self));
                                _e.label = 2;
                            case 2: return [4 , __await(_a.next())];
                            case 3:
                                if (!(_b = _e.sent(), !_b.done)) return [3 , 7];
                                _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                                if (dropping && predicate(value, i) === false) {
                                    dropping = false;
                                }
                                if (!(dropping === false)) return [3 , 6];
                                return [4 , __await(value)];
                            case 4: return [4 , _e.sent()];
                            case 5:
                                _e.sent();
                                _e.label = 6;
                            case 6: return [3 , 2];
                            case 7: return [3 , 14];
                            case 8:
                                e_4_1 = _e.sent();
                                e_4 = { error: e_4_1 };
                                return [3 , 14];
                            case 9:
                                _e.trys.push([9, , 12, 13]);
                                if (!(_b && !_b.done && (_d = _a["return"]))) return [3 , 11];
                                return [4 , __await(_d.call(_a))];
                            case 10:
                                _e.sent();
                                _e.label = 11;
                            case 11: return [3 , 13];
                            case 12:
                                if (e_4) throw e_4.error;
                                return [7 ];
                            case 13: return [7 ];
                            case 14: return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.map = function (callback) {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    var _a, _b, _c, i, value, e_5_1;
                    var e_5, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _e.trys.push([0, 7, 8, 13]);
                                _a = __asyncValues(enumerateAsync(self));
                                _e.label = 1;
                            case 1: return [4 , __await(_a.next())];
                            case 2:
                                if (!(_b = _e.sent(), !_b.done)) return [3 , 6];
                                _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                                return [4 , __await(callback(value, i))];
                            case 3: return [4 , _e.sent()];
                            case 4:
                                _e.sent();
                                _e.label = 5;
                            case 5: return [3 , 1];
                            case 6: return [3 , 13];
                            case 7:
                                e_5_1 = _e.sent();
                                e_5 = { error: e_5_1 };
                                return [3 , 13];
                            case 8:
                                _e.trys.push([8, , 11, 12]);
                                if (!(_b && !_b.done && (_d = _a["return"]))) return [3 , 10];
                                return [4 , __await(_d.call(_a))];
                            case 9:
                                _e.sent();
                                _e.label = 10;
                            case 10: return [3 , 12];
                            case 11:
                                if (e_5) throw e_5.error;
                                return [7 ];
                            case 12: return [7 ];
                            case 13: return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.filter = function (predicate) {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    var _a, _b, _c, i, value, e_6_1;
                    var e_6, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _e.trys.push([0, 7, 8, 13]);
                                _a = __asyncValues(enumerateAsync(self));
                                _e.label = 1;
                            case 1: return [4 , __await(_a.next())];
                            case 2:
                                if (!(_b = _e.sent(), !_b.done)) return [3 , 6];
                                _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                                if (!predicate(value, i)) return [3 , 5];
                                return [4 , __await(value)];
                            case 3: return [4 , _e.sent()];
                            case 4:
                                _e.sent();
                                _e.label = 5;
                            case 5: return [3 , 1];
                            case 6: return [3 , 13];
                            case 7:
                                e_6_1 = _e.sent();
                                e_6 = { error: e_6_1 };
                                return [3 , 13];
                            case 8:
                                _e.trys.push([8, , 11, 12]);
                                if (!(_b && !_b.done && (_d = _a["return"]))) return [3 , 10];
                                return [4 , __await(_d.call(_a))];
                            case 9:
                                _e.sent();
                                _e.label = 10;
                            case 10: return [3 , 12];
                            case 11:
                                if (e_6) throw e_6.error;
                                return [7 ];
                            case 12: return [7 ];
                            case 13: return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.runEffect = function (effect) {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    var _a, _b, _c, i, value, e_7_1;
                    var e_7, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                _e.trys.push([0, 7, 8, 13]);
                                _a = __asyncValues(enumerateAsync(self));
                                _e.label = 1;
                            case 1: return [4 , __await(_a.next())];
                            case 2:
                                if (!(_b = _e.sent(), !_b.done)) return [3 , 6];
                                _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                                effect(value, i);
                                return [4 , __await(value)];
                            case 3: return [4 , _e.sent()];
                            case 4:
                                _e.sent();
                                _e.label = 5;
                            case 5: return [3 , 1];
                            case 6: return [3 , 13];
                            case 7:
                                e_7_1 = _e.sent();
                                e_7 = { error: e_7_1 };
                                return [3 , 13];
                            case 8:
                                _e.trys.push([8, , 11, 12]);
                                if (!(_b && !_b.done && (_d = _a["return"]))) return [3 , 10];
                                return [4 , __await(_d.call(_a))];
                            case 9:
                                _e.sent();
                                _e.label = 10;
                            case 10: return [3 , 12];
                            case 11:
                                if (e_7) throw e_7.error;
                                return [7 ];
                            case 12: return [7 ];
                            case 13: return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.feedTo = function (generatorFunc) {
            return new AsyncLazyIterable(generatorFunc(this));
        };
        AsyncLazyIterable.prototype.forEach = function (callback) {
            var e_8, _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, _d, i, value, e_8_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 11]);
                            _b = __asyncValues(enumerateAsync(this));
                            _e.label = 1;
                        case 1: return [4 , _b.next()];
                        case 2:
                            if (!(_c = _e.sent(), !_c.done)) return [3 , 4];
                            _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                            callback(value, i);
                            _e.label = 3;
                        case 3: return [3 , 1];
                        case 4: return [3 , 11];
                        case 5:
                            e_8_1 = _e.sent();
                            e_8 = { error: e_8_1 };
                            return [3 , 11];
                        case 6:
                            _e.trys.push([6, , 9, 10]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 8];
                            return [4 , _a.call(_b)];
                        case 7:
                            _e.sent();
                            _e.label = 8;
                        case 8: return [3 , 10];
                        case 9:
                            if (e_8) throw e_8.error;
                            return [7 ];
                        case 10: return [7 ];
                        case 11: return [2 ];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.reduce = function (reducer, initial) {
            var e_9, _a;
            return __awaiter(this, void 0, void 0, function () {
                var accumulator, _b, _c, _d, i, value, e_9_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            accumulator = initial;
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 6, 7, 12]);
                            _b = __asyncValues(enumerateAsync(this));
                            _e.label = 2;
                        case 2: return [4 , _b.next()];
                        case 3:
                            if (!(_c = _e.sent(), !_c.done)) return [3 , 5];
                            _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                            accumulator = reducer(accumulator, value, i);
                            _e.label = 4;
                        case 4: return [3 , 2];
                        case 5: return [3 , 12];
                        case 6:
                            e_9_1 = _e.sent();
                            e_9 = { error: e_9_1 };
                            return [3 , 12];
                        case 7:
                            _e.trys.push([7, , 10, 11]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 9];
                            return [4 , _a.call(_b)];
                        case 8:
                            _e.sent();
                            _e.label = 9;
                        case 9: return [3 , 11];
                        case 10:
                            if (e_9) throw e_9.error;
                            return [7 ];
                        case 11: return [7 ];
                        case 12: return [2 , accumulator];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.some = function (predicate) {
            var e_10, _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, _d, i, value, e_10_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 11]);
                            _b = __asyncValues(enumerateAsync(this));
                            _e.label = 1;
                        case 1: return [4 , _b.next()];
                        case 2:
                            if (!(_c = _e.sent(), !_c.done)) return [3 , 4];
                            _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                            if (predicate(value, i) === true) {
                                return [2 , true];
                            }
                            _e.label = 3;
                        case 3: return [3 , 1];
                        case 4: return [3 , 11];
                        case 5:
                            e_10_1 = _e.sent();
                            e_10 = { error: e_10_1 };
                            return [3 , 11];
                        case 6:
                            _e.trys.push([6, , 9, 10]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 8];
                            return [4 , _a.call(_b)];
                        case 7:
                            _e.sent();
                            _e.label = 8;
                        case 8: return [3 , 10];
                        case 9:
                            if (e_10) throw e_10.error;
                            return [7 ];
                        case 10: return [7 ];
                        case 11: return [2 , false];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.every = function (predicate) {
            var e_11, _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, _d, i, value, e_11_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 11]);
                            _b = __asyncValues(enumerateAsync(this));
                            _e.label = 1;
                        case 1: return [4 , _b.next()];
                        case 2:
                            if (!(_c = _e.sent(), !_c.done)) return [3 , 4];
                            _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                            if (predicate(value, i) === false) {
                                return [2 , false];
                            }
                            _e.label = 3;
                        case 3: return [3 , 1];
                        case 4: return [3 , 11];
                        case 5:
                            e_11_1 = _e.sent();
                            e_11 = { error: e_11_1 };
                            return [3 , 11];
                        case 6:
                            _e.trys.push([6, , 9, 10]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 8];
                            return [4 , _a.call(_b)];
                        case 7:
                            _e.sent();
                            _e.label = 8;
                        case 8: return [3 , 10];
                        case 9:
                            if (e_11) throw e_11.error;
                            return [7 ];
                        case 10: return [7 ];
                        case 11: return [2 , true];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.includes = function (search) {
            var e_12, _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, value, e_12_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 5, 6, 11]);
                            _b = __asyncValues(this);
                            _d.label = 1;
                        case 1: return [4 , _b.next()];
                        case 2:
                            if (!(_c = _d.sent(), !_c.done)) return [3 , 4];
                            value = _c.value;
                            if (value === search) {
                                return [2 , true];
                            }
                            _d.label = 3;
                        case 3: return [3 , 1];
                        case 4: return [3 , 11];
                        case 5:
                            e_12_1 = _d.sent();
                            e_12 = { error: e_12_1 };
                            return [3 , 11];
                        case 6:
                            _d.trys.push([6, , 9, 10]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 8];
                            return [4 , _a.call(_b)];
                        case 7:
                            _d.sent();
                            _d.label = 8;
                        case 8: return [3 , 10];
                        case 9:
                            if (e_12) throw e_12.error;
                            return [7 ];
                        case 10: return [7 ];
                        case 11: return [2 , false];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.find = function (predicate) {
            var e_13, _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, _d, i, value, e_13_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 11]);
                            _b = __asyncValues(enumerateAsync(this));
                            _e.label = 1;
                        case 1: return [4 , _b.next()];
                        case 2:
                            if (!(_c = _e.sent(), !_c.done)) return [3 , 4];
                            _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                            if (predicate(value, i) === true) {
                                return [2 , value];
                            }
                            _e.label = 3;
                        case 3: return [3 , 1];
                        case 4: return [3 , 11];
                        case 5:
                            e_13_1 = _e.sent();
                            e_13 = { error: e_13_1 };
                            return [3 , 11];
                        case 6:
                            _e.trys.push([6, , 9, 10]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 8];
                            return [4 , _a.call(_b)];
                        case 7:
                            _e.sent();
                            _e.label = 8;
                        case 8: return [3 , 10];
                        case 9:
                            if (e_13) throw e_13.error;
                            return [7 ];
                        case 10: return [7 ];
                        case 11: return [2 , undefined];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.indexOf = function (search) {
            var e_14, _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, _c, _d, i, value, e_14_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 11]);
                            _b = __asyncValues(enumerateAsync(this));
                            _e.label = 1;
                        case 1: return [4 , _b.next()];
                        case 2:
                            if (!(_c = _e.sent(), !_c.done)) return [3 , 4];
                            _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                            if (value === search) {
                                return [2 , i];
                            }
                            _e.label = 3;
                        case 3: return [3 , 1];
                        case 4: return [3 , 11];
                        case 5:
                            e_14_1 = _e.sent();
                            e_14 = { error: e_14_1 };
                            return [3 , 11];
                        case 6:
                            _e.trys.push([6, , 9, 10]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 8];
                            return [4 , _a.call(_b)];
                        case 7:
                            _e.sent();
                            _e.label = 8;
                        case 8: return [3 , 10];
                        case 9:
                            if (e_14) throw e_14.error;
                            return [7 ];
                        case 10: return [7 ];
                        case 11: return [2 , -1];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.lastIndexOf = function (search) {
            var e_15, _a;
            return __awaiter(this, void 0, void 0, function () {
                var lastIndex, _b, _c, _d, i, value, e_15_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            lastIndex = -1;
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 6, 7, 12]);
                            _b = __asyncValues(enumerateAsync(this));
                            _e.label = 2;
                        case 2: return [4 , _b.next()];
                        case 3:
                            if (!(_c = _e.sent(), !_c.done)) return [3 , 5];
                            _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                            if (value === search) {
                                lastIndex = i;
                            }
                            _e.label = 4;
                        case 4: return [3 , 2];
                        case 5: return [3 , 12];
                        case 6:
                            e_15_1 = _e.sent();
                            e_15 = { error: e_15_1 };
                            return [3 , 12];
                        case 7:
                            _e.trys.push([7, , 10, 11]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 9];
                            return [4 , _a.call(_b)];
                        case 8:
                            _e.sent();
                            _e.label = 9;
                        case 9: return [3 , 11];
                        case 10:
                            if (e_15) throw e_15.error;
                            return [7 ];
                        case 11: return [7 ];
                        case 12: return [2 , lastIndex];
                    }
                });
            });
        };
        AsyncLazyIterable.fromIterable = function (iterable) {
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [5 , __values(__asyncDelegator(__asyncValues(iterable)))];
                            case 1: return [4 , __await.apply(void 0, [_a.sent()])];
                            case 2:
                                _a.sent();
                                return [2 ];
                        }
                    });
                });
            })());
        };
        AsyncLazyIterable.prototype.toSynchronousIterable = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 , this.toArray()];
                        case 1:
                            result = _a.sent();
                            return [2 , LazyIterable.fromIterable(result)];
                    }
                });
            });
        };
        AsyncLazyIterable.prototype.toArray = function () {
            var e_16, _a;
            return __awaiter(this, void 0, void 0, function () {
                var result, _b, _c, value, e_16_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            result = [];
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 12]);
                            _b = __asyncValues(this);
                            _d.label = 2;
                        case 2: return [4 , _b.next()];
                        case 3:
                            if (!(_c = _d.sent(), !_c.done)) return [3 , 5];
                            value = _c.value;
                            result.push(value);
                            _d.label = 4;
                        case 4: return [3 , 2];
                        case 5: return [3 , 12];
                        case 6:
                            e_16_1 = _d.sent();
                            e_16 = { error: e_16_1 };
                            return [3 , 12];
                        case 7:
                            _d.trys.push([7, , 10, 11]);
                            if (!(_c && !_c.done && (_a = _b["return"]))) return [3 , 9];
                            return [4 , _a.call(_b)];
                        case 8:
                            _d.sent();
                            _d.label = 9;
                        case 9: return [3 , 11];
                        case 10:
                            if (e_16) throw e_16.error;
                            return [7 ];
                        case 11: return [7 ];
                        case 12: return [2 , result];
                    }
                });
            });
        };
        return AsyncLazyIterable;
    }());

    var LazyIterable =  (function () {
        function LazyIterable(generator) {
            this.generator = generator;
        }
        LazyIterable.prototype[Symbol.iterator] = function () {
            return this.generator;
        };
        LazyIterable.prototype.next = function () {
            return this.generator.next();
        };
        LazyIterable.prototype.take = function (items) {
            var self = this;
            return new LazyIterable((function () {
                var _a, _b, _c, i, value, e_1_1;
                var e_1, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 7]);
                            _a = __values(enumerate(self)), _b = _a.next();
                            _e.label = 1;
                        case 1:
                            if (!!_b.done) return [3 , 4];
                            _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                            if (i >= items) {
                                return [2 ];
                            }
                            return [4 , value];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            _b = _a.next();
                            return [3 , 1];
                        case 4: return [3 , 7];
                        case 5:
                            e_1_1 = _e.sent();
                            e_1 = { error: e_1_1 };
                            return [3 , 7];
                        case 6:
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 ];
                        case 7: return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.takeWhile = function (predicate) {
            var self = this;
            return new LazyIterable((function () {
                var _a, _b, _c, i, value, e_2_1;
                var e_2, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 6, 7, 8]);
                            _a = __values(enumerate(self)), _b = _a.next();
                            _e.label = 1;
                        case 1:
                            if (!!_b.done) return [3 , 5];
                            _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                            if (!predicate(value, i)) return [3 , 3];
                            return [4 , value];
                        case 2:
                            _e.sent();
                            return [3 , 4];
                        case 3: return [2 ];
                        case 4:
                            _b = _a.next();
                            return [3 , 1];
                        case 5: return [3 , 8];
                        case 6:
                            e_2_1 = _e.sent();
                            e_2 = { error: e_2_1 };
                            return [3 , 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                            return [7 ];
                        case 8: return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.drop = function (items) {
            var self = this;
            return new LazyIterable((function () {
                var _a, _b, _c, i, value, e_3_1;
                var e_3, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 7]);
                            _a = __values(enumerate(self)), _b = _a.next();
                            _e.label = 1;
                        case 1:
                            if (!!_b.done) return [3 , 4];
                            _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                            if (!(i >= items)) return [3 , 3];
                            return [4 , value];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            _b = _a.next();
                            return [3 , 1];
                        case 4: return [3 , 7];
                        case 5:
                            e_3_1 = _e.sent();
                            e_3 = { error: e_3_1 };
                            return [3 , 7];
                        case 6:
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_3) throw e_3.error; }
                            return [7 ];
                        case 7: return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.dropWhile = function (predicate) {
            var self = this;
            return new LazyIterable((function () {
                var dropping, _a, _b, _c, i, value, e_4_1;
                var e_4, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            dropping = true;
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 6, 7, 8]);
                            _a = __values(enumerate(self)), _b = _a.next();
                            _e.label = 2;
                        case 2:
                            if (!!_b.done) return [3 , 5];
                            _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                            if (dropping && predicate(value, i) === false) {
                                dropping = false;
                            }
                            if (!(dropping === false)) return [3 , 4];
                            return [4 , value];
                        case 3:
                            _e.sent();
                            _e.label = 4;
                        case 4:
                            _b = _a.next();
                            return [3 , 2];
                        case 5: return [3 , 8];
                        case 6:
                            e_4_1 = _e.sent();
                            e_4 = { error: e_4_1 };
                            return [3 , 8];
                        case 7:
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_4) throw e_4.error; }
                            return [7 ];
                        case 8: return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.map = function (callback) {
            var self = this;
            return new LazyIterable((function () {
                var _a, _b, _c, i, value, e_5_1;
                var e_5, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 7]);
                            _a = __values(enumerate(self)), _b = _a.next();
                            _e.label = 1;
                        case 1:
                            if (!!_b.done) return [3 , 4];
                            _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                            return [4 , callback(value, i)];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            _b = _a.next();
                            return [3 , 1];
                        case 4: return [3 , 7];
                        case 5:
                            e_5_1 = _e.sent();
                            e_5 = { error: e_5_1 };
                            return [3 , 7];
                        case 6:
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_5) throw e_5.error; }
                            return [7 ];
                        case 7: return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.filter = function (predicate) {
            var self = this;
            return new LazyIterable((function () {
                var _a, _b, _c, i, value, e_6_1;
                var e_6, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 7]);
                            _a = __values(enumerate(self)), _b = _a.next();
                            _e.label = 1;
                        case 1:
                            if (!!_b.done) return [3 , 4];
                            _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                            if (!predicate(value, i)) return [3 , 3];
                            return [4 , value];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            _b = _a.next();
                            return [3 , 1];
                        case 4: return [3 , 7];
                        case 5:
                            e_6_1 = _e.sent();
                            e_6 = { error: e_6_1 };
                            return [3 , 7];
                        case 6:
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_6) throw e_6.error; }
                            return [7 ];
                        case 7: return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.runEffect = function (effect) {
            var self = this;
            return new LazyIterable((function () {
                var _a, _b, _c, i, value, e_7_1;
                var e_7, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 5, 6, 7]);
                            _a = __values(enumerate(self)), _b = _a.next();
                            _e.label = 1;
                        case 1:
                            if (!!_b.done) return [3 , 4];
                            _c = __read(_b.value, 2), i = _c[0], value = _c[1];
                            effect(value, i);
                            return [4 , value];
                        case 2:
                            _e.sent();
                            _e.label = 3;
                        case 3:
                            _b = _a.next();
                            return [3 , 1];
                        case 4: return [3 , 7];
                        case 5:
                            e_7_1 = _e.sent();
                            e_7 = { error: e_7_1 };
                            return [3 , 7];
                        case 6:
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_7) throw e_7.error; }
                            return [7 ];
                        case 7: return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.feedTo = function (generatorFunc) {
            return new LazyIterable(generatorFunc(this));
        };
        LazyIterable.prototype.forEach = function (callback) {
            var e_8, _a;
            try {
                for (var _b = __values(enumerate(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                    callback(value, i);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
        };
        LazyIterable.prototype.reduce = function (reducer, initial) {
            var e_9, _a;
            var accumulator = initial;
            try {
                for (var _b = __values(enumerate(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                    accumulator = reducer(accumulator, value, i);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return accumulator;
        };
        LazyIterable.prototype.some = function (predicate) {
            var e_10, _a;
            try {
                for (var _b = __values(enumerate(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                    if (predicate(value, i) === true) {
                        return true;
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
            return false;
        };
        LazyIterable.prototype.every = function (predicate) {
            var e_11, _a;
            try {
                for (var _b = __values(enumerate(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                    if (predicate(value, i) === false) {
                        return false;
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return true;
        };
        LazyIterable.prototype.includes = function (search) {
            var e_12, _a;
            try {
                for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    if (value === search) {
                        return true;
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_12) throw e_12.error; }
            }
            return false;
        };
        LazyIterable.prototype.find = function (predicate) {
            var e_13, _a;
            try {
                for (var _b = __values(enumerate(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                    if (predicate(value, i) === true) {
                        return value;
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_13) throw e_13.error; }
            }
            return undefined;
        };
        LazyIterable.prototype.indexOf = function (search) {
            var e_14, _a;
            try {
                for (var _b = __values(enumerate(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                    if (value === search) {
                        return i;
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_14) throw e_14.error; }
            }
            return -1;
        };
        LazyIterable.prototype.lastIndexOf = function (search) {
            var e_15, _a;
            var lastIndex = -1;
            try {
                for (var _b = __values(enumerate(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), i = _d[0], value = _d[1];
                    if (value === search) {
                        lastIndex = i;
                    }
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return lastIndex;
        };
        LazyIterable.prototype.join = function (separator) {
            var e_16, _a;
            if (separator === void 0) { separator = ","; }
            var result = "";
            try {
                for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var value = _c.value;
                    result += value + separator;
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_16) throw e_16.error; }
            }
            return result.substring(0, result.length - separator.length);
        };
        LazyIterable.prototype.reverse = function () {
            var reversed = this.toArray().reverse();
            return LazyIterable.fromIterable(reversed);
        };
        LazyIterable.fromIterable = function (iterable) {
            return new LazyIterable((function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [5 , __values(iterable)];
                        case 1:
                            _a.sent();
                            return [2 ];
                    }
                });
            })());
        };
        LazyIterable.prototype.toAsyncIterable = function () {
            var self = this;
            return new AsyncLazyIterable((function () {
                return __asyncGenerator(this, arguments, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [5 , __values(__asyncDelegator(__asyncValues(self)))];
                            case 1: return [4 , __await.apply(void 0, [_a.sent()])];
                            case 2:
                                _a.sent();
                                return [2 ];
                        }
                    });
                });
            })());
        };
        LazyIterable.prototype.toArray = function () {
            return Array.from(this);
        };
        return LazyIterable;
    }());

    exports.AsyncLazyIterable = AsyncLazyIterable;
    exports.LazyIterable = LazyIterable;
    exports.enumerate = enumerate;
    exports.enumerateAsync = enumerateAsync;
    exports.infinite = infinite;
    exports.range = range;
    exports.repeat = repeat;
    exports.zip = zip;
    exports.zipWith = zipWith;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
