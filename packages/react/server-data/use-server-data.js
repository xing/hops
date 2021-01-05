import { useContext } from 'react';
import ServerDataContext from './context';

export default function useServerData() {
  return useContext(ServerDataContext);
}
