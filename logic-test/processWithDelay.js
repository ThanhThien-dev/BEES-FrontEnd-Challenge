var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
// Custom error class for invalid input
var InvalidInputError = /** @class */ (function (_super) {
    __extends(InvalidInputError, _super);
    function InvalidInputError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "InvalidInputError";
        return _this;
    }
    return InvalidInputError;
}(Error));
// Utility function to create a delay
var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
// Main function with required and bonus features
function processWithDelay(numbers_1) {
    return __awaiter(this, arguments, void 0, function (numbers, options) {
        var _a, delayMs, onProgress, signal, i;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = options.delayMs, delayMs = _a === void 0 ? 1000 : _a, onProgress = options.onProgress, signal = options.signal;
                    // Validate input
                    if (!Array.isArray(numbers)) {
                        throw new InvalidInputError("Input must be an array");
                    }
                    if (!numbers.every(function (num) { return typeof num === "number" && !isNaN(num); })) {
                        throw new InvalidInputError("All elements must be valid numbers");
                    }
                    // Handle empty array
                    if (numbers.length === 0) {
                        return [2 /*return*/, Promise.resolve()];
                    }
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < numbers.length)) return [3 /*break*/, 4];
                    if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
                        throw new Error("Process was aborted");
                    }
                    console.log(numbers[i]); // Print current number
                    // Report progress if callback is provided
                    if (onProgress) {
                        onProgress(i + 1, numbers.length);
                    }
                    if (!(i < numbers.length - 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, delay(delayMs)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Test cases to demonstrate functionality
(function () { return __awaiter(_this, void 0, void 0, function () {
    var controller_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                // Test 1: Basic functionality
                console.log("Test 1: Basic processing");
                return [4 /*yield*/, processWithDelay([1, 2, 3])];
            case 1:
                _a.sent();
                // Test 2: Empty array
                console.log("\nTest 2: Empty array");
                return [4 /*yield*/, processWithDelay([])];
            case 2:
                _a.sent();
                console.log("Empty array processed successfully");
                // Test 3: Custom delay and progress
                console.log("\nTest 3: Custom delay and progress");
                return [4 /*yield*/, processWithDelay([1, 2, 3, 4, 5, 6], {
                        delayMs: 3500,
                        onProgress: function (current, total) {
                            return console.log("Progress: ".concat(current, "/").concat(total));
                        },
                    })];
            case 3:
                _a.sent();
                // Test 4: Cancellation
                console.log("\nTest 4: Cancellation");
                controller_1 = new AbortController();
                setTimeout(function () { return controller_1.abort(); }, 1200); // Abort after 1.2s
                return [4 /*yield*/, processWithDelay([1, 2, 3, 4], { signal: controller_1.signal })];
            case 4:
                _a.sent();
                // Test 5: Invalid input
                console.log("\nTest 5: Invalid input");
                return [4 /*yield*/, processWithDelay([1, "2", 3])];
            case 5:
                _a.sent(); // Should throw error
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error:", error_1.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); })();
