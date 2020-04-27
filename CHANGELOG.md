# @sinoui/alert 版本变更记录

## v2.0.0 - 2020.4.27

- fix: 升级 @sinoui/theme
- fix: sinoui-components 库调整为引用 @sinoui/core
- fix: react-icons 库调整为引用 @sinoui/icons

### 破坏性变更

[详细介绍](https://github.com/sinoui/theme/blob/master/CHANGELOG.md#v100-beta1-2020224)

将 @sinoui/theme 库升级到最新的版本：

```shell
yarn add @sinoui/theme
```

## v1.0.0 - 2020.1.14

@sinoui/alert 基础实现。 :tada: :tada::tada:

主要特性：

- 支持警告提示
- 支持不同类型的警告提示
- 支持显示辅助性文字介绍
- 支持显示辅助图标
- 支持显示关闭按钮
- 支持关闭动画结束后触发的回调函数
