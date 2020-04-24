import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sinoui/theme';

export default function TestWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
