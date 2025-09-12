'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();
  const isRequestDemoPage = pathname === '/request-demo';

  if (isRequestDemoPage) {
    // En la página request-demo, solo mostrar el contenido (children[1] que es el contenido de la página)
    return React.Children.toArray(children)[1] as React.ReactElement;
  }

  // En todas las demás páginas, mostrar header, contenido y footer
  return <>{children}</>;
};

export default ConditionalLayout;
