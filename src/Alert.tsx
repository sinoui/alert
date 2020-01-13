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

/**
 * Alert组件  警告提示，展现需要关注的信息。
 */

const Globalstyle = createGlobalStyle`
body{
  .sinoui-alert-enter {
  opacity: 0;
  transform: scale(0.9);
}

.sinoui-alert-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}

.sinoui-alert-exit {
  opacity: 1;
}

.sinoui-alert-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}
}`;

const renderAlertLayoutFun = (props: {
  description?: React.ReactNode;
  showIcon?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}) => {
  if (props.showIcon && props.description) {
    return '15px 30px 15px 64px';
  }
  if (props.showIcon && !props.description) {
    return '8px 30px 8px 37px';
  }
  return '8px 30px 8px 15px';
};

const AlertLayout = styled.div<{
  description?: React.ReactNode;
  showIcon?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}>`
  position: relative;
  padding: ${(props) => renderAlertLayoutFun(props)};
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
  border-radius: 4px;
  background-color: ${(props) =>
    props.theme.palette.type === 'light'
      ? props.theme.palette[props.type ?? 'primary'][50]
      : props.theme.palette[props.type ?? 'primary'][200]};
  border: 1px solid
    ${(props) =>
      props.theme.palette.type === 'light'
        ? props.theme.palette[props.type ?? 'primary'][100]
        : props.theme.palette[props.type ?? 'primary'][300]};
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  word-wrap: break-word;
  margin-bottom: 16px;
  word-break: ${(props) => props.children && 'break-all'};
`;

const Span = styled.span<{ description?: React.ReactNode }>`
  display: ${(props) => (props.description ? 'block' : 'inline-block')};
  font-size: ${(props) =>
    props.description
      ? props.theme.typography.subheading.fontSize
      : props.theme.typography.body1.fontSize}rem;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.85);
`;

const AlertDescription = styled.span<{ description?: React.ReactNode }>`
  font-size: ${(props) => props.theme.typography.body1.fontSize}rem;
  display: ${(props) => (props.description ? 'block' : 'inline-block')};
  line-height: 22px;
`;

const renderButton = (props: {
  description?: React.ReactNode;
  message: React.ReactNode;
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
  description?: React.ReactNode;
  message: React.ReactNode;
}>`
  position: absolute;
  top: ${(props) => renderButton(props)};
  right: 16px;
  overflow: hidden;
  font-size: 16px;
  line-height: 22px;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  color: rgba(0, 0, 0, 0.75);
`;

const DenseIcon = styled(Icon)<{ description?: React.ReactNode }>`
  font-size: ${(props) => (props.description ? '24px' : '16px')};
  margin-right: 8px;
  height: 20px;
  position: absolute;
  top: ${(props) => (props.description ? '14px' : '10px')};
  left: ${(props) => (props.description ? '24px' : '16px')};
`;

interface Props {
  /**
   * 提示内容
   */
  message: React.ReactNode;
  /**
   * 辅助性文字介绍
   */
  description?: React.ReactNode;
  /**
   * 是否显示辅助图标
   */
  showIcon?: boolean;
  /**
   * 默认不显示关闭按钮
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
  children?: React.ReactNode;
}

function Alert(props: Props) {
  const [closed, setClosed] = useState(false);
  const [closing, setClosing] = useState(false);

  const {
    message,
    description,
    closable,
    type = 'info',
    showIcon,
    children,
    className,
  } = props;

  const handleClose = () => {
    setClosing(true);
  };

  const onEnter = () => {
    setClosing(false);
  };

  const onExited = () => {
    setClosing(false);
    setClosed(true);

    if (props.afterClose) {
      props.afterClose();
    }
  };

  const closeIcon = closable ? (
    <IconButton
      type="button"
      onClick={handleClose}
      tabIndex={0}
      message={message}
      data-testid="button"
    >
      <AiOutlineClose />
    </IconButton>
  ) : null;

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

  const iconType = (description ? iconMapOutlined : iconMapFilled)[type];

  const iconNode = React.createElement(iconType);

  return !closed ? (
    <>
      <CSSTransition
        in={closing}
        timeout={200}
        classNames="sinoui-alert"
        unmountOnExit={false}
        onEnter={onEnter}
        onExited={onExited}
      >
        <AlertLayout
          showIcon={showIcon}
          description={description}
          type={type}
          className={className}
        >
          {closeIcon}
          {showIcon ? (
            <DenseIcon description={description} color={type}>
              {iconNode}
            </DenseIcon>
          ) : null}
          <div>
            <Span description={description} data-testid="span">
              {message}
            </Span>
            <AlertDescription description={description}>
              {description}
            </AlertDescription>
          </div>
          {children}
        </AlertLayout>
      </CSSTransition>
      <Globalstyle />
    </>
  ) : null;
}

export default Alert;
