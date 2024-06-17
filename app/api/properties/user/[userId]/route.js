import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (request, { params }) => {
	try {
		await connectDB();
		//userId becuase of the folder naming
		const userId = params.userId;
		if (!userId) {
			return Response('User Id is required', { status: 400 });
		}
		const properties = await Property.find({ owner: userId });

		return new Response(JSON.stringify(properties), {
			status: 200,
		});
	} catch (error) {
		return new Response('Something went wrong', {
			status: 500,
		});
	}
};
