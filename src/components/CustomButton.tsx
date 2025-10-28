import {ActivityIndicator} from '@ant-design/react-native';
import {Body} from '../ui/theme/components/typography';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '../context/ThemeContext';

type Props = {
  onClick: () => void;
  text: string;
  textColor?: string;
  bgColor?: string;
  isLoading?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  iconSource?: any;
  iconName?: string;
  width?: number;
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
    width,
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
        paddingVertical: 15,
        borderRadius: borderRadius ?? 5,
        borderColor: borderColor,
        borderWidth: borderWidth,
        justifyContent: 'center',
        alignItems: 'center',
        width: width ?? '100%',
        opacity: disabled ? 0.5 : 1,
        flexDirection: 'row',
        gap: 8,
      }}>
      {isLoading ? (
        <ActivityIndicator size={20} color="#fff" />
      ) : (
        <>
          {props.iconSource && props.iconName && (
            <props.iconSource name={props.iconName} size={18} color="#fff" />
          )}

          <Body color={textColor ?? theme.colors.background}>{text}</Body>
        </>
      )}
    </TouchableOpacity>
  );
}
