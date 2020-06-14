const set = name => (state, value) => {
	state[name] = value;
};

function cleanEmpty(obj) {
	for (var propName in obj) {
		if (obj[propName] === null || obj[propName] === undefined) {
			delete obj[propName];
		}
	}
}

export { set, cleanEmpty };
