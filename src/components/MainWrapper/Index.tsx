interface MainWrapperProps {
  tobBar?: boolean;
  headerSection?: React.ReactNode | string;
  actionSection?: React.ReactNode;
  children: React.ReactNode;
}
const MainWrapper = ({ children, tobBar, headerSection, actionSection }: MainWrapperProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      {tobBar && (
        <div className="flex items-center w-full h-12 px-3 border-b border-textMuted">
          <div className="overflow-y-auto flex-1 justify-start flex">{headerSection}</div>
          <div className="overflow-y-auto flex-1 justify-end flex">{actionSection}</div>
        </div>
      )}
      <div
        className="flex flex-col overflow-y-auto p-1"
        style={{ height: `calc(100dvh - ${tobBar ? 120 : 30}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default MainWrapper;
