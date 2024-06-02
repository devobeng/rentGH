import '@/assets/style/globals.css';
import Navbar from '@/components/NavBar';

export const metadata = {
	title: 'RentGh |Rent A House ',
	description: 'Find your dream apartment',
};

export default function Main({ children }) {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
