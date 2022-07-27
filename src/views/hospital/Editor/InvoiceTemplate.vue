<template>
  <div class="template">
  </div>
</template>

<script>
export default {
  props: {
    invoice_number: String
  },
  data () {
    return {
      is_shipping_identical: true,
      billing_address: "<b>M. John Doe</b><br>98 Ooezfjefoi Laozdij<br>09823 Ljeiznr<br>FOPKSOFOF<br>AC310592815039",
      items: [{ key: Math.random(), ref: "X3000", desc: "My great product", qty: 1, price: 299 }],
      tax_percent: 20,
      shipping: 15
    }
  },
  mounted () {
    // initialize contenteditable fields manually
    this.$refs.billing_address.innerHTML = this.billing_address;
    this.$refs.tax_percent.innerHTML = this.tax_percent;
    this.$refs.shipping.innerHTML = this.shipping+".00";
  },
  computed: {
    today () {
      var date = new Date();
      return date.toJSON().slice(0,10).replace(/-/g,'.');
    },
    next_month () {
      var date = new Date();
      date.setDate(date.getDate() + 30);
      return date.toJSON().slice(0,10).replace(/-/g,'.');
    },
    sub_total () {
      return this.items.reduce((acc, item) => acc += item.qty * item.price, 0);
    },
    total () {
      return this.sub_total * (1 + this.tax_percent/100) + this.shipping;
    }
  },
  methods: {
    preventLineBreaks (e) { if(e.which == 13) e.preventDefault(); }
  }
}
</script>

<style scoped>
  table {
    width: 100%;
    border-spacing: 0;
  }
  table td {
    position: relative;
    padding: 6px;
    vertical-align: top;
  }
  table.order-table td {
    vertical-align: middle;
  }
  table thead td {
    font-weight: bold;
  }
  table tbody td {
    border-top: solid 1px #CCC;
  }
  input[type=number] {
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: rgba(200, 250, 230, 0.2);
    padding: 6px;
  }
  *[contenteditable=true] {
    background: rgba(200, 250, 230, 0.2);
    transition: padding 0.05s linear;
  }
  span[contenteditable=true]:focus {
    padding: 0 4px;
  }
  @media print {
    *[contenteditable=true], input {
      background: none;
    }
    .hide-in-print {
      display: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
      background: none;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .order {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .left-btn {
    position: absolute;
    left: -40px;
    top: 2px;
  }
  .left-btn:hover {
    opacity: 0.6;
  }
</style>