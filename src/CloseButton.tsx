import styled from 'styled-components';
import IconButton from '@sinoui/core/IconButton';

/**
 * 关闭按钮组件
 */
const CloseButton = styled(IconButton)<{
  description: boolean;
}>`
  position: absolute;
  top: ${(props) => (props.description ? '10px' : '2px')};
  right: 8px;
  color: ${(props) => props.theme.palette.text.secondary};
  width: 32px;
  height: 32px;
  & .sinoui-svg-icon {
    font-size: ${(props) => (props.description ? '16px' : '14px')};
  }

  & .sinoui-alert-close__ripple {
    width: 32px;
    height: 32px;
  }

  & .sinoui-alert-close__ripple-layout {
    width: 32px;
    height: 32px;
  }
`;

export default CloseButton;
