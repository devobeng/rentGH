import connectDB from '@/config/database';
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
export const dynamic = 'force-dynamic';

export const GET = async () => {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}
		const { userId } = sessionUser;
		const user = await User.findOne({ _id: userId });

		//get users bookmarks
		const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
		return new Response(JSON.stringify(bookmarks), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

export const POST = async (request) => {
	try {
		await connectDB();

		const { propertyId } = await request.json();
		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}
		const { userId } = sessionUser;
		const user = await User.findOne({ _id: userId });
		//check if property is bookmark
		let isBookmarked = user.bookmarks.includes(propertyId);
		let message;
		if (isBookmarked) {
			//if already bookmarked, remove it
			user.bookmarks.pull(propertyId);
			message = 'Bookmark removed successfully';
			isBookmarked = false;
		} else {
			// if not bookemarked, add it
			user.bookmarks.push(propertyId);
			message = 'Bookmark added sucessfully';
			isBookmarked = true;
		}
		await user.save();
		return new Response(JSON.stringify({ message, isBookmarked }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response('Some thing went wrong', { status: 500 });
	}
};
