import {View} from 'react-native';

type p = {height?: number};
export default function Spacer({height}: p) {
  return <View style={{height: height ?? 10}} />;
}
