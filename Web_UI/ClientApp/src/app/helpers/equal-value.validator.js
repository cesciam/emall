"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function equalValueValidator(targetKey, toMatchKey) {
    return function (group) {
        var target = group.controls[targetKey];
        var toMatch = group.controls[toMatchKey];
        var isMatch = target.value === toMatch.value;
        if (!isMatch && target.valid && toMatch.valid) {
            toMatch.setErrors({ 'DoNotMatch': true });
            return { 'DoNotMatch': true };
        }
        return;
    };
}
exports.equalValueValidator = equalValueValidator;
//# sourceMappingURL=equal-value.validator.js.map