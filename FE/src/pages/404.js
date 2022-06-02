/* HACK https://github.com/vercel/next.js/blob/v11.1.1/packages/next/shared/lib/router/router.ts#L380-L398 */
import Router from 'next/router';
import { removePathTrailingSlash } from 'next/dist/client/normalize-trailing-slash';
import { denormalizePagePath } from 'next/dist/server/denormalize-page-path';
import { isDynamicRoute } from 'next/dist/shared/lib/router/utils/is-dynamic';
import { getRouteRegex } from 'next/dist/shared/lib/router/utils/route-regex';
import { useEffect, useState } from 'react';
import Meta from '@/layout/Meta';
import Main from '@/templates/Main';
import { Center, Text } from '@mantine/core';

function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = removePathTrailingSlash(denormalizePagePath(pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname;
  }

  // handle resolving href for dynamic routes
  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some((page) => {
      if (isDynamicRoute(page) && getRouteRegex(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }
  return removePathTrailingSlash(pathname);
}
/* HACK */

export default function Custom404() {
  const [fallback, setFallback] = useState(true);

  // client-side dynamic routing
  // Redirect to /register/onboarding/1 if it can be resolved to register/onboarding/[id] etc. If not, return 404.
  useEffect(() => {
    const fn = async () => {
      const pages = await Router.router?.pageLoader.getPageList();
      if (!pages || !Array.isArray(pages)) {
        setFallback(false);
        return;
      }

      const resolvedRoute = resolveDynamicRoute(Router.asPath, pages);
      if (pages.includes(resolvedRoute)) {
        // Successful fallback
        Router.replace(resolvedRoute, Router.asPath);
      } else {
        // Fallback failure => 404 display
        setFallback(false);
      }
    };
    fn();
  });

  if (fallback) {
    return null;
  }

  return (
    <Main meta={<Meta title='My Food Plan It' description='Lorem Ipsum' />}>
      <Center sx={{ height: '100vh'}}>
        <Text weight='bold' color='#7E8CA0' sx={{ fontSize: 30}}>404 |</Text>
        <Text color='#7E8CA0'  sx={{ fontSize: 20}}> &nbsp; PAGE NOT FOUND</Text>
      </Center>
    </Main>
  );
}
