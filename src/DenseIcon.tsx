import styled from 'styled-components';
import Icon from 'sinoui-components/Icon';

/**
 * 辅助图标组件
 */

const DenseIcon = styled(Icon)<{ description?: boolean }>`
  font-size: ${(props) => (props.description ? '24px' : '16px')};
  margin-right: 8px;
  height: 20px;
  position: absolute;
  top: ${(props) => (props.description ? '14px' : '7px')};
  left: ${(props) => (props.description ? '24px' : '16px')};
`;

export default DenseIcon;
