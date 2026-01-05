'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import * as d3 from 'd3';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Flag,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

/* ---------- Types ---------- */

interface Node {
  id: string;
  label: string;
  type: string;
  author: string;
  group: number;
  val: number;
  rating: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphLink {
  source: string | Node;
  target: string | Node;
  type: string;
}

interface GraphData {
  nodes: Node[];
  links: GraphLink[];
}

/* ---------- Component ---------- */

export default function DebateView() {
  const params = useParams();
  const id = params?.id as string;

  const svgRef = useRef<SVGSVGElement>(null);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [argumentText, setArgumentText] = useState('');
  const [ratingFeedback, setRatingFeedback] = useState('');

  const [ratings, setRatings] = useState({
    clarity: 0,
    evidence: 0,
    logic: 0,
    relevance: 0,
    originality: 0,
  });

  /* ---------- Graph Data ---------- */

  const data: GraphData = {
    nodes: [
      { id: 'root', label: 'Digital Watermarking should be mandatory', type: 'resolution', author: 'System', group: 1, val: 30, rating: 4.5 },
      { id: 'a1', label: 'Essential for preserving copyright', type: 'support', author: 'CriticalThinker', group: 2, val: 20, rating: 4.2 },
      { id: 'a2', label: 'Prevents misinformation at scale', type: 'support', author: 'IssueAdvocate', group: 2, val: 22, rating: 4.7 },
      { id: 'r1', label: 'Watermarks are easily bypassed', type: 'refute', author: 'TechExpert', group: 3, val: 18, rating: 3.9 },
    ],
    links: [
      { source: 'a1', target: 'root', type: 'supports' },
      { source: 'a2', target: 'root', type: 'supports' },
      { source: 'r1', target: 'a2', type: 'refutes' },
    ],
  };

  /* ---------- D3 ---------- */

  useEffect(() => {
  if (!svgRef.current) return;

  const svg = d3.select(svgRef.current);
  const width = window.innerWidth;
  const height = window.innerHeight;

  svg.selectAll('*').remove();

  const simulation = d3
  .forceSimulation<Node>(data.nodes)
  .force(
    'link',
    d3
      .forceLink<Node, GraphLink>(data.links) // use the renamed type
      .id(d => d.id)
      .distance(150)
  )
  .force('charge', d3.forceManyBody().strength(-800))
  .force('center', d3.forceCenter(width / 2, height / 2));

  const link = svg
    .append('g')
    .attr('stroke', '#334155')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(data.links)
    .join('line')
    .attr('stroke-width', 2);

  const nodeGroup = svg
    .append('g')
    .selectAll<SVGGElement, Node>('g')
    .data(data.nodes)
    .join('g')
    .attr('class', 'cursor-pointer')
    .call(
      d3
        .drag<SVGGElement, Node>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    )
    .on('click', (_, d) => {
      setSelectedNode(d);
      setShowSidebar(true);
    });

  nodeGroup
    .append('circle')
    .attr('r', d => d.val)
    .attr('fill', d =>
      d.type === 'resolution'
        ? '#3b82f6'
        : d.type === 'support'
        ? '#10b981'
        : d.type === 'refute'
        ? '#ef4444'
        : '#8b5cf6'
    )
    .attr('stroke', '#1e293b')
    .attr('stroke-width', 3);

  nodeGroup
    .append('text')
    .text(d => d.label.slice(0, 20) + '...')
    .attr('fill', '#fff')
    .attr('font-size', '10px')
    .attr('text-anchor', 'middle')
    .attr('dy', d => d.val + 14);

  simulation.on('tick', () => {
    link
      .attr('x1', d => (d.source as Node).x ?? 0)
      .attr('y1', d => (d.source as Node).y ?? 0)
      .attr('x2', d => (d.target as Node).x ?? 0)
      .attr('y2', d => (d.target as Node).y ?? 0);

    nodeGroup.attr(
      'transform',
      d => `translate(${d.x ?? 0}, ${d.y ?? 0})`
    );
  });

  // ✅ Cleanup function returns void
  return () => {
    simulation.stop();
  };
}, [data.nodes, data.links]);


  /* ---------- Helpers ---------- */

  const renderStars = (count: number) =>
    '★'.repeat(Math.floor(count)) + '☆'.repeat(5 - Math.floor(count));

  /* ---------- JSX ---------- */

  return (
    <div className="w-screen h-screen bg-[#0f172a] text-white relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-slate-900/70 backdrop-blur border-b border-white/10">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          ArgumentGraph
        </Link>
      </header>

      {/* Back */}
      <Link
        href="/"
        className="fixed top-24 left-8 z-50 flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-lg"
      >
        <ArrowLeft size={16} /> Back
      </Link>

      {/* Graph */}
      <svg ref={svgRef} width="100%" height="100%" />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-96 bg-slate-900/90 transition ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedNode && (
          <div className="p-6 pt-24">
            <h3 className="text-xl font-bold mb-4">{selectedNode.label}</h3>
            <div className="text-yellow-500">
              {renderStars(selectedNode.rating)}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
