import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  ItemContainer,
  IconTextContainer,
  IconContainer,
  TextContainer,
  ItemName,
  ItemDetail,
} from './styles';

const OptionMenu = ({ title, description, icon, iconColor, ...rest }) => {
  return (
    <ItemContainer {...rest}>
      <IconTextContainer>
        <IconContainer color={iconColor}>
          <FontAwesome5 size={35} name={icon} color="#FFFFFF" />
        </IconContainer>
        <TextContainer>
          <ItemName>{title}</ItemName>
          <ItemDetail>{description}</ItemDetail>
        </TextContainer>
      </IconTextContainer>
    </ItemContainer>
  );
};

OptionMenu.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default OptionMenu;
