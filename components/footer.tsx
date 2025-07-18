const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="font-silkScreen mt-4 flex items-center p-4 text-xs text-zinc-500 dark:text-zinc-100">
      &copy; {year}
    </footer>
  )
}

export default Footer
