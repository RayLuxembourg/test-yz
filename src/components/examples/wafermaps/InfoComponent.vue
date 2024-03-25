<script setup lang="ts">
import { type QueryResultData } from '@sisense/sdk-data'
import { TableWrapper, Table, Row, RowHead, Cell } from './styledComponents'

const props = defineProps<{
  data: QueryResultData
  limit?: number
}>()
</script>

<template>
  <TableWrapper mheight="392px">
    <Table>
      <tbody>
        <Row
          v-for="(cell, i) in data.rows[0].slice(0, limit)"
          :key="`${i}row`"
          :id="`${i}row`"
          style="border: 1px solid lightGray"
        >
          <RowHead
            :style="{
              paddingLeft: '20px',
              paddingRight: '20px',
              textAlign: 'left'
            }"
          >
            {{ data.columns[i].name }}
          </RowHead>
          <Cell
            :key="`${cell.text}${i}`"
            :id="`${cell.text}${i}`"
            :style="{
              paddingLeft: '20px',
              paddingRight: '20px',
              textAlign: 'left'
            }"
          >
            <p>{{ cell.text }}</p>
          </Cell>
        </Row>
      </tbody>
    </Table>
  </TableWrapper>
</template>
