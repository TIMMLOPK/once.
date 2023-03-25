const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="mt-4 flex items-center justify-center p-4 text-center text-sm text-zinc-400">
      <span>© All rights reserved {year}</span>
    </div>
  );
};

export default Footer;
