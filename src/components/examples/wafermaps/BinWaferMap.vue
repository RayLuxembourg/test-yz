<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'
import { type WaferBinData } from './common'

interface Point {
  x: number
  y: number
  color: string
}

const props = defineProps<{
  title?: string
  waferBinData: WaferBinData
  onClick?: () => void
  height?: number
  width?: number
  delay?: number
}>()
const svgRef = ref<HTMLElement | null>(null)

const colorsMap = new Map([
  [1, '#00FF00'], // PASS
  [2, '#A3FD86'],
  [3, '#54B989'],
  [4, '#610F59'],
  [5, '#8F8436'],
  [6, '#6C57A0'],
  [7, '#23F4D8'],
  [8, '#157441'],
  [9, '#A8F6FA'],
  [10, '#42415E'],
  [11, '#B4CF17'],
  [12, '#0A2C38'],
  [13, '#D56E47'],
  [14, '#9A9A09'],
  [15, '#08FA69'],
  [16, '#1562A3'],
  [17, '#EBEB98'],
  [18, '#7119C9'],
  [19, '#427631'],
  [20, '#962C31'],
  [21, '#DB7242'],
  [22, '#C15251'],
  [23, '#1E1AF9'],
  [24, '#4B4A08'],
  [25, '#56DDE5'],
  [26, '#FFFF00']
])
const points = new Set(
  props.waferBinData.data.map((data) => ({
    x: data[0] + props.waferBinData.xMin,
    y: data[1] + props.waferBinData.yMin,
    color: colorsMap.get(data[2]) || 'gray',
    bin: data[2]
  }))
)

const titleFontSize = props.height && props.height > 250 ? '1.5em' : '0.75em'

onMounted(() => {
  const max_x = d3.max(points, (p) => p.x) as number
  const max_y = d3.max(points, (p) => p.y) as number
  const min_x = d3.min(points, (p) => p.x) as number
  const min_y = d3.min(points, (p) => p.y) as number
  const svg = d3.select(svgRef.value)

  svg
    .append('circle')
    .style('fill', 'whitesmoke')
    .style('stroke', 'black')
    .style('stroke-width', 0.025)
    .attr('id', 'd3-outer-circ')
    .attr('cx', 0.5)
    .attr('cy', 0.5);

  svg
    .append('circle')
    .style('fill', 'whitesmoke')
    .style('stroke', 'black')
    .style('stroke-width', 0.025)
    .attr('id', 'd3-inner-circ')
    .attr('cx', 0.5)
    .attr('cy', 0.5);

  svg.append('g').attr('id', 'd3-die')

  svg.attr('viewBox', [1 * min_x - 5, 1 * min_y, 2.5 * max_x, 2.5 * max_y].join(' '))

  function mouseover(d: Point, i: any) {
    svg
      .select('#d3-die')
      .append('rect')
      .attr('id', 'd3-tooltip')
      .attr('x', `${i.x + 2}`)
      .attr('y', `${i.y + 2}`)
      .attr('width', 20)
      .attr('height', 3)
      .attr('rx', 1)
      .attr('fill', 'white')

    svg
      .select('#d3-die')
      .append('text')
      .attr('id', 'd3-tooltip2')
      .attr('x', `${i.x + 3}`)
      .attr('y', `${i.y + 4}`)
      .attr('font-size', '2px')
      .attr('font-family', 'Roboto,Helvetica,Arial,sans-serif')
      .attr('bin', `${i.bin}`)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .text(`x: ${i.x}, y: ${i.y}, bin: ${i.bin}`)
  }

  const mouseout = function (d: Point, i: number) {
    svg.select('#d3-tooltip').remove()
    svg.select('#d3-tooltip2').remove()
  }

  const g = svg
    .select('#d3-die')
    .selectAll('rect')
    .data(points)
    .join('rect')
    .attr('x', (p) => p.x)
    .attr('y', (p) => p.y)
    .attr('bin', (p) => p.bin)
    .attr('width', 0.975)
    .attr('height', 0.975)
    .attr('fill', (p) => p.color)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.025)

  if (props.height && props.height > 250) {
    g.on('mouseover', mouseover as any)
    g.on('mouseout', mouseout as any)
  }
})
</script>

<template>
  <div
    :style="{
      height: `${height}px`,
      width: `${width}px`,
      display: 'inline-block'
    }"
  >
    <div
      :style="{
        paddingLeft: '15px',
        textAlign: 'center',
        fontSize: titleFontSize,
        fontFamily: 'Roboto,Helvetica,Arial,sans-serif'
      }"
    >
      {{ title }}
    </div>
    <svg ref="svgRef" :width="width" :height="height"></svg>
  </div>
</template>
