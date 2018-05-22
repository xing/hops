import styles from './styles.css';

export default config => () => {
  const root = document.getElementById('app');

  const headline = document.createElement('h1');
  headline.innerText = 'Hello Hops!';
  headline.className = styles.headline;

  root.appendChild(headline);
};
