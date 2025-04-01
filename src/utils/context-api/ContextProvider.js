import React, {useState} from 'react';
import ApplicationContext from './Context';

const ContextProvider = ({children}) => {
  const [loginDetails, setLoginDetails] = useState(null);

  return (
    <ApplicationContext.Provider
      value={{
        loginDetails,
        setLoginDetails,
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export default ContextProvider;
