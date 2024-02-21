import React from 'react'
import { LayoutOutlet } from '../../Routes/Layout'
import Navbar from '../../components/shared/Navbar'
import Footer from '../../components/shared/Footer'

const WeatherLayout = () => {
  return (
    <div className="flex min-h-screen">
      <LayoutOutlet />
  </div>
  )
}

export default WeatherLayout