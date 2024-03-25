<script setup lang="ts">
import Article from '../components/shared/Article.vue';
import Divider from '../components/shared/Divider.vue';
import DateRangeFilterExample from '../components/examples/DateRangeFilterExample.vue';
import MemberFilterExample from '../components/examples/MemberFilterExample.vue';
import TopRankingFilterExample from '../components/examples/TopRankingFilterExample.vue';

</script>

<template>
  <Article
      title="Filters"
      description=""
    >
      <DateRangeFilterExample />
      <Divider />
      <MemberFilterExample />
      <Divider />
      <TopRankingFilterExample />
    </Article>
</template>
