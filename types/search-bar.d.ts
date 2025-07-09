export interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}
