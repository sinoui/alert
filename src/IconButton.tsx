import styled from 'styled-components';

/**
 * 关闭按钮组件
 */

const renderButtonCss = (props: {
  description?: boolean;
  message?: boolean;
  children?: React.ReactNode;
}) => {
  if (props.description && props.message) {
    return '8px';
  }
  if (!props.description && props.message) {
    return '10px';
  }
  if (!props.description && props.children) {
    return '10px';
  }
  return '16px';
};

const IconButton = styled.button<{
  message?: boolean;
}>`
  position: absolute;
  top: ${(props) => renderButtonCss(props)};
  right: 16px;
  overflow: hidden;
  font-size: 16px;
  line-height: 22px;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  color: ${(props) => props.theme.palette.text.secondary};
`;

export default IconButton;
