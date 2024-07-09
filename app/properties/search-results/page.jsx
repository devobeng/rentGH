'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import PropertySearchForm from '@/components/PropertySearchForm';
const SearchResultsPage = () => {
	const searchParams = useSearchParams();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	//console.log(searchParams.get('location'), searchParams.get('propertyType'));
	const location = searchParams.get('location');
	const propertyType = searchParams.get('propertyType');
	useEffect(() => {
		const fetchSearch = async () => {
			try {
				const res = await fetch(
					`/api/properties/search?location=${location}&propertyType=${propertyType}`
				);
				if (res.status === 200) {
					const data = await res.json();
					setProperties(data);
				} else {
					setProperties([]);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchSearch();
	}, [location, propertyType]);

	return (
		<>
			<section className='bg-blue-700 py-4'>
				<div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
					<PropertySearchForm />
				</div>
			</section>
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<section className='px-4 py-6'>
					<div className='container-xl lg:container m-auto px-4 py-6'>
						<Link
							href='/properties'
							className='flex items-center text-blue-500 hover:underline mb-2'
						/>
						<h1 className='text-2xl mb-4'>Search Results</h1>
						{properties.length === 0 ? (
							<p>No Search results Found</p>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
								{properties.map((property) => (
									<PropertyCard property={property} key={property._id} />
								))}
							</div>
						)}
					</div>
				</section>
			)}
		</>
	);
};

export default SearchResultsPage;
