import style from './style.css';
import { h, ComponentChildren, FunctionComponent } from 'preact';

type ContentProps = {
  children: ComponentChildren;
  addStyle?: {
    height: string;
    maxWidth: string;
  }
}

const Content: FunctionComponent<ContentProps> = ({ children, addStyle }) => {
  return (
    <div className={style.content} style={{ ...addStyle }}>
      {children}
    </div>
  )
}

export default Content
