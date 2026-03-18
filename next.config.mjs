import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com', pathname: '/vi/**' }
    ]
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm]
  }
})

export default withMDX(nextConfig)
