import * as d3 from 'd3'

import data from '~/assets/data/communities.json'

const width = 400, height = 250;

const color = d3.scaleLinear()
    .domain([0, 5])
    .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
    .interpolate(d3.interpolateHcl);

const pack = data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

let chart = function(element) {
  chart.zoomEvents = [];
  chart.root = pack(data);
  chart.focus = chart.root.descendants().find(d => d.data.name == 'Adelaide').parent;
  let view;

  const svg = d3.select(element)
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      .style('display', 'block')
      .style('background', color(0))
      .style('cursor', 'pointer')
      .on('click', (event) => zoom(event, chart.root));

  const node = svg.append('g')
    .selectAll('circle')
    .data(chart.root.descendants().slice(1))
    .join('circle')
      .attr('fill', d => d.children ? color(d.depth) : 'white')
      .attr('pointer-events', d => !d.children ? 'none' : null)
      .on('mouseover', function() { d3.select(this).attr('stroke', '#000'); })
      .on('mouseout', function() { d3.select(this).attr('stroke', null); })
      .on('click', (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

  const label = svg.append('g')
      .style('font', '10px sans-serif')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(chart.root.descendants())
    .join('text')
      .style('fill-opacity', d => d.parent === chart.root ? 1 : 0)
      .style('display', d => d.parent === chart.root ? 'inline' : 'none')
      .text(d => d.data.name);

  zoomTo([chart.root.x, chart.root.y, chart.root.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr('transform', d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr('transform', d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr('r', d => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = chart.focus;

    chart.focus = d;
    focus = chart.focus;

    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween('zoom', d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === 'inline'; })
      .transition(transition)
        .style('fill-opacity', d => d.parent === focus ? 1 : 0)
        .on('start', function(d) { if (d.parent === focus) this.style.display = 'inline'; })
        .on('end', function(d) { if (d.parent !== focus) this.style.display = 'none'; });

    chart.zoomEvents.forEach(onZoom => onZoom(d));
  }

  function zoomToCity(city) {
    let d = chart.root.descendants().find(d => d.data.name == city);

    if (d !== undefined)
      zoom({}, d.parent);
  }

  function onZoom(f) {
    chart.zoomEvents.push(f);
  }

  return {chart, zoomToCity, onZoom};
}

export default chart
