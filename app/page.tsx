import React from 'react'
import Generator from './generator/page'

export default function page() {
  return (
    <div className="home flex flex-col bg-[#f8f9fa] h-screen lg:justify-center items-center " >
      <Generator />
    </div>
  )
}
