<template>
  <div class="receipt">
    <div class="container border p-2">
      <div class="row">
        <div class="col-4">
          <h6 class="header_font">Номер заказа</h6>
          <h6 class="header_font2">0151612.</h6>
        </div>
        <div class="col-4">
          <h6 class="header_font">Дата</h6>
          <h6 class="header_font">15.08.2021</h6>
        </div>
        <div class="col-4">
          <h6 class="header_font">Время</h6>
          <h6 class="header_font">13:08:05</h6>
        </div>
      </div>
      <div>
        <h5 class="header_name ">
          Тэшматов Баходир Хамдамович 
        </h5>
      </div>
      <div class="container">
        <div class="row px-4">
          <div class="col-6">
            <h6 class="header_font">Статья 452</h6>
          </div>
          <div class="col-6">
            <h6 class="header_font">часть 3</h6>
          </div>
        </div>
      </div>

      <div class="row ">
        <div class="col-12 ">
          <div class="d-flex">
            <h6 class="header_font">код, л/с </h6>
            <h6 class="header_font2 ml-5">46546854</h6>
          </div>
        </div>
      </div>
      <div class="TablePatientDocId ">
          <table class="recieptTable bordered">
            <thead>
              <tr class="header">
                <th>{{$t('№')}}</th>
                <th>{{$t('Код товара')}}</th>
                <th>{{$t('Наименования товар ')}}</th>
                <th >{{$t('ед/изм ')}}</th>
                <th >{{$t('кол-во')}}</th>
                <th >{{$t('Цена')}}</th>
                <th >{{$t('Сумма')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in zakaz_product_list" :key="i">
                <td><span>{{i+1}}</span></td>
                <td><span>{{item.code}}</span></td>
                <td><span>{{item.name}}</span></td>
                <td><span>ш/т</span></td>
                <td><span>{{item.qty}}</span></td>
                <td><span>{{item.price}}</span></td>
                <td><span>{{item.qty*item.price}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="info mt-4 d-flex justify-content-between px-3">
          <div class="text px-2 py-1">
            <h6 class="header_font">Лимит </h6>
            <h6 class="header_font">Выбрано товаров на сумму</h6>
            <h6 class="header_font ">Остатик лимита</h6>
          </div>
          <div class="price px-2 py-1">
            <h6 class="header_font font-weight-bold border-bottom">230000</h6>
            <h6 class="header_font font-weight-bold border-bottom">{{product_summ}}</h6>
            <h6 class="header_font font-weight-bold border-bottom m-0 p-0">90000</h6>
          </div>
        </div>
        <div class="potpis d-flex mt-3  justify-content-end">
          <div class="price mr-3" style=" width: 100px; height: 60px; position: relative;">
            <h6 class="header_font p-0 m-0" style="position: absolute; bottom: 0; left: -70%;">Подпись</h6>
          </div>
        </div>
      

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: mapGetters(['zakaz_product_list', 'product_summ']),
  mounted(){
    console.log('dasdasdasdasd')
    console.log(this.zakaz_product_list)
  }
}
</script>

<style lang="scss">
.receipt{
  .header_font{
    font-size: 13px;
  }
  .header_font2{
    font-size: 14.5px;
    font-weight: bold;
  }
  .header_name{
    font-size: 20px;
    font-weight: bold;
  }
  .price{
    border: 1px solid rgb(152, 152, 152);
  }
}
.recieptTable {

}
.recieptTable th{
  font-weight: 600;
  font-size:12px;
}
.recieptTable td{
  font-size:13px;
}
.recieptTable th, .recieptTable td {
  text-align: left;
  padding: 10px;
  border: 1px solid rgb(152, 152, 152);

}

.recieptTable tr {
  // border-bottom: 1px solid rgb(240, 240, 240);
}

.recieptTable tr.header, .recieptTable tr:hover {
  // background-color: #f1f1f1;
}
</style>