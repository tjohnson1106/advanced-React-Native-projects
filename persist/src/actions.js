import * as Keychain from "react-native-keychain";
import * as c from "./constants";

// action creators
const saveCredentialsStart = () => ({
  type: c.SAVE_CREDENTIALS_START
});

const saveCredentialsSuccess = (username) => ({
  type: c.SAVE_CREDENTIALS_SUCCESS,
  username
});

const saveCredentialsFail = (error) => ({
  type: c.SAVE_CREDENTIALS_FAIL,
  error
});

// dispatch(function as parameter -> using Thunk)
export const saveCredentials = (username, pw) => async (dispatch) => {
  dispatch(saveCredentialsStart());
  if (username.length <= 0 || pw.length <= 0) {
    dispatch(saveCredentialsFail("Please insert username and password"));
    return;
  }
  try {
    await Keychain.setGenericPassword(username, pw);
    dispatch(saveCredentialsSuccess(username));
  } catch (err) {
    console.log("Error saving credentials: ", err);
    dispatch(saveCredentialsFail("Error saving credentials in keychain"));
  }
};
