import { createContext } from 'react';

const context = createContext({});

export default context;
export const Consumer = context.Consumer;
export const Provider = context.Provider;
