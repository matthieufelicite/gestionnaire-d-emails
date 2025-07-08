import * as msal from "@azure/msal-browser";

const requestedScopes = {
  scopes: ["User.Read", "Mail.Read"],
};

export const msalInstance = new msal.PublicClientApplication({
  auth: {
    clientId: "e8137439-4d1d-462d-a85f-f81cfea8f0d8",
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
});

export async function signInAndGetUser() {
  await msalInstance.initialize();
  const authResult = await msalInstance.loginPopup(requestedScopes);
  msalInstance.setActiveAccount(authResult.account);
  return authResult.account;
}

export async function getAccessToken() {
  try {
    await msalInstance.initialize();
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw new Error("No active account found");
    }
    const response = await msalInstance.acquireTokenSilent({
      ...requestedScopes,
      account: account,
    });
    return response.accessToken;
  } catch (error) {
    console.error("Error acquiring token:", error);
    throw error;
  }
}