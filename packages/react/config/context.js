import { createContext } from 'react';

const context = createContext({});

context.displayName = 'Hops.Config';

export default context;
export const Consumer = context.Consumer;
export const Provider = context.Provider;
