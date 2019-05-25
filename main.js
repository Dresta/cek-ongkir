const express = require('express');
const body_parser = require('body-parser');
const joi = require('joi');
const axios = require('axios').default;

const key = 'cc0a1f581638a96d0ec42c6d7508d365';
const base_url = 'https://api.rajaongkir.com/starter';

const app = express();

// app.use = middleware --> semua request masuk dari sini

app.use(body_parser.json());

// endpoint provinsi
// async -> supaya prosesnya tidak blocking

app.get('/provinsi', async function(req, res, next){

   //set nilai key pada header --> isinya API yang diatas

   const header = {
      key: key
   }

   //await biar prosesnya urut
   //manggil API rajaongkir

   try {
      var response = await axios.get(base_url + '/province', { headers: header});
   } catch (error) {
      res.status(400).send({ error: error.message });
   }

   //response.data --> mengambil data dari hasil request axios
   //res.send --> hanya menampilkan hasil dari "results" ke user

   const response_data = response.data;
   res.send(response_data.rajaongkir.results);
});

//endpoint city
//schema untuk memvalidasi data lengkap --> idProvinsi ada

app.get('/city', async function(req, res, next){
   const schema = joi.object().keys({
      idProvinsi: joi.string().required()
   });

   try {
      await joi.validate(req.query, schema);
   } catch (error) {
      return res.status(400).send({
         error: error.message
      });
   }

   //jika berhasil maka lanjut ke fungsinya berikutnya
   // req.query --> karna data request ada di query(url)

   next();
}, async function(req, res, next){
   const request_query = req.query;

      const header = {
         key: key
      }

      try {
         var response = await axios.get(base_url + '/city?province=' + request_query.idProvinsi, { headers: header });
      } catch (error) {
         res.status(400).send({ error: error.message });
      }

      const response_data = response.data;
      res.send(response_data.rajaongkir.results);
});

//endpoint cost

app.post('/cost', async function (req, res, next) {
   const schema = joi.object().keys({
      asal: joi.string().required(),
      tujuan: joi.string().required(),
      berat: joi.number().required()
   });

   try {
      await joi.validate(req.body, schema); //karna data berada di body
   } catch (error) {
      return res.status(400).send({
         error: error.message
      });
   }

   next();
}, async function(req,res,next){
   const request_data = req.body;

   const header = {
      key: key
   }

   const request_body = {
      origin: request_data.asal,
      destination: request_data.tujuan,
      weight: request_data.berat,
      courier: ""
   };

   try {
      request_body.courier = "jne";
      var response_jne = await axios.post(base_url + '/cost', request_body, {headers : header});

      request_body.courier = "tiki"
      var response_tiki = await axios.post(base_url + '/cost', request_body, { headers: header });

      request_body.courier = "pos"
      var response_pos = await axios.post(base_url + '/cost', request_body, {headers : header});
   }catch(error){
      return res.status(400).send({ error: error.message });
   }

   res.send({
      jne : response_jne.data.rajaongkir.results,
      tiki: response_tiki.data.rajaongkir.results,
      pos : response_pos.data.rajaongkir.results
   })
});



app.listen(process.env.PORT || 5023, function(){
   console.log('app ready');
});