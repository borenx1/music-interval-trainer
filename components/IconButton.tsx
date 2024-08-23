import { Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type ComponentProps } from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  icon: ComponentProps<typeof MaterialIcons>['name'];
  size?: number;
  iconSize?: number;
  backgroundColor?: { light?: string; dark?: string };
  iconColor?: { light?: string; dark?: string };
  onPress?: () => void;
};

export default function IconButton({
  icon,
  size,
  iconSize,
  backgroundColor,
  iconColor,
  onPress,
}: Props) {
  const backgroundColor_ = useThemeColor(backgroundColor ?? {}, 'background');
  const iconColor_ = useThemeColor(iconColor ?? {}, 'icon');
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: backgroundColor_ },
        size ? { height: size, width: size } : undefined,
      ]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={iconSize ?? 24} color={iconColor_} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    height: 48,
    width: 48,
  },
});
