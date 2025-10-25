import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "740561313465-t3gbtlo08eg5ukrut3r14h7kan51ah75.apps.googleusercontent.com",
    androidClientId:
      "740561313465-kct8etsuiavc8lf6q6m6hgibeadko0og.apps.googleusercontent.com",
    webClientId:
      "740561313465-cblv9n5jcau6kopa23sm0shkpsqavmun.apps.googleusercontent.com",
  });

  return { request, response, promptAsync };
};
