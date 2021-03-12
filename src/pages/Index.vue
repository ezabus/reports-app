<template>
  <q-page class="q-pa-sm" >
    <q-table
      virtual-scroll
      :virtual-scroll-item-size="48"
      :rows-per-page-options="[0]"
      title="Todos"
      :data="todos"
      :columns="columns"
      row-key="name">
      <template v-slot:top>
        <q-toolbar class="text-primary">
          <q-toolbar-title>
            Todos
          </q-toolbar-title>
          <q-btn color="primary" label="Add Todo" @click="addTodo"/>
        </q-toolbar>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { Todo, Column } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: { ExampleComponent },
  setup () {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);

    const columns = ref<Column[]>([
      {
        name: 'id',
        label: 'ID',
        field: 'id'
      },
      {
        name: 'content',
        label: 'Content',
        field: 'content'
      }
    ]);

    function addTodo (): void {
      const newTodo: Todo = {
        id: 6,
        content: 'ct6'
      };
      todos.value.push(newTodo);
    }

    return { todos, columns, addTodo };
  }
});
</script>
