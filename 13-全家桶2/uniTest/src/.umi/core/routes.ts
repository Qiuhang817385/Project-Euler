import { ApplyPluginsType } from 'D:/AllProject/AmyProject/Project Euler/13-全家桶2/uniTest/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/about",
    "exact": true,
    "component": require('@/pages/about.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.js').default
  },
  {
    "path": "/users",
    "routes": [
      {
        "path": "/users",
        "exact": true,
        "component": require('@/pages/users/index.js').default
      },
      {
        "path": "/users/:id",
        "exact": true,
        "component": require('@/pages/users/[id].js').default
      }
    ],
    "component": require('@/pages/users/_layout.js').default
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
