<template>
  <q-page class="q-pa-sm" >
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        Reports
      </q-toolbar-title>
      <q-space />
      <q-btn color="primary" label="New Report" @click="addReport"/>
    </q-toolbar>
    <q-table
      virtual-scroll
      :virtual-scroll-item-size="48"
      :rows-per-page-options="[0]"
      :data="reports"
      :columns="columns"
      :filter="filter"
      :filter-method="filterTable"
      row-key="name">
      <template v-slot:top>
        <q-input
          debounce="300"
          class="reportNameSearch"
          v-model="filter.search"
          placeholder="Report Name">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space/>
        <q-select
          class="q-mr-md tagsFilter"
          v-model="filter.tags"
          multiple
          :options="$store.getters['common/getTags']"
          use-chips
          stack-label
          label="Tags"/>
      </template>
      <template v-slot:body-cell-tags="props">
        <q-td key="name" :props="props" data-cy="tags-td">
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
import { Report, Column, FilterState } from 'components/models';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  data: () => {
    return {
      columns: [
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
      ] as Column[],
      reports: [] as Report[],
      filter: { search: '', tags: [] } as FilterState
    };
  },
  async mounted () {
    await this.loadReports();
  },
  methods: {
    async addReport() {
      await this.$router.push('new');
    },
    onRequest() {
      debugger;
    },
    filterTable(rows: Report[], terms: FilterState) {
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
    },
    async loadReports() {
      const response = await this.$axios.get<Report[]>('/api/reports');
      this.$data.reports = response.data;
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

.tagsFilter {
  width: 300px;
}

@media (max-width: 600px) {
  .reportNameSearch {
    width: 100%;
  }
  .tagsFilter {
    width: 100%;
    margin-right: 0px;
  }
}
</style>
