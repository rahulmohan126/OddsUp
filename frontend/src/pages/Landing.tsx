// Import necessary libraries
import { Link } from 'react-router-dom'; // Using React Router for routing
import {
    Button,
} from "@mantine/core";
import { Mail, Twitter, Instagram } from 'lucide-react';

export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <header className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                </div>
                <div className="flex items-center space-x-4">
                    <span>3:46 PM EDT</span>
                    <Button variant="ghost" className="text-white hover:text-white/80">
                        Explore Events
                    </Button>
                    <Button variant="ghost" className="text-white hover:text-white/80">
                        Sign In
                    </Button>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-3xl text-center">
                    <h1 className="text-4xl font-bold mb-2 opacity-50">OddsUp<sup>+</sup></h1>
                    <h2 className="text-6xl font-bold mb-4">
                        Delightful<br />events<br />
                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                            start here.
                        </span>
                    </h2>
                    <p className="mb-8 text-xl text-gray-300">
                        Set up a group page, invite friends and<br />
                        challenge! Host a memorable event<br />
                        today.
                    </p>
                    <Link to={"/signup"}>
                        <Button variant="ghost" className='bg-white text-black hover:bg-gray-200 hover:text-black'>
                            Create Your First Event
                        </Button>
                    </Link>
                </div>
            </main>

            <footer className="p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span className="font-bold">OddsUp<sup>+</sup></span>
                        <Link to="#" className="text-sm text-gray-400 hover:text-white">What's New</Link>
                        <Link to="#" className="text-sm text-gray-400 hover:text-white">Discover</Link>
                        <Link to="#" className="text-sm text-gray-400 hover:text-white">Pricing</Link>
                        <Link to="#" className="text-sm text-gray-400 hover:text-white">Help</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                    </div>
                </div>
            </footer>
        </div>
    );
}
