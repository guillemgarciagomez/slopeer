import { route } from 'preact-router'
import {h, FunctionComponent} from 'preact';

type NavProps = {
  text: string;
  to: string;
  rest?: any[];
}

const NavButton: FunctionComponent<NavProps> = ({ text, to, ...rest }) =>
  <button onClick={() => route(to)} {...rest} >{text}</button>

export default NavButton
