import cloudinary from '@/config/cloudinary';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

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

export const POST = async (request) => {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID IS required', {
				status: 401,
			});
		}
		const { userId } = sessionUser;
		const formData = await request.formData();

		// Access all values from amenities and images
		const amenities = formData.getAll('amenities');
		const images = formData
			.getAll('images')
			.filter((image) => image.name !== '');
		//create PropertyData object for database
		const propertyData = {
			type: formData.get('type'),
			name: formData.get('name'),
			description: formData.get('description'),
			location: {
				street: formData.get('location.street'),
				city: formData.get('location.city'),
				state: formData.get('location.state'),
				zipcode: formData.get('location.zipcode'),
			},
			beds: formData.get('beds'),
			baths: formData.get('baths'),
			square_feet: formData.get('square_feet'),
			amenities,
			rates: {
				weekly: formData.get('rates.weekly'),
				monthly: formData.get('rates.monthly'),
				nightly: formData.get('rates.nightly'),
			},
			seller_info: {
				name: formData.get('seller_info.name'),
				email: formData.get('seller_info.email'),
				phone: formData.get('seller_info.phone'),
			},
			owner: userId,
			//images,
		};

		//upload Image to cloudinary
		const imageUploadPromises = [];
		for (const image of images) {
			const imageBuffer = await image.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);
			//convert the image data to base64

			const imageBase64 = imageData.toString('base64');
			// Make request to upload
			const result = await cloudinary.uploader.upload(
				`data:image/ong;base64,${imageBase64}`,
				{
					folder: 'propertypulse',
				}
			);
			imageUploadPromises.push(result.secure_url);
			// wait for all images to upload

			const uploadImages = await Promise.all(imageUploadPromises);
			//add uploaded images to the propertyData object
			propertyData.images = uploadImages;
		}
		const newPrperty = new Property(propertyData);
		await newPrperty.save();

		return Response.redirect(
			`${process.env.NEXTAUTH_URL}/properties/${newPrperty._id}`
		);
		// console.log(propertyData);
		// return new Response(JSON.stringify({ message: 'Sucess' }), {
		// 	status: 200,
		// });
	} catch (error) {
		console.log(error.message);
		return new Response('Failed to add property');
	}
};
