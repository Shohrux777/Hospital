<template>
  <div>
    <mdb-card border="primary" class="mb-3 p-3" >
      <!-- product/category/color -->

          <mdb-row >
            <mdb-col v-if="product_bool" class="col-12 col-sm-12 col-md-4 col-lg-4">
              <small>{{'product'|locolize}}</small>
              <multiselect v-model="product"
                tag-placeholder="Add this as new tag"
                :placeholder="'product'|locolize"
                label="name"
                track-by="name"
                :showLabels ="false"
                :options="product_list"
                :multiple="true"
                :taggable="true"
                >
              </multiselect>
            </mdb-col>
             <mdb-col v-if="category_bool" class="col-12 col-sm-12 col-md-4 col-lg-3">
               <small>{{'category'|locolize}}</small>
               <multiselect v-model="sCategory" :showLabels ="false"
                  track-by="id" label="name"
                  :placeholder="'category'|locolize" :options="category_list">
                </multiselect>
             </mdb-col>
             <mdb-col v-if="color_bool" class="col-12 col-sm-12 col-md-4 col-lg-3">
               <small>{{'menu_color'|locolize}}</small>
               <multiselect v-model="color" :showLabels ="false"
                  track-by="id" label="name"
                  :placeholder="'menu_color'|locolize" :options="color_list">
                </multiselect>
             </mdb-col>
          </mdb-row>

          <mdb-row class="mt-2">
            <mdb-col v-if="company_bool" class="col-12 col-sm-12 col-md-4 col-lg-3">
               <small>{{'Branch_of_the_Company'|locolize}}</small>
               <multiselect v-model="company" :showLabels ="false"

                  track-by="name" label="name" @select="company_select"
                  :placeholder="'Branch_of_the_Company'|locolize" :options="allcompanys">
                </multiselect>
             </mdb-col>

             <mdb-col v-if="dept_bool" class="col-12 col-sm-12 col-md-4 col-lg-3">
               <small>{{'dept'|locolize}}</small>
               <multiselect v-model="dept" :showLabels ="false"
                  track-by="name" label="name" @select="dept_select"
                  :placeholder="'dept'|locolize" :options="dept_list">
                </multiselect>
             </mdb-col>

             <mdb-col v-if="sklad_bool" class="col-12 col-sm-12 col-md-4 col-lg-3" >
               <small>{{'sklad'|locolize}}</small>

               <multiselect v-model="sklad" :showLabels ="false"
                  track-by="name" label="name"
                  :placeholder="'sklad'|locolize" :options="sklad_list"
                  >
                </multiselect>
             </mdb-col>
          </mdb-row>
          <!-- <small>{{result}}</small> -->
          <div class="container">

            <mdb-btn class="float-right" color="success" @click="to_apply"
              p="r4 l4 t1 b1">{{'apply'|locolize}}</mdb-btn>

              <mdb-btn class="float-right" style="padding-top:2px; padding-bottom:2px" outline="primary" @click="clear"
              p="r4 l4 ">{{'clear'|locolize}}</mdb-btn>
          </div>
        </mdb-card>

  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

import {mapActions, mapGetters} from 'vuex';
import { mdbCard, mdbRow, mdbCol, mdbBtn
} from "mdbvue";

export default {

  components: {
      Multiselect, mdbCard, mdbRow, mdbCol, mdbBtn
    },
    props :
    {
      db_data:{
        type : Object,
        default : null
      },
      category_bool : {
        type : Boolean,
        default : false
      },
       dept_bool : {
        type : Boolean,
        default : false
      },
       company_bool : {
        type : Boolean,
        default : false
      },
       sklad_bool : {
        type : Boolean,
        default : false
      },
       color_bool : {
        type : Boolean,
        default : false
      },
      product_bool : {
        type : Boolean,
        default : false
      },

    },
  data() {
      return {
        sCategory : null,
        company : null,
        dept : null,
        sklad : null,
        color : null,
        product : null,

        //db_data : {},
        result : ""

      };
    },
    computed : mapGetters(['category_list','color_list','allcompanys','dept_list','sklad_list',
    'product_list']),
    mounted(){
      this.fetch_categorylist();
      this.fetch_color_list();
      this.fetch_companylist();
      this.fetch_product_list();
      this.fetch_dept_list();
      this.fetch_sklad_list();
    },
    methods :
    {
       ...mapActions(['fetch_categorylist','fetch_color_list','fetch_companylist',
       'fetch_dept_list_id','fetch_dept_list','fetch_sklad_list_id', 'fetch_sklad_list','fetch_product_list']),

      to_apply()
      {
        this.result = ""

        var i;
        var filter_or = ""
        if(this.sCategory != null)
          this.result += " and " + this.db_data.sCategory + "=" + this.sCategory.id
        if(this.company != null)
          this.result += " and " + this.db_data.company + "=" + this.company.id
        if(this.dept != null)
          this.result += " and " + this.db_data.dept + "=" + this.dept.id
        if(this.sklad != null)
          this.result += " and " + this.db_data.sklad + "=" + this.sklad.id
        if(this.color != null)
          this.result += " and " + this.db_data.color + "=" + this.color.id
        if(this.product != null && this.product.length > 0)
        {
          for(i = 0 ; i < this.product.length; i++)
          {
            if(i == this.product.length-1)
            {
              filter_or += this.db_data.product + "=" + this.product[i].id
            }
            else {
              filter_or +=" " + this.db_data.product + "=" + this.product[i].id + " or "
            }
          }
          this.result += " and (" + filter_or + ")"
        }

        this.$emit('apply', this.result);

      },
      clear()
      {
        this.sCategory = null
        this.company = null
        this.dept = null
        this.sklad = null
        this.color = null
        this.product = null
      },
      company_select(selectedOption)
      {
        this.fetch_dept_list_id(selectedOption.id);
        this.dept = null;
        this.sklad = null;
      },
      dept_select(selectedOption)
      {
        this.fetch_sklad_list_id(selectedOption.id);
        this.sklad = null;
      }
    }
}
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
