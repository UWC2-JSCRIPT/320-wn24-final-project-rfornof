/**
 * @jest-environment jsdom
 */
import React from 'react'
import {Login} from './routes/Auth/Login'
import {screen as scr, getByLabelText} from '@testing-library/dom'
// import {rest} from 'msw'
// import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Home} from './routes/Home'

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));
// const server = setupServer(
//   rest.get('/', (req, res, ctx) => {
//     return res(ctx.json({greeting: 'hello there'}))
//   }),
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

test('login has values that can change', async () => {
  render(<Login/>)
   const email=  screen.getByLabelText('Email address')
   fireEvent.click(email)
    fireEvent.change(email, {target: {value: 'robinp31@uw.edu'}})

    const password=  screen.getByLabelText('Password')
    fireEvent.click(password)
    fireEvent.change(password, {target: {value: 'Colorado'}})
    fireEvent.click(screen.getByText("Login"))
    
expect(email.value).toBe('robinp31@uw.edu')
expect(password.value).toBe('Colorado')
})

// test('home is not logged in', async () => {
//     render(<Home/>)
//      const first=  await screen.findAllByText('Create a Review.........pg.   3')
//      console.log(first)
//      expect(first).toBe('not logged in!!!!')
  

//   })
