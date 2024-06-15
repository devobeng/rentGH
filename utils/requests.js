const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetechProperties() {
	try {
		//handle the case when domain is not available yet on deployment
		if (!apiDomain) {
			return [];
		}
		const res = await fetch(`${apiDomain}/properties`);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		console.log(error);
		return [];
	}
}

async function fetechProperty(id) {
	try {
		//handle the case when domain is not available yet on deployment
		if (!apiDomain) {
			return [];
		}
		const res = await fetch(`${apiDomain}/properties/${id}`);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		console.log(error);
		return [];
	}
}

export { fetechProperties, fetechProperty };
