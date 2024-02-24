import React from 'react'
import { LayoutOutlet } from '../../Routes/Layout'
import Footer from '../../components/shared/Footer'

const WeatherLayout = () => {
  return (
    <div className="flex min-h-screen flex-col max-w-[1560px] mx-auto">
      {/* <Navbar /> */}
      <div className='flex-grow'>
      <LayoutOutlet />
      </div>
      <Footer />
    
  </div>
  )
}

export default WeatherLayout