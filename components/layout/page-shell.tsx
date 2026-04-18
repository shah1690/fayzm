type PageShellProps = Readonly<{
  title: string;
}>;

export function PageShell({ title }: PageShellProps) {
  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
}
