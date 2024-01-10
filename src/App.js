import './App.css';
import { useCallback, useState } from 'react';
import { decrypt } from '@metamask/browser-passworder';

function App() {
  window.Buffer = window.Buffer || require("buffer").Buffer;

  const [vaultData, setVaultData] = useState('');
  const [password, setPassword] = useState('');
  const [decryptedVaultData, setDecryptedVaultData] = useState('');
  const handleTextAreaOnchange = useCallback((e) => {
    setVaultData(e.target.value);
  }, []);
  const handleClick = useCallback(async () => {
    const decryptedVault = await decrypt(password, vaultData);
    setDecryptedVaultData(JSON.stringify(decryptedVault, null, 2));
  }, [password, vaultData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rainbow BX Vault Decryptor</h1>
      </header>
      <div className='App-body'>
      {decryptedVaultData  ? (
        <pre>
          {decryptedVaultData}
        </pre>
      ) : (
        <div>
        <p>
          Step 1 - Open the extension and right click inside on the top right, above the 3 dots icon. <br />
          Step 2 - Select "Inspect" <br />
          Step 3 - Select the "Console" tab <br />
          Step 4 - Paste the following code in the console and press enter: <br /> <br />
          <pre style={{border: '1px dotted grey', padding: '10px', width: '630px'}}>
           {`const { vault } = await chrome.storage.local.get('vault'); console.log(vault);`}
          </pre> <br /> <br />
          Step 5 - Copy the output and paste it in the text area below. <br />
          Step 6 - Enter your password and click "Decrypt" <br />
        </p>
       
        <textarea style={{width: '400px', height:'200px'}} value={vaultData} onChange={handleTextAreaOnchange} 
          placeholder="Paste your vault data here"
        />
        <br />
        <br />
        <input placeholder="Enter your password here" style={{width: '300px'}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <br />
        
        <button onClick={handleClick}>Decrypt</button>
        </div>
      )}
      
      </div>
    </div>
  );
}

export default App;
