<template>
  <q-page class="q-pa-sm row justify-evenly">
    <div class="q-pa-md" style="max-width: 600px; width: 400px;">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md">
        <q-input
          filled
          data-cy="report-name-input"
          v-model="report.name"
          label="Name"
          hint="Report Name"
          :rules="[val => !!val || 'Name is missing', isValidName]"/>
        <q-input
          filled
          data-cy="report-description-input"
          type="textarea"
          v-model="report.description"
          label="Description"
          hint="Report Description"
          :rules="[ val => val.length <= 140 || 'Please use maximum 140 characters']"/>
        <q-select
          filled
          data-cy="tags-select"
          v-model="report.tags"
          multiple
          :options="$store.getters['common/getTags']"
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
  name: 'PageNewReport',
  data: () => {
    return {
      report: {
        name: '',
        description: '',
        tags: [] as string[]
      }
    };
  },
  methods: {
    async onSubmit() {
      const report = this.$data.report;
      await this.$axios.post('/api/newReport', report);
      this.$router.back();
    },
    onReset() {
      this.$data.report = {
        name: '',
        description: '',
        tags: [] as string[]
      };
    },
    isValidName() {
      const pattern = /^[a-zA-Z_]*$/;
      return pattern.test(this.$data.report.name) || 'Only latin characters and underscore is allowed';
    }
  },
  async mounted() {
    // await this.loadTags();
  }
});
</script>
