import {DimensionValue, TouchableOpacity} from 'react-native';

import {ActivityIndicator} from '@ant-design/react-native';
import {Body} from '../ui/theme/components/typography';
import {Weight} from '../ui/theme/components/typography/ThemedText';
import {useTheme} from '../context/ThemeContext';

type Props = {
  onClick: () => void;
  text: string;
  textColor?: string;
  textWeight?: Weight;
  bgColor?: string;
  isLoading?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  iconSource?: any;
  iconName?: string;
  iconSize?: number;
  iconOnLeft?: boolean;
  iconColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  maxWidth?: DimensionValue;
  paddingVertical?: number;
};

export default function CustomButton(props: Props) {
  const {
    isLoading,
    borderRadius,
    borderColor,
    borderWidth,
    onClick,
    bgColor,
    text,
    textColor,
    textWeight,
    width,
    height,
    paddingVertical,
    maxWidth,
    iconOnLeft,
    iconColor,
  } = props;

  const {theme} = useTheme();

  const backgroundColor = bgColor ?? theme.colors.primary;
  const disabled = isLoading;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={{
        backgroundColor,
        paddingVertical: paddingVertical ?? 15,
        borderRadius: borderRadius ?? 7,
        borderColor: borderColor,
        borderWidth: borderWidth,
        justifyContent: 'center',
        alignItems: 'center',
        width: width ?? '100%',
        height: height,
        maxWidth: maxWidth ?? '100%',
        opacity: disabled ? 0.5 : 1,
        flexDirection: 'row',
        gap: 8,
      }}>
      {isLoading ? (
        <ActivityIndicator size={20} color="#fff" />
      ) : (
        <>
          {props.iconSource && props.iconName && iconOnLeft && (
            <props.iconSource
              name={props.iconName}
              size={props.iconSize ?? 18}
              color={iconColor ?? '#fff'}
            />
          )}

          <Body
            color={textColor ?? theme.colors.background}
            weight={textWeight}>
            {text}
          </Body>

          {props.iconSource && props.iconName && !iconOnLeft && (
            <props.iconSource
              name={props.iconName}
              size={props.iconSize ?? 18}
              color={iconColor ?? '#fff'}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
