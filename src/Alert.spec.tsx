import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Alert from './Alert';

afterEach(cleanup);

test('关闭动画结束后触发的回调函数', () => {
  // 测试首次渲染和 effect
  const { getByTestId } = render(<Alert />);

  const label = getByTestId('label');
  const button = getByTestId('button');

  // expect(label).toHaveTextContent('You clicked 0 times');
  // expect(document.title).toBe('You clicked 0 times');

  // 测试第二次渲染和 effect
  fireEvent.click(button);
  // expect(label).toHaveTextContent('You clicked 1 times');
  expect(document.body).toBeNull();
});
