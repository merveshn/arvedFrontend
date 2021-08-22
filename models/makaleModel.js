class MakaleModel {
    constructor(
        makaleId,
        userId,
        uluslararasiYayin,
        endeksTuru,
        uluslararasiIsBirlikli,
        makaleAdi,
        dergiAdi,
        yil,
        cilt_volume,
        sayi,
        sayfaNumarasi,
        doi,
        bap,
        kurumDisiYazar,
        yazarListesi
    ){
        this.makaleId = makaleId;
        this.userId = userId;
        this.uluslararasiYayin = uluslararasiYayin;
        this.endeksTuru = endeksTuru;
        this.uluslararasiIsBirlikli = uluslararasiIsBirlikli;
        this.makaleAdi = makaleAdi;
        this.dergiAdi = dergiAdi;
        this.yil = yil;
        this.cilt_volume = cilt_volume;
        this.sayi = sayi;
        this.sayfaNumarasi = sayfaNumarasi;
        this.doi = doi;
        this.bap = bap;
        this.kurumDisiYazar = kurumDisiYazar;
        this.yazarListesi = yazarListesi;
    }
}

export default MakaleModel;