import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import TestWrapper from './TestWrapper';
import Alert from '../Alert';

/**
 * Alert 单元测试
 */

// 启用定时器模拟器
jest.useFakeTimers();

afterEach(cleanup);

test('关闭动画结束后触发的回调函数', async () => {
  // 测试首次渲染
  const { getByTestId, container } = render(
    <TestWrapper>
      <Alert
        message="提示信息"
        description="辅助性文字介绍"
        closable
        showIcon
        type="info"
      />
    </TestWrapper>,
  );

  const alertMessage = getByTestId('alertMessage');
  const closeButton = getByTestId('closeButton');

  expect(alertMessage).toHaveTextContent('提示信息');

  // 测试关闭
  act(() => {
    fireEvent.click(closeButton);

    jest.runAllTimers();
  });

  expect(container.querySelector('.sinoui-alert')).toBeFalsy();
});
