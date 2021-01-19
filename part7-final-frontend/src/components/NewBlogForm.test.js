import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

//course task 5.16* - uncompleted as of now
test('handler passed as a prop receives valid data upon blog creation', () => {
  //mock form submit handler
  const createBlog = jest.fn()
  const doChange = jest.fn()
  //mock blogform with mock handler
  const component = render(<NewBlogForm handleCreation={createBlog} setTitle={doChange} setAuthor={doChange} setUrl={doChange} />)

  //different input fields for the form
  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('.authorInput')
  const urlInput = component.container.querySelector('.urlInput')
  const form = component.container.querySelector('.newBlogForm')

  console.log('***************')
  console.log(titleInput)
  console.log('***************')

  //component.debug()
  fireEvent.change(titleInput, { target: { value: 'testing of forms could be easier' } })
  fireEvent.change(authorInput, { target: { value: 'test author' } })
  fireEvent.change(urlInput, { target: { value: 'test.url.com' } })

  //testing
  console.log('***************')
  console.log(titleInput)
  console.log('***************')

  //submit the form with changed data
  fireEvent.submit(form, { preventDefault: () => { } })
  console.log(createBlog.mock.calls)
  expect(createBlog).toHaveBeenCalled()

})