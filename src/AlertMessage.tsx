import styled from 'styled-components';

/**
 * 警告提示内容组件
 */

const AlertMessage = styled.span<{ description?: boolean }>`
  display: block;
  font-size: ${(props) =>
    props.description
      ? props.theme.typography.subheading.fontSize
      : props.theme.typography.body1.fontSize}rem;
  margin-bottom: ${(props) => props.description && '4px'};
  color: ${(props) => props.theme.typography.body1.color};
`;

export default AlertMessage;
