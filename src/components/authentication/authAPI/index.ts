export const handleUserLogin = (account: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: `POST`,
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify({ ethAddress: account }),
  }).then((res) => res.json());
};
