'use client';

import Sidebar from './Sidebar';

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/50"
      />

      {/* Sidebar */}
      <div className="relative z-10 h-full w-72 max-w-[85%]">
        <Sidebar
          mobile
          onClose={onClose}
        />
      </div>
    </div>
  );
}