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
import { useRipple } from '@sinoui/ripple';
import AlertMessage from './AlertMessage';
import AlertDescription from './AlertDescription';
import AlertLayout from './AlertLayout';
import IconButton from './IconButton';
import DenseIcon from './DenseIcon';

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
