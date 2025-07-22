import {ActivityIndicator} from '@ant-design/react-native';
import {TouchableOpacity, Text} from 'react-native';

type Props = {
  onClick: () => void;
  text: string;
  bgColor?: string;
  isLoading?: boolean;
  borderRadius?: number;
  iconSource?: any;
  iconName?: string;
};

export default function CustomButton(props: Props) {
  const {isLoading, borderRadius, onClick, bgColor, text} = props;

  const backgroundColor = bgColor ?? '#007bff';
  const disabled = isLoading;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={{
        backgroundColor,
        paddingVertical: 10,
        borderRadius: borderRadius ?? 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
          <Text style={{color: 'white', fontSize: 14}}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
