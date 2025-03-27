function PokemonDetailsLoadingSkeleton() {
  return (
    <>
      {/* Back Button Skeleton */}
      <div className="flex items-center">
        <div className="h-10 w-64 bg-slate-700 rounded-lg animate-pulse"></div>
      </div>

      {/* Floating Nav Skeleton */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <div className="h-10 w-10 bg-slate-700 rounded-full animate-pulse"></div>
      </div>

      {/* Pokemon Header Skeleton */}
      <div className="grid w-full">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg mb-8 p-6 border border-blue-500/20 rounded-lg w-full">
          <div className="flex items-center justify-center">
            <div className="h-8 w-48 bg-slate-700 rounded-lg animate-pulse mb-4"></div>
          </div>

          {/* Forms Skeleton */}
          <div className="flex justify-evenly mb-4">
            <div className="h-8 w-full mx-1 bg-slate-700 rounded-lg animate-pulse"></div>
            <div className="h-8 w-full mx-1 bg-slate-700 rounded-lg animate-pulse"></div>
          </div>

          {/* BasicInfo Skeleton */}
          <div className="relative border-2 p-6 rounded-lg border-gray-700">
            {/* Pokemon Header Skeleton */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <div className="h-8 w-48 bg-slate-700 rounded-lg animate-pulse mb-2"></div>
                <div className="h-6 w-32 bg-slate-700 rounded-lg animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-slate-700 rounded-lg animate-pulse"></div>
                <div className="h-8 w-20 bg-slate-700 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <div className="grid gap-4">
              {/* Images and Basic Info Skeleton */}
              <section>
                <div className="flex gap-2">
                  {/* Pokemon Images Skeleton */}
                  <div className="h-48 w-48 bg-slate-700 rounded-lg animate-pulse"></div>

                  {/* Pokemon Basic Info Skeleton */}
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="h-6 w-24 bg-slate-700 rounded-lg animate-pulse mb-1"></div>
                        <div className="h-6 w-32 bg-slate-700 rounded-lg animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Description Skeleton */}
              <div className="h-24 w-full bg-slate-700 rounded-lg animate-pulse"></div>

              {/* Training Skeleton */}
              <div className="p-4 rounded-lg bg-black/20">
                <div className="h-8 w-32 bg-slate-700 rounded-lg animate-pulse mb-2"></div>
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-6 w-24 bg-slate-700 rounded-lg animate-pulse"></div>
                      <div className="h-6 w-16 bg-slate-700 rounded-lg animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breeding Skeleton */}
              <div className="p-4 rounded-lg bg-black/20">
                <div className="h-8 w-32 bg-slate-700 rounded-lg animate-pulse mb-2"></div>
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-6 w-24 bg-slate-700 rounded-lg animate-pulse"></div>
                      <div className="h-6 w-16 bg-slate-700 rounded-lg animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Base Stats Skeleton */}
              <div className="p-4 rounded-lg bg-black/20">
                <div className="h-8 w-32 bg-slate-700 rounded-lg animate-pulse mb-2"></div>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <div className="h-6 w-24 bg-slate-700 rounded-lg animate-pulse"></div>
                        <div className="h-6 w-12 bg-slate-700 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="w-full h-2.5 bg-black/20">
                        <div
                          className="bg-slate-700 h-2.5 animate-pulse"
                          style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abilities Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg mb-8 p-6 border border-blue-500/20 rounded-lg w-full">
        <div className="flex items-center justify-center">
          <div className="h-8 w-48 bg-slate-700 rounded-lg animate-pulse mb-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-black/20">
              <div className="h-6 w-32 bg-slate-700 rounded-lg animate-pulse mb-2"></div>
              <div className="h-24 w-full bg-slate-700 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Relations Skeleton */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg mb-8 p-6 border border-blue-500/20 rounded-lg w-full">
        <div className="flex items-center justify-center">
          <div className="h-8 w-48 bg-slate-700 rounded-lg animate-pulse mb-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-black/20">
            <div className="h-6 w-32 bg-slate-700 rounded-lg animate-pulse mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-slate-700 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-black/20">
            <div className="h-6 w-32 bg-slate-700 rounded-lg animate-pulse mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-slate-700 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Moves Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg mb-8 p-6 border border-blue-500/20 rounded-lg w-full">
        <div className="flex items-center justify-center">
          <div className="h-8 w-48 bg-slate-700 rounded-lg animate-pulse mb-4"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="p-2">
                    <div className="h-6 w-full bg-slate-700 rounded-lg animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="p-2">
                      <div className="h-6 w-full bg-slate-700 rounded-lg animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Egg Groups Section Skeleton */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg mb-8 p-6 border border-blue-500/20 rounded-lg w-full">
        <div className="flex items-center justify-center">
          <div className="h-8 w-48 bg-slate-700 rounded-lg animate-pulse mb-4"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-12 w-32 bg-slate-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PokemonDetailsLoadingSkeleton;
