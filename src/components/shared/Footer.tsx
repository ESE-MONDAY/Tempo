import React from 'react';
import { FaGithub, FaLinkedin,FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-700 text-white py-6'>
          <div className="text-center text-gray-200">
          <p>&copy; {currentYear} Designed & Developed by <a target='_blank' rel="noreferrer" href='https://www.esemonday.study/' className='underline text-[#EB6E4B]'>Ese Monday</a> . All Rights Reserved.</p>
          <p className='mt-4 '>Connect with me:</p>
          <div className='flex items-center justify-center mt-4'>
          <a target='_blank' rel="noreferrer" href='https://twitter.com/EseMonday1'   className='px-4'><FaSquareTwitter size={20}/></a>
          <a target='_blank' rel="noreferrer" href='https://github.com/ESE-MONDAY'  className='px-4'><FaGithub size={20} /></a>
          <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/ese-monday/'  className='px-4 '><FaLinkedin size={20} /></a>
          
          </div>
        </div>

    </footer>
  )
}

export default Footer