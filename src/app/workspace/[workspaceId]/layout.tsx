function WorkSpaceLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="h-screen overflow-y-auto bg-red-500">
      <h1>WorkSpaceLayout</h1>

      {children}
    </div>
  );
}

export default WorkSpaceLayout;
