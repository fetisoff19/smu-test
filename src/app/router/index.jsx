import React, {lazy} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router'
import { Main } from '@widgets'


export const AppRouter = () => {
  const Home = lazy(() => import('@pages/testCalc'))
  const TestCalculation = lazy(() => import('@pages/testCalc'))
  const PageNotFound = lazy(() => import('@pages/PageNotFound'))
  
  const routes = [
      { index: true, element: Home },
      { path: 'testCalc', element: TestCalculation },
      { path: '*', element: PageNotFound }]
  return (
    <Routes>
      <Route path={'/'} element={<Main/>}>
        {routes.map(route =>
          <Route
            path={route?.path}
            index={route?.index}
            key={route.path || route?.index}
            element={route?.navigate
              ? <Navigate to='/'/>
              : <route.element/>}
          />)}
      </Route>
    </Routes>
  )
}

export default AppRouter
