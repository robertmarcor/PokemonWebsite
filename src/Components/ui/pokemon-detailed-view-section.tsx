interface DetailedViewSectionProps {
  id?: string;
  heading: string;
  img?: string;
  children: React.ReactNode;
}

const DetailedViewSection: React.FC<DetailedViewSectionProps> = ({
  id,
  heading,
  img,
  children,
}) => {
  return (
    <div
      id={id}
      className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg mb-8 p-6 border border-blue-500/20 rounded-lg w-full">
      <div className="flex items-center justify-center">
        {img && <img src={img} alt={img} />}
        <h2 className="bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 font-bold text-transparent text-2xl uppercase">
          {heading}
        </h2>
        {img && <img src={img} alt={img} />}
      </div>
      {children}
    </div>
  );
};
export default DetailedViewSection;
