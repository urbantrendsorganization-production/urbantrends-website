import React, { useState } from 'react'
import logo from '../assets/urbantrends.svg'
import { CiStar } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger + close icons

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full flex items-center justify-between px-6 py-4">
            {/* logo (left) */}
            <div>
                <img src={logo} alt="urbantrends logo" className="w-12 md:w-18" />
            </div>

            {/* desktop navigation */}
            <nav className="hidden md:flex flex-1">
                <ul className="w-1/2 flex justify-center gap-8 text-white font-medium mx-auto bg-[#626262] py-3 px-6 rounded mt-4">
                    <li className="flex items-center gap-2">
                        <a href="">Home</a>
                        <CiStar />
                    </li>
                    <li className="flex items-center gap-2">
                        <a href="">About</a>
                        <CiStar />
                    </li>
                    <li className="flex items-center gap-2">
                        <a href="">Products</a>
                        <CiStar />
                    </li>
                    <li className="flex items-center gap-2">
                        <a href="">Portfolio</a>
                        <CiStar />
                    </li>
                    <li className="flex items-center gap-2">
                        <a href="">Contact</a>
                        <CiStar />
                    </li>
                </ul>
            </nav>

            {/* right side (desktop button) */}
            <div className="hidden md:block">
                <button className="bg-white border-2 border-black px-5 py-3 rounded">
                    Order Now
                </button>
            </div>

            {/* mobile hamburger */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-black text-3xl">
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* mobile menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#626262] text-white py-6 px-4 md:hidden z-50 mt-3">
                    <ul className="flex flex-col gap-6 font-medium text-center">
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Products</a></li>
                        <li><a href="">Portfolio</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                    <button className="mt-6 w-full bg-white text-black border-2 border-black py-3 rounded">
                        Order Now
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header
