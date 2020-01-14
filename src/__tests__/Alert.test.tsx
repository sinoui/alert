import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import TestWrapper from './TestWrapper';
import Alert from '../Alert';

/**
 * Alert 快照测试
 */

describe('Alert 快照测试', () => {
  it('渲染Alert', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert message="提示信息" />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('children测试', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert>提示信息</Alert>
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置显示关闭按钮', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert message="提示信息" closable />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置显示辅助图标', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert message="提示信息" showIcon />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('不同类型的警告提示', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert message="提示信息" showIcon type="success" />
          <Alert message="提示信息" showIcon type="info" />
          <Alert message="提示信息" showIcon type="warning" />
          <Alert message="提示信息" showIcon type="error" />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('设置辅助性文字介绍', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert message="提示信息" description="辅助性文字介绍" showIcon />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('辅助性文字介绍和辅助图标', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert
            message="提示信息"
            description="辅助性文字介绍"
            showIcon
            type="info"
          />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('不同类型辅助性文字介绍和辅助图标', () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Alert
            message="提示信息"
            description="辅助性文字介绍"
            closable
            showIcon
            type="info"
          />
          <Alert
            message="提示信息"
            description="辅助性文字介绍"
            closable
            showIcon
            type="success"
          />
          <Alert
            message="提示信息"
            description="辅助性文字介绍"
            closable
            showIcon
            type="warning"
          />
          <Alert
            message="提示信息"
            description="辅助性文字介绍"
            closable
            showIcon
            type="error"
          />
        </TestWrapper>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Alert 单元测试', () => {
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
});
