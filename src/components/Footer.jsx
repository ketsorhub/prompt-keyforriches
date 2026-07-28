export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>
        &copy; {year} Key For Riches &mdash; Prompt Maker is a free tool, no signup required.{' '}
        <a href="https://tools.keyforriches.com/">Explore more free tools</a>
      </p>
    </footer>
  );
}
