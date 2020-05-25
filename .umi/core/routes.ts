import { ApplyPluginsType } from 'C:/Users/Artificial/AppData/Roaming/npm/node_modules/umi/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
