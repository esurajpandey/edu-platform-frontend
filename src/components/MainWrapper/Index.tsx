interface MainWrapperProps {
  tobBar?: boolean;
  pageTitle?: string;
  pageSubTitle?: string;
  actionSection?: React.ReactNode;
  children: React.ReactNode;
}
const MainWrapper = ({
  children,
  tobBar,
  pageTitle,
  pageSubTitle,
  actionSection,
}: MainWrapperProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      {tobBar && (
        <div className="flex items-center w-full h-12 px-3 border-b border-textMuted/50">
          <div className="overflow-y-auto flex-1 justify-start flex">
            <div className="flex flex-col">
              <div className="text-lg font-bold text-text font-sans">{pageTitle}</div>
              <div className="text-xs text-textMuted font-sans">{pageSubTitle}</div>
            </div>
          </div>
          {actionSection && (
            <div className="overflow-y-auto flex-1 justify-end flex">{actionSection}</div>
          )}
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
