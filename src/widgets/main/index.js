import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '@widgets'
import { AppPuffLoader } from '@shared/ui/index.js'

export const Main = () => {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<AppPuffLoader/>}>
        <div className='main'>
          <Outlet/>
        </div>
      </Suspense>
      <Footer/>
    </>
  )
}
