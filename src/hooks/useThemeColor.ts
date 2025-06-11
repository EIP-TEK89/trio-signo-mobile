/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

<<<<<<< HEAD
=======
<<<<<<<< HEAD:hooks/useThemeColor.ts
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)
<<<<<<<< HEAD:src/hooks/useThemeColor.ts
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
========
import { Colors } from 'constants/Colors';
import { useColorScheme } from 'hooks/useColorScheme';
>>>>>>>> fd80094 (feat(assets): add new images and remove unused assets; update TypeScript paths):hooks/useThemeColor.ts
<<<<<<< HEAD
=======
========
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
>>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises):src/hooks/useThemeColor.ts
>>>>>>> 89fc775 (feat: add new components and assets for lesson exercises)

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
