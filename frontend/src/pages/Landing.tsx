import { Link } from 'react-router-dom';
import { Button } from "@mantine/core";
// import { Mail, Twitter, Instagram } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import { PiSparkleFill } from "react-icons/pi";


export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
            {/* Gradient background */}
            <div className="bg absolute inset-0 opacity-80"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="subtle" className="text-white hover:text-white/80 text-sm rounded-full">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="flex-grow flex items-center justify-center px-4">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-xl font-light mb-2 flex">oddsup<sup className='pt-2'><PiSparkleFill /></sup></h1>
                        <h2 className="text-6xl font-bold mb-4 leading-tight">
                            Bold<br />challenges<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                                start now.
                            </span>
                        </h2>
                        <p className="mb-8 text-lg text-gray-300">
                            Create a group, set up exciting challenges,<br />
                            and let your friends vote on the outcomes.<br />
                            The odds are in your hands!
                        </p>
                        <Link to="/signup">
                            <Button variant="filled" className="bg-white text-black hover:bg-gray-200 hover:text-black rounded-full px-6 py-2">
                                Start Your First Challenge
                            </Button>
                        </Link>
                    </div>



                </main>

                <footer className="p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            {/* <h1 className="font-bold flex">oddsup<sup className='pt-2'><PiSparkleFill /></sup></h1> */}

                            <Link to="#" className="text-xs text-gray-300 hover:text-white">What's New</Link>
                            <Link to="#" className="text-xs text-gray-300 hover:text-white">Discover</Link>
                            <Link to="#" className="text-xs text-gray-300 hover:text-white">Help</Link>
                        </div>
                        {/* <div className="flex items-center space-x-4">
              <Mail className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
              <Twitter className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
              <Instagram className="w-4 h-4 text-gray-300 hover:text-white cursor-pointer" />
            </div> */}
                    </div>
                </footer>

                <div className='absolute -z-30 right-96 -bottom-10 w-96 h-96 items-center justify-center'>
                    <div className='w-[90rem]'>
                        <Spline scene="https://prod.spline.design/UZiz8e8YDo38sP5Z/scene.splinecode" />
                    </div>
                </div>
            </div>
        </div>
    );
}