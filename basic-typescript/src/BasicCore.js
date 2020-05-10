"use strict";
exports.__esModule = true;
var BasicCore = (function () {
    function BasicCore(initialValue) {
        var _this = this;
        this.doSomething = function () { return _this.state; };
        this.state = initialValue;
    }
    BasicCore.doFirst = function () { return console.info('dofirst'); };
    return BasicCore;
}());
exports["default"] = BasicCore;
//# sourceMappingURL=BasicCore.js.map