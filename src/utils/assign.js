/**
 * Created by vin on 2017/2/4.
 */

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined')
	}
	return Object(val)
}



function assign(target, source) {
	var to = toObject(target)

	for (var s = 1; s < arguments.length; s++) {
		var from = Object(arguments[s])
		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key]
			}
		}
		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(from)
			for (var i = 0; i < symbols.length; i++) {
				let propIsEnumerable = Object.prototype.propertyIsEnumerable
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]]
				}
			}
		}
	}

	return to
}

export default assign
