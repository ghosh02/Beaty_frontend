import {Colors} from '../../constants/colors';
import Icons from './Icon';

export const IconName = {
  CheckCircle: 'checkcircle',
};

export const Eye = ({size = 18, Color = '#9EA1AE'}) => {
  return <Icons.Feather name={'eye'} color={Color} size={size} />;
};
export const EyeOff = ({size = 18, Color = '#9EA1AE'}) => {
  return <Icons.Feather name={'eye-off'} color={Color} size={size} />;
};
export const Check = ({size = 18, Color = '#fff'}) => {
  return <Icons.Ionicons name={'checkmark'} color={Color} size={size} />;
};
export const DownIcon = () => {
  return (
    <Icons.EvilIcons name={'chevron-down'} size={24} color={Colors.Black} />
  );
};

export const SearchIcon = ({size = 18, Color = '#fff'}) => {
  return <Icons.Feather name={'search'} color={Color} size={size} />;
};

export const RightIcon = ({color = '#6440FE'}) => {
  return <Icons.Entypo name={'chevron-small-right'} size={25} color={color} />;
};
export const Down = ({color = '#000'}) => {
  return <Icons.Entypo name={'chevron-small-down'} size={25} color={color} />;
};
export const Star = ({color = '#8F90A6'}) => {
  return <Icons.Feather name={'star'} size={16} color={color} />;
};

export const CloseIcon = ({color = '#000'}) => {
  return <Icons.MaterialIcons name={'close'} size={24} color={color} />;
};
export const Back = ({color = '#fff'}) => {
  return (
    <Icons.MaterialCommunityIcons
      name={'keyboard-backspace'}
      size={28}
      color={color}
    />
  );
};
export const Plus = ({color = '#6440FE'}) => {
  return <Icons.AntDesign name={'plus'} size={16} color={color} />;
};
export const Minus = () => {
  return <Icons.AntDesign name={'minus'} size={16} color="#6440FE" />;
};

export const Location = () => {
  return <Icons.Ionicons name={'location-outline'} size={24} color="#000" />;
};
export const Share = () => {
  return <Icons.Feather name={'share'} size={24} color="#000" />;
};
export const Call = () => {
  return <Icons.Feather name={'phone'} size={24} color="#000" />;
};
export const Shop = () => {
  return <Icons.FontAwesome6 name={'shop'} size={18} color="#000" />;
};
export const Calendar = () => {
  return <Icons.Feather name={'calendar'} size={24} color="#000" />;
};
export const Heart = ({color = '#6440FE'}) => {
  return <Icons.Entypo name={'heart'} size={25} color={color} />;
};
export const Heartfill = ({color = '#6440FE'}) => {
  return <Icons.Entypo name={'heart-outlined'} size={25} color={color} />;
};
export const Camera = () => {
  return <Icons.FontAwesome name={'camera'} size={24} color="#242760" />;
};
export const LeftIcon = ({color = '#000'}) => {
  return <Icons.Feather name={'chevron-left'} size={28} color={color} />;
};

export const Person = ({color = '#000'}) => {
  return (
    <Icons.Ionicons name={'person-circle-outline'} size={28} color={color} />
  );
};
export const Home = ({color = '#2790C3'}) => {
  return <Icons.Feather name={'home'} size={28} color={color} />;
};
export const Edit = ({color = '#6440FE'}) => {
  return <Icons.Feather name={'edit'} size={18} color={color} />;
};
export const Delete = () => {
  return <Icons.AntDesign name={'delete'} size={18} color="#E53535" />;
};
export const Work = () => {
  return (
    <Icons.MaterialIcons name={'work-outline'} size={28} color="#A03BB1" />
  );
};
export const AddCircle = ({color = '#6440FE'}) => {
  return <Icons.Ionicons name={'add-circle-outline'} size={28} color={color} />;
};
