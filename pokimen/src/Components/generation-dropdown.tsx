interface GenerationOption {
  value: string;
  label: string;
}

interface GenerationDropDownProps {
  generations: GenerationOption[];
  selectedGeneration: string;
  onGenerationChange: (value: string) => void;
}

const GenerationDropDown: React.FC<GenerationDropDownProps> = ({
  generations,
  selectedGeneration,
  onGenerationChange,
}) => {
  const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onGenerationChange(event.target.value);
  };

  return (
    <select value={selectedGeneration} onChange={handleGenerationChange} className="p-1 border rounded text-black my-4">
      {generations.map((gen) => (
        <option key={gen.value} value={gen.value}>
          {gen.label}
        </option>
      ))}
    </select>
  );
};

export default GenerationDropDown;
