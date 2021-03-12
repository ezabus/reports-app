<template>
  <q-page class="q-pa-sm" >
    <q-table
      virtual-scroll
      :virtual-scroll-item-size="48"
      :rows-per-page-options="[0]"
      :data="orders"
      :columns="columns"
      row-key="name">
      <template v-slot:top>
        <q-toolbar class="text-primary">
          <q-toolbar-title>
            Orders
          </q-toolbar-title>
          <q-btn color="primary" label="New Order" @click="addTodo"/>
        </q-toolbar>
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
import { Order, Column } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import axios from 'axios';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup () {
    const orders = ref<Order[]>([]);

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

    function addTodo (): void {
      const newTodo: Order = {
        name: 'New Order',
        description: 'just added order',
        tags: ['Invest', 'Stonks']
      };
      orders.value.push(newTodo);
    }

    async function loadTodos() {
      const response = await axios.get<Order[]>('/api/orders');
      orders.value = response.data;
    }

    onMounted(async () => {
      await loadTodos();
    });

    return { orders, columns, addTodo, loadTodos };
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
