import { useContext } from 'react';
import ConfigContext from './context';

export default function useConfig() {
  return useContext(ConfigContext);
}
