import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

//course task 5.13
test('Renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'test.test.test',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.test')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'Test Author'
  )

  expect(component.queryByText('test.test.test')).not.toBeInTheDocument();
  const likes = component.queryByLabelText('likes')
  expect(likes).not.toBeInTheDocument()

})