"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var spaceTrimer = function spaceTrimer(data) {
  var spaces = /\s/g;
  return data !== undefined ? data.replace(spaces, '') : '';
};

var _default = spaceTrimer;
exports["default"] = _default;
//# sourceMappingURL=spaceTrimer.js.map