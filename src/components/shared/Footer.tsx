import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-800 text-white py-6'>
          <div className="text-center text-gray-400">
          <p>&copy; {currentYear} Ese Monday. All Rights Reserved.</p>
        </div>

    </footer>
  )
}

export default Footer