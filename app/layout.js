import '@/assets/style/globals.css';

export const metadata = {
	title: 'RentGh |Rent A House ',
	description: 'Find your dream apartment',
};

export default function Main({ children }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
