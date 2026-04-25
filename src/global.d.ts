// CSS side-effect imports
declare module '*.css' {
  const content: Record<string, string> & { className?: string };
  export default content;
}
