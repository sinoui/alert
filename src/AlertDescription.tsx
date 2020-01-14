import styled from 'styled-components';

/**
 * 警告提示的辅助性文字介绍组件
 */

const AlertDescription = styled.span`
  font-size: ${(props) => props.theme.typography.body1.fontSize}rem;
  display: block;
  line-height: 1.5rem;
`;

export default AlertDescription;
