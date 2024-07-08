import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (request) => {
	try {
		await connectDB();
		const { searchParams } = new URL(req.url);
		const location = searchParams.get('location');
		const propertyType = searchParams.get('propertyType');
		const locationPattern = new ReqExp(location, 'i');
		let query = {
			$or: [
				{ name: locationPattern },
				{ description: locationPattern },
				{ 'location.street': locationPattern },
				{ 'location.city': locationPattern },
				{ 'location.zipcode': locationPattern },
			],
		};
		//only check for proprty if its not all
		if (propertyType && propertyType !== 'all') {
			const typePattern = new RegExp(propertyType, 'i');
			query.type = typePattern;
		}
		const properties = await Property.find(query);
		return new Response(JSON.stringify(properties), {
			status: 2000,
		});
	} catch (error) {
		console.log(error);
	}
};
