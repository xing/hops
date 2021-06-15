/* eslint react/react-in-jsx-scope: off */
import gif from './img/img.gif';
import jpg from './img/img.jpg';
// eslint-disable-next-line import/no-unresolved
import png from './img/img.png?noinline';

export function Images() {
  return (
    <div>
      <img src={gif} alt="" />
      <img src={jpg} alt="" />
      <img src={png} alt="" />
    </div>
  );
}
