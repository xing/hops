import deprecateFactory from 'depd';
import { internal } from 'hops-bootstrap';
const deprecate = deprecateFactory('hops-config');

deprecate(
  '[DEP0001] hops-config is deprecated. Please use ConfigContext or the withConfig() HOC from hops instead.'
);

export default internal.getConfig();
