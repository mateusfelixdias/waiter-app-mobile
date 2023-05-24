import { markup } from './markup';
import { SvgXml } from 'react-native-svg';

export function Empty() {
  return <SvgXml xml={markup} />;
}
