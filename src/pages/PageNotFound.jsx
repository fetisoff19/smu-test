import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
      <h1>
        Упс, страница не найдена!
      </h1>
      <Link to={'/'}>
        На главную
      </Link>
    </>
  )
}

export default PageNotFound
