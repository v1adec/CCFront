const set = name => (state, value) => {
	state[name] = value;
};

function cleanEmpty(obj) {
	for (const propName in obj) {
		if (obj[propName] === null || obj[propName] === undefined) {
			delete obj[propName];
		}
	}
	return obj;
}

export { set, cleanEmpty };
