// form-tool/src/App.js

import { useEffect, useState } from 'react';

// The OAuth client ID from the integration page!
const oauth_client_id = 'f4d9f3a8-e20f-43d2-9f5f-cf62e2baec60';

function NotionLogin() {
  const [dbs, setdbs] = useState([]);

  // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    const code = params.get('code');
    if (!code) return;
    fetch(`http://localhost:3002/login/${code}`).then(async (resp) => {
      setdbs(await resp.json());
    });
  }, []);

  return (
    <div>
      <a
        style={{ display: 'block' }}
        href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
      >
        Connect to Notion
      </a>
      {dbs.map((db) => (
        <div
          style={{
            display: 'inline-flex',
            whiteSpace: 'pre',
            border: '1px solid black',
            marginBottom: 10,
          }}
        >
          {JSON.stringify(db, null, 2)}
        </div>
      ))}
    </div>
  );
}

export default NotionLogin;
