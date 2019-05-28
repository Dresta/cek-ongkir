<template>
    <div id="main-wrapper">
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper  -->
        <!-- ============================================================== -->
        <div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Static Slider 10  -->
            <!-- ============================================================== -->
            <div class="container">
                <!-- Row  -->
                <div class="row justify-content-center ">
                    <!-- Column -->
                    <div class="col-md-6 align-self-center text-center" data-aos="fade-down" data-aos-duration="1200">
                        <h1 class="title">PJT - Logistik</h1>
                        <h6 class="subtitle op-8">Sahabat terbaik untuk membantu mengecek harga pengiriman paket Anda dari 3 jasa pengiriman
                            terbesar di Indonesia</h6>
                    </div>
                    <!-- Column -->
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- End Static Slider 10  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->

            <!-- asal -->
            <div class="container">
                <div class="row">
                    <!-- column -->
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Dari</h4>
                                <div class="form-group">
                                    <label>Provinsi</label>
                                    <select class="form-control" v-model="input_asal.idProvinsi">
                                        <option v-for="(item, index) in list_provinsi" :key="index" :value="item.province_id">
                                            {{ item.province }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Kota</label>
                                    <select class="form-control" v-model="input_asal.idKota">
                                        <option v-for="(item, index) in list_kota.asal" :key="index" :value="item.city_id">
                                            {{ item.city_name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- tujuan -->
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Ke </h4>
                                <div class="form-group">
                                    <label>Provinsi</label>
                                    <select class="form-control" v-model="input_tujuan.idProvinsi">
                                        <option v-for="(item, index) in list_provinsi" :key="index" :value="item.province_id">
                                            {{ item.province }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Kota</label>
                                    <select class="form-control" v-model="input_tujuan.idKota">
                                        <option v-for="(item, index) in list_kota.tujuan" :key="index" :value="item.city_id">
                                            {{ item.city_name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- berat -->
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Berat </h4>
                                <div class="form-group">
                                    <label>Berat (gram)</label>
                                    <input type="number" class="form-control" placeholder="Maks 30kg" min="0" maks="30000" v-model="input_berat">
                                </div>
                                <button type="button" class="btn btn-block waves-effect waves-light btn-success"
                                    style="margin-top: 50px" @click="cekHarga">Cek Harga</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- tabel -->
                <div class="row">
                    <!-- column -->
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body" style="padding: 0 1.25rem!important">
                                <!-- <h6 class="card-subtitle">Pilih salah satu jenis</h6> -->
                                <div class="table-responsive table-bordered">
                                    <table id="example" class="display" style="width:100%" v-if="list_harga.length>0">
                                        <thead>
                                            <tr>
                                                <th style="margin=auto">v</th>
                                                <th>Penyedia Jasa</th>
                                                <th>Jenis Layanan</th>
                                                <th>Estimasi Pengiriman</th>
                                                <th>Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in list_harga" :key="index">
                                                <td>
                                                    <label class="custom-control custom-radio">
                                                        <input name="jasa" type="radio" class="custom-control-input" :value="index" v-model="input_radio_jasa">
                                                        <span class="custom-control-indicator"></span>
                                                    </label>
                                                </td>
                                                <td>{{ item.nama }}</td>
                                                <td>
                                                    {{item.jenis_layanan}}
                                                </td>
                                                <td>{{item.estimasi}}</td>
                                                <td>{{item.harga}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row pull-right m-t-20">
                                <div class="col align-self-end ">
                                    <template v-if="!proses_pembayaran && input_radio_jasa != null">
                                        <button type="button" 
                                        class=" col-lg-4  btn waves-effect waves-light btn-success-gradiant pull-right"
                                        data-toggle="modal" data-target=".bs-example-modal-lg" @click="checkout"> Checkout </button>
                                    </template>
                                    <template v-if="proses_pembayaran">
                                        <h2 v-if="!status_pembayaran">Memproses pembayaran...</h2>
                                        <h2 v-if="status_pembayaran">Pembayaran berhasil</h2>
                                    </template>
                                    <!-- modal -->
                                    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
                                        aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h4 class="modal-title" id="myLargeModalLabel">Checkout</h4>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                        aria-hidden="true">×</button>
                                                </div>
                                                <div class="modal-body" style="padding-bottom: 0px!important">
                                                    <table class="table shop-table">
                                                        <tr>
                                                            <th class="b-0">Product</th>
                                                            <th class="b-0">Decription</th>
                                                            <th class="b-0 text-right">Price</th>
                                                        </tr>
                                                        
                                                        <tr>
                                                            <td colspan="3">
                                                                <div class="d-flex">
                                                                    <span>Sub Total</span>
                                                                    <h5 class="font-medium m-b-10 ml-auto"></h5>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <!-- Shipping -->
                                                        <tr v-if="layanan_dipilih != false">
                                                            <td>Shipping</td>
                                                            <td>
                                                                <h6>{{layanan_dipilih.nama}}</h6>
                                                                <h6 class="subtitle">{{layanan_dipilih.jenis_layanan}}</h6>
                                                                <h6 class="subtitle">{{layanan_dipilih.estimasi}} hari</h6>
                                                            </td>
                                                            <td class="text-right">
                                                                <h5 class="font-medium ml-auto">Rp. {{layanan_dipilih.harga.toLocaleString()}}</h5>
                                                            </td>
                                                        </tr>
                                                        <tr v-if="layanan_dipilih != false" style="background-color: #188ef433">
                                                            <td colspan="3">
                                                                <div class="d-flex">
                                                                    <span>Total</span>
                                                                    <h5 class="font-medium m-b-20 ml-auto">Rp. {{layanan_dipilih.harga.toLocaleString()}}</h5>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-info waves-effect text-left"
                                                        data-dismiss="modal" v-if="url_pembayaran != null" @click="buka_halaman_pembayaran">Bayar dengan Arta</button>
                                                </div>
                                            </div>
                                            <!-- /.modal-content -->
                                        </div>
                                        <!-- /.modal-dialog -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- column -->
                </div>
            </div>
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- Back to top -->
            <!-- ============================================================== -->
            <a class="bt-top btn btn-circle btn-lg btn-info" href="#top"><i class="ti-arrow-up"></i></a>
        </div>
        <!-- ============================================================== -->
        <!-- End Page wrapper  -->
        <!-- ============================================================== -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: function(){
        return {
            list_provinsi:[],
            input_asal:{
                idProvinsi:"",
                idKota:""
            },
            input_tujuan:{
                idProvinsi:"",
                idKota:""
            },
            input_berat: 0,
            list_kota:{
                asal:[],
                tujuan:[]
            },
            list_harga:[],
            input_radio_jasa: null,
            url_pembayaran: null,
            proses_pembayaran: false,
            kode_pembayaran: "",
            status_pembayaran: false
        }
    },
    watch:{
        'input_asal.idProvinsi': function(newvalue, oldvalue){
            this.getListKotaAsal();
        },
        'input_tujuan.idProvinsi': function(newvalue, oldvalue){
            this.getListKotaTujuan();
        }
    },
    computed:{
        layanan_dipilih: function(){
            if(this.input_radio_jasa === null){
                return false;
            }
            if(this.list_harga.length === 0){
                return false;
            }

            var item = this.list_harga[this.input_radio_jasa];
            console.log(item);
            return item;
        }
    },
    methods: {
        getListProvinsi: function(){
            axios.get('/provinsi').then((result) => {
                this.list_provinsi = result.data;
            }).catch(error => {
                console.log(error)
            })
        },
        getListKotaAsal: function(){
            axios.get('/kota?idProvinsi=' + this.input_asal.idProvinsi).then((result) => {
                this.list_kota.asal = result.data;
                console.log(result.data)
            }).catch(error => {
                console.log(error)
            })
        },
        getListKotaTujuan: function(){
            axios.get('/kota?idProvinsi=' + this.input_tujuan.idProvinsi).then((result) => {
                this.list_kota.tujuan = result.data;
                console.log(result.data)
            }).catch(error => {
                console.log(error)
            })
        },
        cekHarga: function(){
            const requestBody = {
                asal: this.input_asal.idKota,
                tujuan: this.input_tujuan.idKota,
                berat: this.input_berat
            }
            
            axios.post('/harga', requestBody).then((result) => {
                var data = result.data;

                var list_harga = [];

                for(var key in data ){
                    const kurir = data[key][0];
                    for(var index in kurir.costs){
                        const item_harga = {
                            nama: kurir.name,
                            jenis_layanan: kurir.costs[index].description, 
                            harga: kurir.costs[index].cost[0].value,
                            estimasi: kurir.costs[index].cost[0].etd
                        }

                        list_harga.push(item_harga);
                    }
                }

                this.list_harga = list_harga;
            }).catch(error => {
                console.log(error.response)
            })


        },
        checkout: function(){
            this.create_bill();
        },
        create_bill: function(){
            if(this.input_radio_jasa == null){
                return;
            }

            var jumlah = this.layanan_dipilih.harga;

            axios.post('https://arta.ruangkarya.id/payment/create-bill', {
                "token": "tk1559038507410",
	            "jumlah": jumlah
            }).then( result => {
                var url = "https://arta.ruangkarya.id/pay?paymentCode=" + result.data.data.kode;
                this.kode_pembayaran = result.data.data.kode;
                
                this.url_pembayaran = url;
            }).catch(error =>{
                console.log(error)
            })
        },
        buka_halaman_pembayaran: function(){
            if(this.url_pembayaran === null){
                return;
            }
            this.proses_pembayaran = true;
            window.open(this.url_pembayaran)
            var iterasi = setInterval(()=>{
                this.check_pembayaran();
                if(this.status_pembayaran){
                    clearInterval(iterasi);
                }
            },3000);
        },
        check_pembayaran: function(){
            axios.get("https://arta.ruangkarya.id/payment/get-status/" + this.kode_pembayaran).then( result =>{
                this.status_pembayaran = result.data.data.is_paid;
            }).catch(error => {
                console.log(error)
            })
        }
    },
    created: function(){
        this.getListProvinsi()
    }
}
</script>
