import styled from 'styled-components';

/**
 * 警告提示内容组件
 */

const AlertMessage = styled.span<{ description?: boolean }>`
  display: block;
  font-size: ${(props) =>
    props.description
      ? props.theme.typography.subtitle1.fontSize
      : props.theme.typography.body2.fontSize};
  margin-bottom: ${(props) => props.description && '4px'};
  color: ${(props) => props.theme.palette.text.secondary};
`;

export default AlertMessage;
