import './index.scss';
import tpl from './index.tpl';

export default () => {
	return {
		name: 'numSelector',
		tpl (num, id, limitation, index) {
			return tpl().replace(/{{(.*?)}}/g, (node, key) => {
        return {
          num, id, limitation, index
        }[key];        
			});
		}
	}
}