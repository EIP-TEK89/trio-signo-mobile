import { Image as ExpoImage, ImageProps } from 'expo-image';
import { cssInterop } from 'nativewind';


const Image: React.FC<ImageProps> = (props) => {
    cssInterop(ExpoImage, {className: "style",});

    return (
    <ExpoImage
        {...props}
    />
  );
};

export default Image;