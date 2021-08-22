class HomeModel {
    constructor( title, imageUrl, nav ) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.nav = nav;
    }
  }
  
const HOMESDATA = [
    new HomeModel ('Personel Bilgileri', require('../assets/images/id.png'), 'PersonelBilgileri'),
    new HomeModel ('Makale/Derleme Bilgileri', require('../assets/images/makale.png'), 'AnaMakale'),
    new HomeModel ('  Proje Bilgileri', require('../assets/images/proje.png'), 'AnaProje')
];

export default HOMESDATA;