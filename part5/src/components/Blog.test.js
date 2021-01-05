import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'test.test',
  likes: 5,
  user: {
    name: 'test username'
  }
}

//course task 5.13
//container contains all HTML
test('Renders title and author', () => {

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.title-author-test')
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

//course task 5.14
test('Renders all data', () => {


  const component = render(
    <Blog blog={blog} />
  )
  //this div is only shown after View-button has been pressed
  const div = component.container.querySelector('.show-all-test')

  //test that URL is shown
  expect(div).toHaveTextContent(
    'test.test'
  )
  //test that likes are shown
  expect(div).toHaveTextContent(
    'Likes: '
  )
})

//course task 5.15
test('Like-button\'s handler works', () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  //test that clicking the button twice calls the handler twice
  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
  //tested different length for comparison
  //expect(mockHandler.mock.calls).toHaveLength(3)
})
