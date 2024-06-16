import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (request) => {
	try {
		await connectDB();
		const properties = await Property.find({});

		return new Response(JSON.stringify(properties), {
			status: 200,
		});
	} catch (error) {
		return new Response('Something went wrong', {
			status: 500,
		});
	}
};

export const POST = async () => {
	try {
		return new Response(JSON.stringify({ message: 'Sucess' }), {
			status: 2000,
		});
	} catch (error) {
		return new Response('Failed to add property');
	}
};
