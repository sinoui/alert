// / <reference types="ts-lib-tools" />
/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import { Theme } from '@sinoui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
