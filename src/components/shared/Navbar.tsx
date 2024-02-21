import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
    <div className="container mx-auto flex justify-between items-center">
      {/* Logo */}
      <a href="/" className="text-white text-lg font-bold">Logo</a>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Search
        </button>
      </div>
    </div>
  </nav>
  )
}

export default Navbar