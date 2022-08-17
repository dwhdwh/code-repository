import '../css/detail.scss';
import { DetailModel } from '../models/detail';
import tools from '../utils/tools';
import ImgShow from '../components/detail/img_show/index';
import InfoBox from '../components/detail/info_box/index';
import TitleBox from '../components/detail/title_box/index';
import BtnBox from '../components/detail/btn_box/index';

const detailModel = new DetailModel(),
      imgShow = new ImgShow(),
      infoBox = new InfoBox(),
      titleBox = new TitleBox(),
      btnBox = new BtnBox();

const App = (doc) => {
  const oContainer = doc.getElementsByClassName('J_container')[0];
  detailModel.getGoodsDetail(tools.getUrlQueryValue('id')).then((res) => {
    let html = '';
    
    html += imgShow.tpl().replace(/{{(.*?)}}/g, (node, key) => {
      return {
      	img_url: res.img_url,
      	goods_name: res.goods_name
      }[key];
    });

    html += infoBox.tpl().replace(/{{(.*?)}}/g, (node, key) => {
      return {
      	price: res.price,
      	m_sales: res.m_sales
      }[key];
    });

    html += titleBox.tpl().replace(/{{(.*?)}}/, res.goods_name);

    html += btnBox.tpl().replace(/{{(.*?)}}/, res.id);

    oContainer.innerHTML = html;

  }).then(() => {
  	btnBox.bindEvent();
  });
}

new App(document);