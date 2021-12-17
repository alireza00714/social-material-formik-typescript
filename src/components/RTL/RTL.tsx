import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

interface IProps {
    children: React.ReactNode
}

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const RTL: React.FC<IProps> = (props) => {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

export default RTL;
