import styled from 'styled-components';
import { parseToHsl, toColorString } from 'polished';

/**
 * 外层容器组件
 */

function lighten(num: number, colorStr: string) {
  const color = parseToHsl(colorStr);

  color.lightness += (1 - color.lightness) * num;
  return toColorString(color);
}

function darken(num: number, colorStr: string) {
  const color = parseToHsl(colorStr);
  color.lightness *= 1 - num;
  return toColorString(color);
}

const alertLayoutPaddingCss = ({
  description,
  showIcon,
  closable,
}: {
  description?: boolean;
  showIcon?: boolean;
  closable?: boolean;
}) => {
  if (showIcon && description && closable) {
    return '15px 34px 15px 64px';
  }
  if (showIcon && !description && closable) {
    return '8px 34px 8px 37px';
  }
  if (showIcon && description && !closable) {
    return '15px 15px 15px 64px';
  }
  if (showIcon && !description && !closable) {
    return '8px 15px 8px 37px';
  }
  return '8px 34px 8px 15px';
};

const AlertLayout = styled.div<{
  description?: boolean;
  showIcon?: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  closable?: boolean;
}>`
  position: relative;
  padding: ${(props) => alertLayoutPaddingCss(props)};
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
  border-radius: 4px;
  background-color: ${(props) =>
    props.theme.palette.type === 'light'
      ? lighten(
          0.84,
          props.theme.palette[props.type === 'info' ? 'primary' : props.type]
            .main,
        )
      : darken(
          0.3,
          props.theme.palette[props.type === 'info' ? 'primary' : props.type]
            .main,
        )};
  border: 1px solid
    ${(props) =>
      props.theme.palette.type === 'light'
        ? lighten(
            0.62,
            props.theme.palette[props.type === 'info' ? 'primary' : props.type]
              .light,
          )
        : darken(
            0.2,
            props.theme.palette[props.type === 'info' ? 'primary' : props.type]
              .main,
          )};

  box-sizing: border-box;
  word-wrap: break-word;
  margin-bottom: 16px;
`;

export default AlertLayout;
