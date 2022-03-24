const getMainPage = `
query {
  guillotine {
    getSite {
      displayName
    }
  }
}`;

export default getMainPage;
