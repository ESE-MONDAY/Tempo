import React from 'react'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <nav className="bg-[#f2f2f2]  sticky top-0 left-0 w-full   px-8 py-4 z-20">
      {/* <div className='h-10 bg-red-500  w-full z-40 '>
        <img alt='Header' src='/header-bg.jpg' height={100} width={100} className='w-full h-40'/>
      </div> */}
    <div className="flex justify-between gap-4 items-center max-w-[1000px] mx-auto">
    
      {/* Logo */}
      <a href="/" className="text-[#EB6E4B]  text-lg font-bold">TempoWeather</a>
      <div className='hidden sm:flex w-full max-w-[500px]' >
        <div className='w-full'>
        <SearchBar />
        </div>
     
        
      </div>
    </div>

  </nav>
  )
}

export default Navbar