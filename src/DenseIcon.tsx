import styled, { css } from 'styled-components';
import Icon from 'sinoui-components/Icon';

const colorCss = css<{
  type: 'primary' | 'info' | 'success' | 'warning' | 'error';
}>`
  color: ${(props) =>
    props.theme.palette[props.type][
      props.theme.palette.type === 'dark' ? 100 : 500
    ]};
`;

/**
 * 辅助图标组件
 */
const DenseIcon = styled(Icon)<{
  description?: boolean;
  type: 'primary' | 'info' | 'success' | 'warning' | 'error';
}>`
  display: block;
  font-size: ${(props) => (props.description ? '24px' : '16px')};
  margin-right: 8px;
  position: absolute;
  top: ${(props) => (props.description ? '13px' : '8px')};
  left: ${(props) => (props.description ? '24px' : '16px')};
  ${colorCss}
`;

export default DenseIcon;
