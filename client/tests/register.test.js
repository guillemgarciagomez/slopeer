import { h } from 'preact';
import Register from '../src/routes/register';

import { render, fireEvent, screen, cleanup } from '@testing-library/preact';

const { debug } = render(<Register />)
debug()
test('should be able to register', async ()=> {
  const {getByText, debug} = render( <Register /> );
  const text = getByText("SLOPEER" )
  expect(text).toBeInTheDocument();
  
  // const submitButton = getByTestId('submit-button', {name: 'submit'})
  // // const usernameInput = getByPlaceholderText('Username'); 
  // // const passwordInput = getByPlaceholderText('Password'); 
  // // const emailInput = getByPlaceholderText('Email'); 


  // fireEvent.click(submitButton).should();
  
  debug()
  // cleanup()
})



