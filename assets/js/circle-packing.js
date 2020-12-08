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
  let origin = d3.zoomIdentity.translate(-width/2, -height/2);
  chart.zoomEvents = [];
  chart.root = pack(data);
  chart.focus = chart.root.descendants().find(d => d.data.name == 'Australia').parent;
  chart.scale = 1;

  const svg = d3.select(element)
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      .style('display', 'block')
      .style('background', color(0))
      .style('cursor', 'pointer');

  const nodeGroup = svg.append('g');

  const labelGroup = svg.append('g');

  const label = labelGroup
    .style('font', '10px sans-serif')
    .attr('pointer-events', 'none')
    .attr('text-anchor', 'middle')

   let zoom = d3.zoom()
     .on('zoom', event => {
       chart.zoomEvents.forEach(f => f(event));
       zoomTo(event.transform);
     });

  svg.call(zoom);

  function containing(extent, point, r, overlapping) {
    r = r || 0;
    let coordinates = {
        left: extent[0][0],
        right: extent[1][0],
        top: extent[0][1],
        bottom: extent[1][1], 
    };
    if (!!overlapping &&
        (point[0]+r > coordinates.left ||
        point[0]-r < coordinates.right ||
        point[1]+r > coordinates.top ||
        point[1]-r < coordinates.bottom)) {
      return true;
    }
    if (!overlapping &&
        point[0]+r > coordinates.left &&
        point[0]-r < coordinates.right &&
        point[1]+r > coordinates.top &&
        point[1]-r < coordinates.bottom) {
      return true;
    }

    return false;
  }

  function zoomTo(transform) {
    let extent = [[-width/2, -height/2], [width/2, height/2]];
    let visible = chart.root.descendants().slice(1)
      .sort((a,b) => b.r - a.r)
      .filter(d => containing(extent, transform.apply([d.x, d.y]), d.r*transform.k, true))
      .filter(d => {
        if (d.parent)
          return transform.k * d.parent.r > 20
          && transform.k * d.r > 2;
        else
          return true;
      });


    nodeGroup.selectAll('circle')
      .data(visible)
      .join(
        enter => enter.append('circle')
          .attr('fill', d => d.children ? color(d.depth) : 'white')
          .attr('r', d => transform.k * d.r)
          .attr('transform', d => transform.translate(d.x, d.y).scale(1/transform.k))
          .on('mouseover', function() { d3.select(this).attr('stroke', '#000'); })
          .on('mouseout', function() { d3.select(this).attr('stroke', null); }),
        update => update
          .attr('fill', d => d.children ? color(d.depth) : 'white')
          .attr('r', d => transform.k * d.r)
          .attr('transform', d => transform.translate(d.x, d.y).scale(1/transform.k))
          .attr('pointer-events', d => !d.children ? 'none' : null)
          .on('click', (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())),
        exit => exit
          .remove()
      );

    let visibleLabels = visible
      .filter(d => containing(extent, transform.apply([d.x, d.y])))
      .slice(0, 10);
    let vls = visibleLabels.map(d => d.data.name);
    visibleLabels = visibleLabels
      .filter(d => !d.children || !d.children.some(c => vls.includes(c.data.name)));

    labelGroup.selectAll('text')
      .data(visibleLabels)
      .join(
        enter => enter.append('text'),
        update => update
          .text(d => d.data.name)
          .attr('transform', d => transform.translate(d.x, d.y).scale(1/transform.k)),
        exit => exit
          .remove()
      );

  }

  function zoomToCity(city) {
    let d = chart.root.descendants().find(d => d.data.name == city);
    if (d !== undefined && d.parent) {
      zoom.translateTo(svg, d.parent.x, d.parent.y)
      zoom.scaleTo(svg, chart.root.r/d.parent.r)
    }
  }

  function zoomToLevel(level) {
    zoom.scaleTo(svg, level)
  }

  function onZoom(f) {
    chart.zoomEvents.push(f);
  }

  return {chart, zoomToCity, zoomToLevel, onZoom};
}

export default chart
