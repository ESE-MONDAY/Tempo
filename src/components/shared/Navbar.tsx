import React from 'react'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <nav className="bg-white  sticky top-0 left-0 w-full  shadow-md px-8 py-2 z-20">
      {/* <div className='h-10 bg-red-500  w-full z-40 '>
        <img alt='Header' src='/header-bg.jpg' height={100} width={100} className='w-full h-40'/>
      </div> */}
    <div className="flex justify-between gap-4 items-center">
    
      {/* Logo */}
      <a href="/" className="text-black text-lg font-bold">Tempo</a>
      <div >
         {/* Search Bar */}
        <SearchBar />
        
      

      </div>

     
    </div>

  </nav>
  )
}

export default Navbar