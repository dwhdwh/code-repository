import './index.scss';
import tpl from './index.tpl';

export default () => {
	return {
		name: 'header',
		showRemove: false,
		tpl (title, isShow) { //template
			let oHeader = document.createElement('div');
			oHeader.className = 'header';
			oHeader.innerHTML = tpl().replace(/{{(.*?)}}/g, (node, key) => {
				return {
          title, 
				  is_show: isShow ? 'show' : ''
				}[key];
			});
		  return oHeader;
		},

		onEditBtn () {
      this.showRemove = !this.showRemove;

      const oRemoveCell = Array.from(document.getElementsByClassName('remove-cell')),
            oEditBtn = document.getElementsByClassName('J_editItem')[0];

      oRemoveCell.forEach((elem) => {
        if (this.showRemove) {
          oEditBtn.innerHTML = '关闭';
          elem.className += ' show';
        } else {
          oEditBtn.innerHTML = '编辑';
          elem.className = 'cell remove-cell';
        }
      });
		}
	}
}