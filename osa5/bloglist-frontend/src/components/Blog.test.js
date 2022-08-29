import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blogtest', () => {
  const blog = {
    user: {
      id:1,
      username: 'Vainio',
      name: 'Petri'
    },
    likes: 1,
    author: 'Petrijuhani',
    title: 'Component testing is done with react-testing-library',
    url: 'xyz',
  }

  let content


  beforeEach(() => {
    content= render(
      <Blog key={blog.id} blog={blog} />
    )
  })

  test('renders content', () => {
    expect(content.container.querySelector('.blog')).toHaveTextContent(
      blog.title
    )
    expect(content.container.querySelector('.blog')).toHaveTextContent(
      blog.author
    )
    expect(content.queryByText(blog.url)).not.toBeInTheDocument()
    expect(content.queryByText('likes')).not.toBeInTheDocument()
  })

  test('clicking the button shows url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)
    expect(content.container.querySelector('.visibleContent')).toHaveTextContent(
      blog.title
    )
    expect(content.container.querySelector('.visibleContent')).toHaveTextContent(
      blog.author
    )
    expect(content.container.querySelector('.visibleContent')).toHaveTextContent(
      blog.url
    )
    expect(content.container.querySelector('.visibleContent')).toHaveTextContent(
      'likes'
    )
  })

  test('clicking the button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const addLikes = jest.fn()

    const button = screen.getByText('show')
    await user.click(button)

    const likeButton = screen.getByPlaceholderText('likeButton')
    await user.click(likeButton)

    console.log(addLikes.mock.calls)
    expect(addLikes.mock.calls).toHaveLength(2)
  })
})
