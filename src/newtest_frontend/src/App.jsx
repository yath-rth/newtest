import { useEffect, useState } from 'react';
import { Actor } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client'
import { newtest_backend } from 'declarations/newtest_backend';
import Workflow from './components/Workflow';

function App() {
  const [authClient, setAuthClient] = useState(null);
  const [principalID, setPrinccipalID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function init() {
      const client = await AuthClient.create();
      setAuthClient(client);
    }

    init();
  }, [])

  function getPrincipalId() {
    const id = authClient.getIdentity().getPrincipal().toText();
    setPrinccipalID(id);

    Actor.agentOf(newtest_backend).replaceIdentity(
      authClient.getIdentity()
    );
  }
  async function login() {
    if (!authClient) {
      throw new Error("auth not initialised");
    }
    const APP_NAME = "newtest";
    const APP_LOGO = "https://nfid.one/icons/favicon-96x96.png";
    const CONFIG_QUERY = `?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

    const identityProvider = `https://nfid.one/authenticate${CONFIG_QUERY}`;

    await authClient.login({
      identityProvider,
      onSuccess: getPrincipalId,
      windowOpenerFeatures: `
        left=${window.screen.width / 2 - 525 / 2},
        top=${window.screen.height / 2 - 705 / 2},
        toolbar=0,location=0,menubar=0,width=525,height=705
      `,
    });
  }

  useEffect(() => {
    if (principalID) {
      localStorage.setItem("pid", principalID)
      setLoggedIn(true);
    }
  }, [principalID])
  

  async function logout() {
    try {
      await authClient.logout();
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  }

  const loggedOutView = (
    <div className='h-screen flex justify-center items-center'>
      <div>
        <button className='bg-blue-500 p-2 border-1' onClick={login}>login</button>
        <section>{principalID}</section>
        {loggedIn && <button onClick={getPrincipalId}>Show Principal</button>}
        {loggedIn && <button onClick={logout}>logout</button>}
      </div>
    </div>
  )

  return (
    <main className='bg-slate-900 text-white'>
        {loggedIn ? <Workflow/>  : loggedOutView}
        {/* <div>{principalID}</div> */}
    </main>
  );
}

export default App;
