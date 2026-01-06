'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import * as d3 from 'd3';
import { ArrowLeft } from 'lucide-react';

/* ===================== TYPES ===================== */

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

/* ===================== MOCK DATA ===================== */

// Mock debate data - in a real app, this would come from an API
const mockDebates: Record<string, GraphData> = {
  '1': {
    nodes: [
      { id: 'root', label: 'Should AI-generated content require a mandatory digital watermark?', type: 'resolution', author: 'TechEthicist', group: 1, val: 30, rating: 4.5 },
      { id: 'a1', label: 'Essential for preserving copyright and intellectual property', type: 'support', author: 'CriticalThinker', group: 2, val: 20, rating: 4.2 },
      { id: 'a2', label: 'Prevents misinformation at scale', type: 'support', author: 'IssueAdvocate', group: 2, val: 22, rating: 4.7 },
      { id: 'r1', label: 'Watermarks are easily bypassed by hackers', type: 'refute', author: 'TechExpert', group: 3, val: 18, rating: 3.9 },
      { id: 'r2', label: 'Inhibits open-source AI development', type: 'refute', author: 'Student_99', group: 3, val: 15, rating: 3.5 },
      { id: 'e1', label: 'Study: 90% of pixels can be modified without losing ID', type: 'evidence', author: 'Researcher', group: 2, val: 12, rating: 4.8 }
    ],
    links: [
      { source: 'a1', target: 'root', type: 'supports' },
      { source: 'a2', target: 'root', type: 'supports' },
      { source: 'r1', target: 'a2', type: 'refutes' },
      { source: 'r2', target: 'root', type: 'refutes' },
      { source: 'e1', target: 'a1', type: 'proves' }
    ]
  },
  '2': {
    nodes: [
      { id: 'root', label: 'Should cryptocurrencies be classified as securities?', type: 'resolution', author: 'FinanceGuru', group: 1, val: 30, rating: 4.3 },
      { id: 'a1', label: 'Most crypto tokens function like investment contracts', type: 'support', author: 'LegalExpert', group: 2, val: 20, rating: 4.1 },
      { id: 'a2', label: 'Investor protection requires SEC oversight', type: 'support', author: 'PolicyMaker', group: 2, val: 18, rating: 4.4 },
      { id: 'r1', label: 'Decentralized nature makes traditional regulation impossible', type: 'refute', author: 'CryptoAdvocate', group: 3, val: 22, rating: 3.8 },
      { id: 'r2', label: 'Innovation requires regulatory flexibility', type: 'refute', author: 'TechInnovator', group: 3, val: 16, rating: 3.6 }
    ],
    links: [
      { source: 'a1', target: 'root', type: 'supports' },
      { source: 'a2', target: 'root', type: 'supports' },
      { source: 'r1', target: 'root', type: 'refutes' },
      { source: 'r2', target: 'a2', type: 'refutes' }
    ]
  },
  '3': {
    nodes: [
      { id: 'root', label: 'Is universal basic income economically viable?', type: 'resolution', author: 'PolicyAnalyst', group: 1, val: 30, rating: 4.6 },
      { id: 'a1', label: 'Reduces poverty and inequality effectively', type: 'support', author: 'SocialWorker', group: 2, val: 20, rating: 4.3 },
      { id: 'a2', label: 'Simplifies welfare system administration', type: 'support', author: 'EconStudent', group: 2, val: 18, rating: 4.0 },
      { id: 'r1', label: 'Massive fiscal burden on government budgets', type: 'refute', author: 'FiscalConservative', group: 3, val: 24, rating: 4.1 },
      { id: 'r2', label: 'May reduce work incentives and productivity', type: 'refute', author: 'LaborEconomist', group: 3, val: 19, rating: 3.9 }
    ],
    links: [
      { source: 'a1', target: 'root', type: 'supports' },
      { source: 'a2', target: 'root', type: 'supports' },
      { source: 'r1', target: 'root', type: 'refutes' },
      { source: 'r2', target: 'root', type: 'refutes' }
    ]
  },
  '4': {
    nodes: [
      { id: 'root', label: 'Should social media platforms be held liable for user content?', type: 'resolution', author: 'LegalScholar', group: 1, val: 30, rating: 4.4 },
      { id: 'a1', label: 'Platforms profit from harmful content engagement', type: 'support', author: 'MediaCritic', group: 2, val: 20, rating: 4.2 },
      { id: 'a2', label: 'Current Section 230 protections are outdated', type: 'support', author: 'PolicyReformer', group: 2, val: 18, rating: 4.0 },
      { id: 'r1', label: 'Would destroy free speech and innovation', type: 'refute', author: 'TechLibertarian', group: 3, val: 22, rating: 3.7 },
      { id: 'r2', label: 'Impossible to moderate billions of posts effectively', type: 'refute', author: 'PlatformEngineer', group: 3, val: 19, rating: 4.1 }
    ],
    links: [
      { source: 'a1', target: 'root', type: 'supports' },
      { source: 'a2', target: 'root', type: 'supports' },
      { source: 'r1', target: 'root', type: 'refutes' },
      { source: 'r2', target: 'a1', type: 'refutes' }
    ]
  },
  '5': {
    nodes: [
      { id: 'root', label: 'Does remote work improve overall productivity?', type: 'resolution', author: 'WorkCulturePro', group: 1, val: 30, rating: 4.2 },
      { id: 'a1', label: 'Eliminates commute time and office distractions', type: 'support', author: 'RemoteWorker', group: 2, val: 20, rating: 4.3 },
      { id: 'a2', label: 'Allows for better work-life balance', type: 'support', author: 'HRSpecialist', group: 2, val: 18, rating: 4.1 },
      { id: 'r1', label: 'Collaboration and creativity suffer without in-person interaction', type: 'refute', author: 'TeamManager', group: 3, val: 21, rating: 3.9 },
      { id: 'r2', label: 'Home distractions reduce focus and efficiency', type: 'refute', author: 'ProductivityExpert', group: 3, val: 17, rating: 3.8 }
    ],
    links: [
      { source: 'a1', target: 'root', type: 'supports' },
      { source: 'a2', target: 'root', type: 'supports' },
      { source: 'r1', target: 'root', type: 'refutes' },
      { source: 'r2', target: 'root', type: 'refutes' }
    ]
  },
  '6': {
    nodes: [
      { id: 'root', label: 'Should gene editing be allowed for human enhancement?', type: 'resolution', author: 'BioethicsExpert', group: 1, val: 30, rating: 4.7 },
      { id: 'a1', label: 'Could eliminate genetic diseases and suffering', type: 'support', author: 'GeneticResearcher', group: 2, val: 22, rating: 4.5 },
      { id: 'a2', label: 'Enhances human potential and capabilities', type: 'support', author: 'Transhumanist', group: 2, val: 19, rating: 4.2 },
      { id: 'r1', label: 'Creates inequality between enhanced and natural humans', type: 'refute', author: 'SocialJusticeAdvocate', group: 3, val: 24, rating: 4.3 },
      { id: 'r2', label: 'Unknown long-term consequences for human species', type: 'refute', author: 'CautiousScientist', group: 3, val: 20, rating: 4.4 },
      { id: 'e1', label: 'CRISPR trials show 95% success rate in disease prevention', type: 'evidence', author: 'ClinicalTrialLead', group: 2, val: 14, rating: 4.8 }
    ],
    links: [
      { source: 'a1', target: 'root', type: 'supports' },
      { source: 'a2', target: 'root', type: 'supports' },
      { source: 'r1', target: 'root', type: 'refutes' },
      { source: 'r2', target: 'root', type: 'refutes' },
      { source: 'e1', target: 'a1', type: 'proves' }
    ]
  }
};

/* ===================== PAGE ===================== */

export default function DebateView() {
  const params = useParams<{ id: string }>();
  const debateId = params?.id;

  const svgRef = useRef<SVGSVGElement>(null);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [debateData, setDebateData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ===================== DATA LOADING ===================== */

  // Simulate data fetching
  useEffect(() => {
    const fetchDebateData = async () => {
      console.log('Fetching debate data for ID:', debateId);
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (debateId && mockDebates[debateId]) {
          console.log('Found debate data for ID:', debateId);
          setDebateData(mockDebates[debateId]);
        } else {
          console.log('No debate found for ID:', debateId);
          setError('Debate not found');
        }
      } catch (err) {
        console.error('Error loading debate:', err);
        setError('Failed to load debate data');
      } finally {
        setLoading(false);
      }
    };

    if (debateId) {
      fetchDebateData();
    } else {
      setLoading(false);
      setError('No debate ID provided');
    }
  }, [debateId]);

  /* ===================== D3 GRAPH ===================== */

  useEffect(() => {
    if (!svgRef.current || !debateData) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.selectAll('*').remove();

    // Simple fixed positions for testing
    const centerX = width / 2;
    const centerY = height / 2;
    
    const nodesWithPositions = debateData.nodes.map((node, i) => ({
      ...node,
      x: centerX + (i - debateData.nodes.length / 2) * 150,
      y: centerY + (Math.sin(i) * 100)
    }));

    // Create simple circles without complex simulation
    const nodeGroup = svg
      .append('g')
      .selectAll('g')
      .data(nodesWithPositions)
      .join('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('class', 'cursor-pointer')
      .on('click', (_, d) => {
        setSelectedNode(d);
        setShowSidebar(true);
      });

    nodeGroup
      .append('circle')
      .attr('r', d => d.val)
      .attr('fill', d => {
        if (d.type === 'resolution') return '#3b82f6';
        if (d.type === 'support') return '#10b981';
        if (d.type === 'refute') return '#ef4444';
        return '#8b5cf6';
      })
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 3);

    nodeGroup
      .append('text')
      .text(d => `${d.label.slice(0, 15)}...`)
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.val + 20);

    // Simple lines between nodes
    svg
      .append('g')
      .selectAll('line')
      .data(debateData.links)
      .join('line')
      .attr('stroke', '#334155')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .attr('x1', d => {
        const source = nodesWithPositions.find(n => n.id === (typeof d.source === 'string' ? d.source : d.source.id));
        return source?.x || 0;
      })
      .attr('y1', d => {
        const source = nodesWithPositions.find(n => n.id === (typeof d.source === 'string' ? d.source : d.source.id));
        return source?.y || 0;
      })
      .attr('x2', d => {
        const target = nodesWithPositions.find(n => n.id === (typeof d.target === 'string' ? d.target : d.target.id));
        return target?.x || 0;
      })
      .attr('y2', d => {
        const target = nodesWithPositions.find(n => n.id === (typeof d.target === 'string' ? d.target : d.target.id));
        return target?.y || 0;
      });

  }, [debateData]);

  /* ===================== HELPERS ===================== */

  const renderStars = (count: number) =>
    '★'.repeat(Math.floor(count)) + '☆'.repeat(5 - Math.floor(count));

  /* ===================== UI ===================== */

  if (loading) {
    return (
      <div className="w-screen h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading debate...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!debateData) {
    return (
      <div className="w-screen h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Debate Not Found</h2>
          <p className="text-slate-400 mb-6">The debate you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#0f172a] text-white overflow-hidden relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between px-8 py-4 bg-slate-900/70 backdrop-blur border-b border-white/10">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          ArgumentGraph
        </Link>
        <div className="text-sm text-slate-400">
          Debate ID: {debateId} | Nodes: {debateData.nodes.length}
        </div>
      </header>

      {/* Back */}
      <Link
        href="/"
        className="fixed top-24 left-8 z-50 flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition"
      >
        <ArrowLeft size={18} /> Back
      </Link>

      {/* Debug Info */}
      <div className="fixed top-20 right-4 z-50 bg-slate-900/90 px-3 py-2 rounded border border-slate-700 text-xs">
        <div>Loading: {loading.toString()}</div>
        <div>Error: {error || 'none'}</div>
        <div>Data: {debateData ? 'loaded' : 'null'}</div>
        <div>ID: {debateId} | Nodes: {debateData?.nodes.length || 0}</div>
      </div>

      {/* Simple fallback to test if data is there */}
      {debateData && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-900/95 p-6 rounded-lg border border-slate-700 text-center">
          <h2 className="text-xl font-bold mb-4 text-white">
            {debateData.nodes.find(n => n.id === 'root')?.label}
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {debateData.nodes.slice(1).map(node => (
              <div key={node.id} className="flex items-center gap-2 p-2 bg-slate-800 rounded">
                <div 
                  className={`w-4 h-4 rounded-full ${
                    node.type === 'support' ? 'bg-green-500' :
                    node.type === 'refute' ? 'bg-red-500' :
                    'bg-purple-500'
                  }`}
                />
                <span className="text-white text-xs">{node.label.slice(0, 25)}...</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowSidebar(true)}
            className="mt-4 bg-blue-600 px-4 py-2 rounded text-white text-sm"
          >
            Show Details
          </button>
        </div>
      )}

      {/* Graph */}
      <svg ref={svgRef} className="w-full h-full" />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-96 bg-slate-900/90 backdrop-blur border-l border-white/10 p-8 pt-24 transition-transform ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedNode && (
          <>
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2 pr-8">{selectedNode.label}</h3>
            <p className="text-slate-400 mb-2">@{selectedNode.author}</p>
            <div className="mb-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                selectedNode.type === 'resolution' ? 'bg-blue-500/20 text-blue-400' :
                selectedNode.type === 'support' ? 'bg-green-500/20 text-green-400' :
                selectedNode.type === 'refute' ? 'bg-red-500/20 text-red-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {selectedNode.type}
              </span>
            </div>
            <div className="mt-4 text-yellow-500">{renderStars(selectedNode.rating)}</div>
            <p className="text-sm text-slate-500 mt-2">Rating: {selectedNode.rating}/5</p>
          </>
        )}
      </aside>
    </div>
  );
}
