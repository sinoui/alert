import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Alert from 'src/Alert';
import TestWrapper from '../TestWrapper';

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

  it('设置显示辅助图标', () => {
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
});
