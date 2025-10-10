import React, { useState } from 'react'
import logo from '../assets/urbantrends.svg'
import { CiStar } from "react-icons/ci";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger + close icons
import { DiCode } from "react-icons/di";
import { useNavigate } from 'react-router-dom';


function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()

    return (
        <div className="w-full flex bg-gray-100 shadow-md shadow-[#DDDDDD] items-center justify-between px-6 py-4 sticky top-0 z-50">
            {/* logo (left) */}
            <div>
                <img src={logo} alt="urbantrends logo" className="w-12 md:w-18" />
            </div>

            {/* desktop navigation */}
            <nav className="hidden md:flex flex-1">
                <ul className="flex justify-center gap-8 text-white mx-auto bg-[#626262] py-3 px-6 rounded mt-4 font-header font-bold">
                    {[
                        { name: "Home", link: "/" },
                        { name: "About", link: "/about" },
                        { name: "Products", link: "/products" },
                        { name: "Portfolio", link: "/portfolio" },
                        { name: "Contact", link: "/contact" },
                    ].map((item) => (
                        <li key={item.name} className="flex items-center gap-2">
                            <a
                                href={item.link}
                                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {item.name}
                            </a>
                            <CiStar />
                        </li>
                    ))}
                </ul>
            </nav>



            {/* right side (desktop button) */}
            <div className="hidden md:block">
                <button className="bg-white border-2 border-black flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-lg hover:bg-black hover:text-white transition font-tech" onClick={ () => navigate('/services_&_products')}>
                    <DiCode className="text-3xl" />
                    <span>Order Now</span>
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
                <div className="absolute top-16 left-0 w-full bg-[#626262] text-white py-6 px-4 md:hidden z-50 mt-3 space-y-3">
                    <ul className="flex flex-col gap-6 font-medium text-center">
                        <li><a href="">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Products</a></li>
                        <li><a href="">Portfolio</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                    <button className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-black border-2 border-black py-3 rounded">
                        <DiCode className="text-3xl" />
                        <span className='font-tech font-bold'>Order Now</span>
                    </button>

                </div>
            )}
        </div>
    )
}

export default Header
