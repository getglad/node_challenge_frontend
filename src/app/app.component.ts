import { Component, ChangeDetectorRef } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { Neo4jService } from './neo4j.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  ipAddresses: any;
  errorMessage: any;
  d3: any;

  // Variables used for form control, user input to control graph
  nodeTypes: Array<string> = [];
  type1 = 'Domain';
  type2 = 'Domain' ;
  limitCount = '15';
  limitDepth = '5';

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService,
    private neoService: Neo4jService) {
    this.getNodes();
    this.nodeTypes = [
      'Domain',
      'IP'
    ];
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
    this._changeDetectorRef.detectChanges();
  }

  /**
   * Get data once
   */
  singleGetNodes() {
    this.neoService.getNodes(this.type1, this.type2, this.limitCount, this.limitDepth).subscribe(
      ipAddresses => this.ipAddresses = ipAddresses,
      error => this.errorMessage = <any>error,
      () => this.renderGraph()
    );
  }

  /**
   * Get the initial data and setup an update method
   */
  getNodes() {
    this.neoService.getNodes(this.type1, this.type2, this.limitCount, this.limitDepth).subscribe(
      ipAddresses => this.ipAddresses = ipAddresses,
      error => this.errorMessage = <any>error,
      () => this.renderGraph()
    );

    setInterval(() => {
      this.neoService.getNodes(this.type1, this.type2, this.limitCount, this.limitDepth).subscribe(
        ipAddresses => this.ipAddresses = ipAddresses,
        error => this.errorMessage = <any>error,
        () => this.renderGraph()
      );
    }, 60000);
  }

  /**
   * Render the 3D Force Graph
   */
  renderGraph(): void {
    const width = 800, height = 500;
    const force = d3.layout.force()
      .charge(-200).linkDistance(50).size([width, height]);
    const color = d3.scale.category20();

    d3.select('#graph').selectAll('svg').remove();

    const svg = d3.select('#graph').append('svg')
      .attr('width', '100%').attr('height', '100%')
      .attr('pointer-events', 'all');

    force.nodes(this.ipAddresses.nodes).links(this.ipAddresses.links).start();

    const link = svg.selectAll('.link')
      .data(this.ipAddresses.links).enter()
      .append('line').attr('class', 'link');

    svg.selectAll('.link')
      .data(this.ipAddresses.links).exit().remove();

    const node = svg.selectAll('.node')
      .data(this.ipAddresses.nodes).enter()
      .append('circle')
      .attr('fill', function (d, i) { return color(i.toString()); })
      .attr('class', d => {
        return 'node ' + d['IP']
      })
      .attr('r', 10)
      .call(force.drag);

    node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(function (d) { return d['title'] });

    svg.selectAll('.node')
      .data(this.ipAddresses.nodes).exit().remove();

    force.on('tick', () => {
      link.attr('x1', d => {
        return d['source'].x;
      }).attr('y1', d => {
        return d['source'].y;
      }).attr('x2', d => {
        return d['target'].x;
      }).attr('y2', d => {
        return d['target'].y;
      });

      node.attr('cx', d => {
        return d['x'];
      }).attr('cy', d => {
        return d['y'];
      });
    });
  }
}
