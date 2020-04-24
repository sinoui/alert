import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
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
import AlertMessage from './AlertMessage';
import AlertDescription from './AlertDescription';
import AlertLayout from './AlertLayout';
import DenseIcon from './DenseIcon';
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
      <AiOutlineClose />
    </CloseButton>
  ) : null;

  const IconType = (description ? iconMapOutlined : iconMapFilled)[type];

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
            <DenseIcon
              description={!!description}
              type={type === 'info' ? 'primary' : type}
              className="sinoui-alert-icon"
            >
              <IconType />
            </DenseIcon>
          ) : null}
        </AlertLayout>
      </CSSTransition>
      <Globalstyle />
    </>
  );
}

export default Alert;
