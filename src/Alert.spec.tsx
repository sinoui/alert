import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './TestWrapper';
import Alert from './Alert';

afterEach(cleanup);

test('关闭动画结束后触发的回调函数', () => {
  // 测试首次渲染和 effect
  const { getByTestId } = render(
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

  const span = getByTestId('span');
  const button = getByTestId('button');

  expect(span).toHaveTextContent('提示信息');

  // 测试第二次渲染和 effect
  fireEvent.click(button);
  expect(button).toContainHTML('');
});
