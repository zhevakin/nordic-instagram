/**
 * @jest-environment jsdom
 */

import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import CommentsForm from '../CommentsForm'

describe('CommentsForm', () => {
  it('submit form', () => {
    const onSubmit = jest.fn()
    const { getByText } = render(<CommentsForm onSubmit={onSubmit} />)

    act(async () => {
      const form = screen.getByRole('form')
      const submitButton = getByText(/Отправить/i)
      fireEvent.submit(form)
      fireEvent.click(submitButton)
      console.log(submitButton)

      expect(onSubmit).toBeCalled()
    })
  })
})
