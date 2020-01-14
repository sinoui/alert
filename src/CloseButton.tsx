import styled from 'styled-components';
import IconButton from 'sinoui-components/IconButton';

/**
 * 关闭按钮组件
 */
const CloseButton = styled(IconButton)<{
  description: boolean;
}>`
  position: absolute;
  top: ${(props) => (props.description ? '10px' : '2px')};
  right: 8px;
  font-size: ${(props) => (props.description ? '14px' : '12px')};
  color: ${(props) => props.theme.palette.text.secondary};
`;

export default CloseButton;
