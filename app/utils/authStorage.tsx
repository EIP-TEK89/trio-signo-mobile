import * as Keychain from 'react-native-keychain';

export async function saveToken(token: string) {
  await Keychain.setGenericPassword('user', token);
}

export async function getToken() {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
}

export async function deleteToken() {
  await Keychain.resetGenericPassword();
}
