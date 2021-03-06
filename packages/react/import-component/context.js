import { createContext } from 'react';

const context = createContext(undefined);

context.displayName = 'Hops.ImportComponent';

export default context;
export const Consumer = context.Consumer;
export const Provider = context.Provider;
