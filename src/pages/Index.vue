<template>
  <q-page class="q-pa-sm" >
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        Orders
      </q-toolbar-title>
      <q-space />
      <q-btn color="primary" label="New Order" @click="addOrder"/>
    </q-toolbar>
    <q-table
      virtual-scroll
      :virtual-scroll-item-size="48"
      :rows-per-page-options="[0]"
      :data="orders"
      :columns="columns"
      :filter="filter"
      :filter-method="filterTable"
      row-key="name">
      <template v-slot:top>
        <q-input borderless dense debounce="300" v-model="filter.search" placeholder="Order Name">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space/>
        <q-select
          filled
          class="q-mr-md"
          style="width: 300px"
          v-model="filter.tags"
          multiple
          :options="tags"
          use-chips
          stack-label
          label="Tags"/>
      </template>
      <template v-slot:body-cell-tags="props">
        <q-td key="name" :props="props">
          <div class="tagList">
            <div v-for="tag in props.row.tags" :key="tag">
              <q-chip dense color="primary" text-color="white">
                {{ tag }}
              </q-chip>
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { Order, Column, FilterState } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import axios from 'axios';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup () {
    const orders = ref<Order[]>([]);
    const filter = ref<FilterState>({ search: '', tags: [] });
    const tags = ref<string[]>([]);

    const columns = ref<Column[]>([
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left'
      },
      {
        name: 'description',
        label: 'Description',
        field: 'description',
        align: 'left'
      },
      {
        name: 'tags',
        label: 'Tags',
        field: 'tags'
      }
    ]);

    async function loadOrders() {
      const response = await axios.get<Order[]>('/api/orders');
      orders.value = response.data;
    }

    async function loadTags() {
      const response = await axios.get<string[]>('/api/tags');
      tags.value = response.data;
    }

    onMounted(async () => {
      await loadOrders();
      await loadTags();
    });

    return { orders, columns, loadOrders, filter, tags };
  },
  methods: {
    async addOrder() {
      await this.$router.push('new');
    },
    onRequest() {
      debugger;
    },
    filterTable(rows: Order[], terms: FilterState) {
      const filteredBySearchRows = rows
        .filter((row) => {
          return row.name.indexOf(terms.search) !== -1;
        });
      let rowsToReturn = filteredBySearchRows;
      if (terms.tags.length > 0) {
        rowsToReturn = filteredBySearchRows.filter(row => {
          const tagsSet = new Set<string>(row.tags);
          return terms.tags.every((tag) => tagsSet.has(tag));
        });
      }
      return rowsToReturn;
    }
  }
});
</script>

<style lang="css" scoped>
.tagList {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
