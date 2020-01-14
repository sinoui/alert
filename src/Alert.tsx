import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Icon from 'sinoui-components/Icon';
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiFillInfoCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
  AiOutlineExclamationCircle,
  AiOutlineCloseCircle,
  AiOutlineClose,
} from 'react-icons/ai';
import classNames from 'classnames';
import assert from 'assert';
import { useRipple } from '@sinoui/ripple';

/**
 * Alert组件  警告提示，展现需要关注的信息。
 */

const timeout = 200;

const Globalstyle = createGlobalStyle`
  .sinoui-alert-exit {
    opacity: 1;
  }

  .sinoui-alert-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity ${timeout}ms, transform ${timeout}ms;
  }
`;

const alertLayoutPaddingCss = (props: {
  description?: boolean;
  showIcon?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}) => {
  if (props.showIcon && props.description) {
    return '15px 34px 15px 64px';
  }
  if (props.showIcon && !props.description) {
    return '8px 34px 8px 37px';
  }
  return '8px 34px 8px 15px';
};

const AlertLayout = styled.div<{
  description?: boolean;
  showIcon?: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}>`
  position: relative;
  padding: ${(props) => alertLayoutPaddingCss(props)};
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
  border-radius: 4px;
  background-color: ${(props) =>
    props.theme.palette.type === 'light'
      ? props.theme.palette[props.type === 'info' ? 'primary' : props.type][50]
      : props.theme.palette[
          props.type === 'info' ? 'primary' : props.type
        ][200]};
  border: 1px solid
    ${(props) =>
      props.theme.palette.type === 'light'
        ? props.theme.palette[
            props.type === 'info' ? 'primary' : props.type
          ][100]
        : props.theme.palette[
            props.type === 'info' ? 'primary' : props.type
          ][300]};
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  word-wrap: break-word;
  margin-bottom: 16px;
`;

const AlertMessage = styled.span<{ description?: boolean }>`
  display: block;
  font-size: ${(props) =>
    props.description
      ? props.theme.typography.subheading.fontSize
      : props.theme.typography.body1.fontSize}rem;
  margin-bottom: ${(props) => props.description && '4px'};
  color: ${(props) => props.theme.typography.body1.color};
`;

const AlertDescription = styled.span`
  font-size: ${(props) => props.theme.typography.body1.fontSize}rem;
  display: block;
  line-height: 1.5rem;
`;

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

const DenseIcon = styled(Icon)<{ description?: boolean }>`
  font-size: ${(props) => (props.description ? '24px' : '16px')};
  margin-right: 8px;
  height: 20px;
  position: absolute;
  top: ${(props) => (props.description ? '14px' : '7px')};
  left: ${(props) => (props.description ? '24px' : '16px')};
`;

interface Props {
  /**
   * 提示内容
   */
  message?: React.ReactNode;
  /**
   * 辅助性文字介绍
   */
  description?: React.ReactNode;
  /**
   * 是否显示辅助图标
   */
  showIcon?: boolean;
  /**
   * 是否显示关闭按钮，默认为false，即不展示
   */
  closable?: boolean;
  /**
   * 指定提示的样式，四种：info、success、warning、error
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 关闭动画结束后触发的回调函数
   */
  afterClose?: () => void;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

const iconMapFilled = {
  success: AiFillCheckCircle,
  info: AiFillInfoCircle,
  error: AiFillCloseCircle,
  warning: AiFillExclamationCircle,
};

const iconMapOutlined = {
  success: AiOutlineCheckCircle,
  info: AiOutlineInfoCircle,
  error: AiOutlineCloseCircle,
  warning: AiOutlineExclamationCircle,
};

function Alert(props: Props) {
  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(false);

  const {
    message,
    children,
    description,
    closable,
    type = 'info',
    showIcon,
    className,
  } = props;

  if (process.env.NODE_ENV === 'development') {
    assert(message || children, 'Alert 组件必须指定 message 或者 children。');
  }

  const handleClose = () => {
    setClosing(true);
  };

  const onEnter = () => {
    setClosing(false);
  };

  const handleOnExited = () => {
    setClosing(false);
    setClosed(true);

    if (props.afterClose) {
      props.afterClose();
    }
  };

  const ref = useRipple<HTMLButtonElement>();

  const closeIcon = closable ? (
    <IconButton
      type="button"
      onClick={handleClose}
      tabIndex={0}
      message={!!message}
      data-testid="closeButton"
      aria-label="closeButton"
      ref={ref}
    >
      <AiOutlineClose />
    </IconButton>
  ) : null;

  const IconType = (description ? iconMapOutlined : iconMapFilled)[type];

  return !closed ? (
    <>
      <CSSTransition
        in={closing}
        timeout={timeout}
        classNames="sinoui-alert"
        unmountOnExit={false}
        onEnter={onEnter}
        onExited={handleOnExited}
      >
        <AlertLayout
          showIcon={showIcon}
          description={!!description}
          type={type}
          className={classNames(
            'sinoui-alert',
            className,
            `sinoui-alert--${type}`,
            {
              'sinoui-alert--show-description': !!description,
              'sinoui-alert--closable': closable,
              'sinoui-alert--show-icon': showIcon,
            },
          )}
          role="alert"
        >
          {closeIcon}
          {showIcon ? (
            <DenseIcon
              description={!!description}
              color={type === 'info' ? 'primary' : type}
              className="sinoui-alert__close-button"
            >
              <IconType />
            </DenseIcon>
          ) : null}
          <div>
            <AlertMessage
              description={!!description}
              data-testid="alertMessage"
              className="sinoui-alert-message"
            >
              {message || children}
            </AlertMessage>
            <AlertDescription className="sinoui-alert-description">
              {description}
            </AlertDescription>
          </div>
        </AlertLayout>
      </CSSTransition>
      <Globalstyle />
    </>
  ) : null;
}

export default Alert;
