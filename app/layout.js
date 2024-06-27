import '@/assets/style/globals.css';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const metadata = {
	title: 'RentGh |Rent A House ',
	description: 'Find your dream apartment',
};

export default function Main({ children }) {
	return (
		<AuthProvider>
			<html lang='en'>
				<body>
					<Navbar />
					{children}
					<Footer />
					<ToastContainer />
				</body>
			</html>
		</AuthProvider>
	);
}
