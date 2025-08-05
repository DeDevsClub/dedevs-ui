import type { AIResponseProps } from './response';

export function AIResponse({
  className,
  options,
  children,
  ...props
}: AIResponseProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}