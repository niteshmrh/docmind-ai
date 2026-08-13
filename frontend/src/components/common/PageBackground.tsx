export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top subtle glow */}
      <div
        className="
          absolute
          left-1/2
          top-[-240px]
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-foreground/[0.025]
          blur-3xl
        "
      />

      {/* Bottom subtle glow */}
      <div
        className="
          absolute
          bottom-[-250px]
          right-[-200px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-foreground/[0.02]
          blur-3xl
        "
      />

      {/* Very subtle grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.018]
          dark:opacity-[0.025]
        "
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
