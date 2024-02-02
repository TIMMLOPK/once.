const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-4 flex items-center justify-center p-4 text-center text-sm text-zinc-500 dark:text-zinc-100">
      © All rights reserved {year}
    </footer>
  );
};

export default Footer;
