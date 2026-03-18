import { CanvasBox } from '@/components/writing/mdx/canvasBox'

function Node({ value, x, y }: { value: number; x: number; y: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="13"
        fill="#f8f5f0"
        stroke="#b9b1a8"
        strokeWidth="1.25"
      />
      <text
        x={x}
        y={y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#2c2520"
        style={{
          fontFamily: 'DM Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: 12
        }}
      >
        {value}
      </text>
    </g>
  )
}

export function SkewedBST({
  values = [1, 2, 3, 4, 5],
  caption = 'Inserting sorted values degenerates a BST into a chain'
}: {
  values?: number[]
  caption?: string
}) {
  const xs = values.map((_, i) => 26 + i * 54)
  const ys = values.map((_, i) => 26 + i * 30)
  const w = Math.max(320, 60 + (values.length - 1) * 54)
  const h = Math.max(160, 70 + (values.length - 1) * 30)

  return (
    <CanvasBox className="p-4">
      <div className="flex flex-col gap-3">
        <div className="text-[12px] text-[#6b625a] dark:text-zinc-300/80">
          {caption}
        </div>
        <svg
          className="block w-full"
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="A right-skewed binary search tree"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5.3"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 z" fill="#b9b1a8" />
            </marker>
          </defs>

          {values.slice(0, -1).map((_, i) => (
            <path
              key={`e-${i}`}
              d={`M ${xs[i] + 10} ${ys[i] + 8} L ${xs[i + 1] - 10} ${ys[i + 1] - 8}`}
              fill="none"
              stroke="#b9b1a8"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
              strokeLinecap="round"
            />
          ))}

          {values.map((v, i) => (
            <Node key={`n-${v}-${i}`} value={v} x={xs[i]} y={ys[i]} />
          ))}
        </svg>
      </div>
    </CanvasBox>
  )
}
