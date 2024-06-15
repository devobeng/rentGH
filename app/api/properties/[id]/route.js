import connectDB from '@/config/database';
import Property from '@/models/Property';

import React from 'react';

export const GET = async (request, { params }) => {
	const { id } = params;

	try {
		await connectDB();
		const property = await Property.findById(id);
		return new Response(JSON.stringify(property), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
	}
};
