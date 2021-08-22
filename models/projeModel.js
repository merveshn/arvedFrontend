class ProjeModel {
    constructor(
        projeId,
        userId,
        bap,
        uluslararasi,
        yil,
        projeDurumu,
        projeTuru,
        alanBilgisi,
        projeAdi,
        projeButcesi,
        paraBirimi,
        kontratliProje,
        disDestekli,
        uluslararasiIsBirlikli,
        arastirmaciSayisi,
        projeYurutucusu
    )
    {
        this.projeId = projeId;
        this.userId = userId;
        this.bap = bap;
        this.uluslararasi = uluslararasi;
        this.yil = yil;
        this.projeDurumu = projeDurumu;
        this.projeTuru = projeTuru;
        this.alanBilgisi = alanBilgisi;
        this.projeAdi = projeAdi;
        this.projeButcesi = projeButcesi;
        this.paraBirimi = paraBirimi;
        this.kontratliProje = kontratliProje;
        this.disDestekli = disDestekli;
        this.uluslararasiIsBirlikli = uluslararasiIsBirlikli;
        this.arastirmaciSayisi = arastirmaciSayisi;
        this.projeYurutucusu = projeYurutucusu;
    }
}

export default ProjeModel;