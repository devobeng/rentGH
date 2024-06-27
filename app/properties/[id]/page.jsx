'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetechProperty } from '@/utils/requests';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import Spinner from '@/components/Spinner';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyShareButtons from '@/components/PropertyShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';
const PropertyPage = () => {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [loading, setLoading] = useState(true);
	const fetcData = async () => {
		try {
			if (!id) return;
			const property = await fetechProperty(id);
			setProperty(property);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (property === null) {
			fetcData();
		}
	}, [id, property]);

	if (!property && !loading) {
		<h1 className='text-center text-2xl font-bold mt-10'>
			Property not Found
		</h1>;
	}
	return (
		<>
			{loading && <Spinner loading={loading} />}
			{!loading && property && (
				<>
					<PropertyHeaderImage
						image={property?.images ? property?.images[0] : undefined}
					/>
					<section>
						<div className='container m-auto py-6 px-6'>
							<Link
								href='/properties'
								className='text-blue-500 hover:text-blue-600 flex items-center'>
								<FaArrowLeft className=' mr-2' /> Back to Properties
							</Link>
						</div>
					</section>

					<section className='bg-blue-50'>
						<div className='container m-auto py-10 px-6'>
							<div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
								<PropertyDetails property={property} />
								<aside className='space-y-4'>
									<BookmarkButton property={property} />

									<PropertyShareButtons property={property} />
									<PropertyContactForm property={property} />
								</aside>
							</div>
						</div>
					</section>
					<PropertyImages images={property.images} />
				</>
			)}
		</>
	);
};

export default PropertyPage;
