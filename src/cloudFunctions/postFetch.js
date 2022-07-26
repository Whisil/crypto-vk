Moralis.Cloud.define('userFetch', async (req) => {
  const userQuery = new Moralis.Query(`_User`);

  userQuery.equalTo(`objectId`, req.params.id);
  let user = await userQuery.find({ useMasterKey: true });
  return user;
});
