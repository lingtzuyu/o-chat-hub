// form-tool/src/App.js
import { useEffect, useState } from 'react';

// The OAuth client ID from the integration page!
const oauth_client_id = 'f4d9f3a8-e20f-43d2-9f5f-cf62e2baec60';
const accessToken = localStorage.getItem('accessToken');

function NotionLogin() {
  const [dbs, setDbs] = useState([]);

  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    const code = params.get('code');
    // 如果param沒有帶code就返回
    if (!code) return;
    // const response = getNotionToken(code);
    // console.log('前端的response data', response.data);
    fetch(`${process.env.REACT_APP_API_URL}/notion/${code}`, {
      headers: {
        authorization: accessToken,
      },
    }).then(async (res) => {
      setDbs(await res.json());
    });
  }, []);

  console.log('前端畫面', dbs);

  return (
    <div>
      <a
        style={{ display: 'block' }}
        href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
      >
        Connect to Notion
      </a>

      {/* {dbs.map((db) => (
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
      ))} */}
    </div>
  );
}

export default NotionLogin;
