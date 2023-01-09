import { Bars } from 'react-loader-spinner';
import css from './loader.module.css';

export function Loader() {
  return (
    <div className={css.wrapper}>
      <Bars className={css.loader} />
    </div>
  );
}
