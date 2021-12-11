/**
 * @jest-environment jsdom
 */

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
}))

import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { addDoc } from 'firebase/firestore'
import Comments from '../Comments'

describe('Comments', () => {
  it('submit form', () => {
    render(<Comments postId="postid" />)

    act(async () => {
      const form = screen.getByRole('form')
      fireEvent.submit(form)

      expect(addDoc).toHaveBeenCalledTimes(1)
    })
  })
})
