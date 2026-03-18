import type { MDXComponents } from 'mdx/types'
import type { ReactElement } from 'react'
import type { BundledLanguage } from 'shiki'
import { Collapsible } from '@/components/writing/mdx/collapsible'
import { CodeBlock } from '@/components/writing/mdx/codeBlock'
import { AVLTree, BalanceFactorDemo } from '@/components/writing/mdx/avlTree'
import { CanvasBox } from '@/components/writing/mdx/canvasBox'
import { SkewedBST } from '@/components/writing/mdx/skewedBst'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-7 text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-zinc-900 underline decoration-zinc-400 underline-offset-2 transition-colors hover:decoration-zinc-800 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-200"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1.5">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1.5">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-7 text-zinc-700 dark:text-zinc-300">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-zinc-300 pl-5 text-zinc-500 italic dark:border-zinc-600 dark:text-zinc-400">
        {children}
      </blockquote>
    ),
    pre: ({ children }) => {
      const codeEl = children as ReactElement<{
        className?: string
        children?: string
      }>
      const className = codeEl?.props?.className ?? ''
      const lang = (className.replace('language-', '') ||
        'text') as BundledLanguage
      const code = String(codeEl?.props?.children ?? '').trimEnd()
      // return <CodeBlock code={code} language={lang} showLineNumbers={false} />
      return <CodeBlock code={code} language={lang} />
    },
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800"
        loading="lazy"
      />
    ),
    hr: () => (
      <hr className="my-8 border-0 border-t border-zinc-200 dark:border-zinc-800" />
    ),
    table: ({ children }) => (
      <CanvasBox>
        <table className="w-full text-sm">{children}</table>
      </CanvasBox>
    ),
    th: ({ children }) => (
      <th className="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 text-left font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-zinc-100 px-4 py-2.5 text-zinc-700 dark:border-zinc-800/50 dark:text-zinc-300">
        {children}
      </td>
    ),
    Collapsible,
    AVLTree,
    BalanceFactorDemo,
    CanvasBox,
    SkewedBST,
    ...components
  }
}
