import React from 'react';
import { WebView } from 'react-native-webview';
import { Dispatch, SetStateAction } from 'react';


type RecognizeProps = {
  model: string;
  sign_to_recognize: string;
  onSuccess: Dispatch<SetStateAction<boolean>>;
  webview_url?: string;
  debug?: boolean;
};


const Recognize: React.FC<RecognizeProps> = ({
  model,
  sign_to_recognize,
  onSuccess,
  webview_url = "https://triosigno.com/ai-mobile-webview",
  debug = false,
}) => {
  return (
    <WebView
    mediaPlaybackRequiresUserAction={false}
    onMessage={(event) => {
      console.log("Message from webview:", event.nativeEvent.data);
      onSuccess(true)
    }}
    scalesPageToFit
      source={{ uri: `${webview_url}?model=${model}&label=${sign_to_recognize}&debug=${debug}` }}
      style={{ flex: 1 }}
    />
  );
}

export default Recognize
