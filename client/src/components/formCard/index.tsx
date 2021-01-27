import { Spinner } from '../'
import style from './style.css';
import { h, FunctionComponent, ComponentChildren } from 'preact';

type FormCardProps = {
  children: ComponentChildren;
  showSpinner: boolean;
}

const FormCard: FunctionComponent<FormCardProps> = ({ children, showSpinner }) =>
  <div class={style.bcg}>
    {
      showSpinner
        ? <Spinner />
        : <div>
            <div class={style.card}>
              {children}
            </div>
            <div class={style.helper} />
          </div>
    }
  </div>

export default FormCard
