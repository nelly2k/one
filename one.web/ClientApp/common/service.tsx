export function AreEqual(left: any, right: any): boolean {

    if (Object.keys(left).length != Object.keys(right).length) {
        return false;
    }

    for (var prop in left) {
        var leftProp = left[prop];
        var rightProp = right[prop];

        if (typeof (leftProp) == 'object') {
            if (!AreEqual(leftProp, rightProp)) {
                return false;
            }
        } else {
            if (leftProp !== rightProp) {
                return false;
            }
        }
    }
    return true;
}