const AUTHOR = [
  {
    email: "timmy.12345wer12@gmail.com",
    name: "Timmy",
    icon: "/icon.webp",
  },
  {
    email: "soraruuuuuuuuuu@gmail.com",
    name: "Musicmatics",
    icon: "/shop/icon.webp",
  }
];

function isAuthor(email: string): boolean {
  return AUTHOR.some((author) => author.email === email);
}

function getAuthorName(email: string): string {
  const author = AUTHOR.find((author) => author.email === email);
  return author ? author.name : "";
}

function getAuthorIcon(email: string): string {
  const author = AUTHOR.find((author) => author.email === email);
  return author ? author.icon : "";
}

function getAuthorIconByName(name: string): string {
  const author = AUTHOR.find((author) => author.name === name);
  return author ? author.icon : "";
}

export { AUTHOR, isAuthor, getAuthorName, getAuthorIcon, getAuthorIconByName };
