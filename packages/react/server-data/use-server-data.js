import { useContext } from 'react';
import ServerDataContext from './context';

function useServerData() {
  return useContext(ServerDataContext);
}

export default useServerData;
