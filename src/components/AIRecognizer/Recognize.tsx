import React from 'react';
import { WebView } from 'react-native-webview';
import { Dispatch, SetStateAction } from 'react';
import { cssInterop } from 'nativewind';
import { View } from 'react-native';


type RecognizeProps = {
  model: string;
  sign_to_recognize: string;
  className?: string;
  onSuccess: Dispatch<SetStateAction<boolean>>;
  webview_url?: string;
  debug?: boolean;
};


const Recognize: React.FC<RecognizeProps> = ({
  model,
  sign_to_recognize,
  className = "",
  onSuccess,
  webview_url = "https://triosigno.com/ai-mobile-webview",
  debug = false,
}) => {
  cssInterop(WebView, {className: "style",});
  return (
    <View
    className={className}>
    <WebView
    mediaPlaybackRequiresUserAction={false}
    injectedJavaScript={`
    (function() {
      // Disable the scroll
      const style = document.createElement('style');
      style.innerHTML = 'html, body { overflow: hidden; }';
      document.head.appendChild(style);

      // Disable the zoom
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    })();
    true;
    `}
    onMessage={(event) => {
      console.log("Message from webview:", event.nativeEvent.data);
      onSuccess(true)
    }}
    scalesPageToFit
      source={{ uri: `${webview_url}?model=${model}&label=${sign_to_recognize}&debug=${debug}`}}
    
    />
    </View>
  );
}

export default Recognize
