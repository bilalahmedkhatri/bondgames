import { ImageResponse } from 'next/og';

export function GET() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', background: '#0b0e14', color: '#f1f5f9', padding: 80, borderLeft: '18px solid #e63946' }}>
      <div style={{ display: 'flex', fontSize: 94, fontWeight: 800 }}>GAMER<span style={{ color: '#e63946' }}>GRID</span></div>
      <div style={{ fontSize: 38, marginTop: 30 }}>Gaming news. Reviews. Hardware.</div>
      <div style={{ fontSize: 26, marginTop: 58, color: '#8b95a5' }}>www.bondsgame.click</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
