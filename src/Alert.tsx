import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import CheckCircle from '@sinoui/icons/CheckCircle';
import CheckCircleOutline from '@sinoui/icons/CheckCircleOutline';
import Info from '@sinoui/icons/Info';
import InfoOutlined from '@sinoui/icons/InfoOutlined';
import Error from '@sinoui/icons/Error';
import ErrorOutline from '@sinoui/icons/ErrorOutline';
import WarningOutlined from '@sinoui/icons/WarningOutlined';
import ReportProblemOutlined from '@sinoui/icons/ReportProblemOutlined';
import CloseOutlined from '@sinoui/icons/CloseOutlined';
import classNames from 'classnames';
import assert from 'assert';
import AlertMessage from './AlertMessage';
import AlertDescription from './AlertDescription';
import AlertLayout from './AlertLayout';
import CloseButton from './CloseButton';

const timeout = 200;

const Globalstyle = createGlobalStyle`
  .sinoui-alert-exit {
    opacity: 1;
  }
  .sinoui-alert-exit-active {
    opacity: 0;
    transform: scale(0.9);
    height: 0!important;
    transition: opacity ${timeout}ms, transform ${timeout}ms, height ${timeout}ms;
  }
`;

const colorCss = css<{
  type: 'primary' | 'info' | 'success' | 'warning' | 'error';
}>`
  color: ${(props) =>
    props.theme.palette[props.type][
      props.theme.palette.type === 'dark' ? 'light' : 'dark'
    ]};
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
  success: CheckCircle,
  info: Info,
  error: Error,
  warning: WarningOutlined,
};

const iconMapOutlined = {
  success: CheckCircleOutline,
  info: InfoOutlined,
  error: ErrorOutline,
  warning: ReportProblemOutlined,
};

/**
 * Alert组件  警告提示，展现需要关注的信息。
 */
function Alert(props: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const {
    message,
    children,
    description,
    closable,
    type = 'info',
    showIcon,
    className,
    afterClose,
  } = props;

  if (process.env.NODE_ENV === 'development') {
    assert(message || children, 'Alert 组件必须指定 message 或者 children。');
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  const rippleConfig = {
    center: true,
    rippleClassName: 'sinoui-alert-close__ripple',
    rippleLayoutClassName: 'sinoui-alert-close__ripple-layout',
    fixSize: true,
  };

  const closeIcon = closable ? (
    <CloseButton
      onClick={handleClose}
      description={!!description}
      data-testid="closeButton"
      aria-label="Close"
      className="sinoui-alert-close-button"
      ripple={rippleConfig}
    >
      <CloseOutlined />
    </CloseButton>
  ) : null;

  const IconType = (description ? iconMapOutlined : iconMapFilled)[type];

  /**
   * 辅助图标组件
   */
  const IconTypeWrapper = styled(IconType)<{
    description?: boolean;
    type: 'primary' | 'info' | 'success' | 'warning' | 'error';
  }>`
    display: block;
    font-size: ${description ? '24px' : '16px'};
    margin-right: 8px;
    position: absolute;
    top: ${description ? '13px' : '8px'};
    left: ${description ? '24px' : '16px'};
    ${colorCss}
  `;

  return (
    <>
      <CSSTransition
        in={isVisible}
        timeout={timeout}
        classNames="sinoui-alert"
        onExited={afterClose}
        unmountOnExit
      >
        <AlertLayout
          showIcon={showIcon}
          description={!!description}
          closable={closable}
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
          {closeIcon}
          {showIcon ? (
            <IconTypeWrapper
              type={type === 'info' ? 'primary' : type}
              className="sinoui-alert-icon"
            />
          ) : null}
        </AlertLayout>
      </CSSTransition>
      <Globalstyle />
    </>
  );
}

export default Alert;
