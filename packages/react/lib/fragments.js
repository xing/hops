import { renderToString } from 'react-dom/server';

export default (element) => {
  const reactMarkup = renderToString(element);
  return { reactMarkup };
};
