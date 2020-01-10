import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
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
} from 'react-icons/ai';

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

const Div = styled.div<{
  description?: React.ReactNode;
  showIcon?: boolean;
}>`
  position: relative;
  padding: ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.showIcon && props.description
      ? '15px 34px 15px 64px'
      : props.showIcon && !props.description
      ? '8px 34px 8px 37px'
      : '8px 34px 15px 15px'};
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.background.default};
  border: 1px solid ${(props) => props.theme.palette.primary[100]};
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  word-wrap: break-word;
  margin-bottom: 16px;
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

const SpanContent = styled.span<{ description?: React.ReactNode }>`
  font-size: ${(props) => props.theme.typography.body1.fontSize}rem;
  display: ${(props) => (props.description ? 'block' : 'inline-block')};
  line-height: 22px;
`;

const ButtonContent = styled.button<{ description?: React.ReactNode }>`
  position: absolute;
  top: ${(props) => (props.description ? '8px' : '10px')};
  right: 16px;
  overflow: hidden;
  font-size: 16px;
  line-height: 22px;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  outline: none;
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
    <ButtonContent type="button" onClick={handleClose} tabIndex={0}>
      <MdClose />
    </ButtonContent>
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
        <Div
          showIcon={showIcon}
          description={description}
          className={className}
        >
          {showIcon ? (
            <DenseIcon description={description}>{iconNode}</DenseIcon>
          ) : null}
          <div>
            <Span description={description}>{message}</Span>
            <SpanContent description={description}>{description}</SpanContent>
          </div>
          {closeIcon}
          {children}
        </Div>
      </CSSTransition>
      <Globalstyle />
    </>
  ) : null;
}

export default Alert;
