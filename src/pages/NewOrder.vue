<template>
  <q-page class="q-pa-sm row justify-evenly">
    <div class="q-pa-md" style="max-width: 600px; width: 400px;">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md">
        <q-input
          filled
          v-model="order.name"
          label="Name"
          hint="Order Name"/>
        <q-input
          filled
          type="textarea"
          v-model="order.description"
          label="Description"
          hint="Order Description"/>
        <q-select
          filled
          v-model="order.tags"
          multiple
          :options="tags"
          use-chips
          stack-label
          label="Tags"/>
        <div>
          <q-btn label="Create" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageNewOrder',
  data: () => {
    return {
      tags: [] as string[],
      order: {
        name: '',
        description: '',
        tags: [] as string[]
      }
    };
  },
  methods: {
    async loadTags() {
      const tags = (await this.$axios.get<string[]>('/api/tags')).data;
      this.$data.tags = tags;
    },
    async onSubmit() {
      const order = this.$data.order;
      await this.$axios.post('/api/newOrder', order);
      this.$router.back();
    },
    onReset() {
      this.$data.order = {
        name: '',
        description: '',
        tags: [] as string[]
      };
    }
  },
  async mounted() {
    await this.loadTags();
  }
});
</script>
