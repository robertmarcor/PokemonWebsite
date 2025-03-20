import PageWrapper from "../../Components/page-wrapper";

interface PokedexPageSkeletonProps {
  itemCount?: number;
  showHeader?: boolean;
}

function PokedexPageSkeleton({ itemCount = 20 }: PokedexPageSkeletonProps) {
  // Create array of skeleton items
  const skeletonItems = Array.from({ length: itemCount }, (_, index) => {
    return (
      <article
        key={index}
        className="shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-slate-100 to-slate-300 dark:from-slate-400 dark:to-slate-800"
        aria-hidden="true">
        {/* Card Header with ID and Generation */}
        <div className="flex justify-between items-center bg-black/30 p-2">
          <div className="bg-white/20 px-2 py-1 rounded-full w-12 h-6"></div>
          <div className="bg-white/20 px-2 py-1 rounded-full w-16 h-6"></div>
        </div>

        {/* Pokemon Image Area */}
        <div className="relative flex justify-center p-4 h-32">
          <div className="absolute inset-0 bg-white/10 opacity-50 blur-xl m-auto rounded-full w-24 h-24"></div>
          <div className="z-10 h-full w-24 bg-white/20 rounded-full"></div>
        </div>

        {/* Pokemon Name */}
        <div className="mb-2 mx-auto w-3/4 h-7 bg-white/20 rounded-md"></div>

        {/* Types */}
        <div className="flex justify-center gap-2 bg-black/20 p-3">
          <div className="bg-white/20 rounded-full h-6 w-16"></div>
          <div className="bg-white/20 rounded-full h-6 w-16"></div>
        </div>
      </article>
    );
  });

  return (
    <section className="w-full" aria-label="Loading Pokémon content" role="status">
      <PageWrapper>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {skeletonItems}
        </div>
      </PageWrapper>
    </section>
  );
}

export default PokedexPageSkeleton;
