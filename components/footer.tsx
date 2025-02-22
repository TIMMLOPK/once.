const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-4 flex items-center p-4 font-silkScreen text-xs text-zinc-500 dark:text-zinc-100">
      &copy; {year}
    </footer>
  );
};

export default Footer;
