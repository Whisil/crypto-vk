export const handleUserLogin = async (account: `0x${string}` | undefined) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: `POST`,
    headers: { 'Content-Type': `application/json` },
    body: JSON.stringify({ ethAddress: account }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
