export default function RootLayout(props: {
  children: React.ReactNode;
  messages: React.ReactNode;
  groups: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[250px_1fr]">
      {props.groups}
      <main className="flex flex-col">
        {props.children}
        {props.messages}
      </main>
    </div>
  );
}
