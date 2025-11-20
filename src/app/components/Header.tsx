import Link from "next/link";

interface HeaderProps {
  theme?: "dark" | "light";
}

export function Header({ theme = "light" }: HeaderProps) {
  const textColor = theme === "dark" ? "text-white" : "text-black";
  
  return (
    <header className="px-6 md:px-12 py-6 relative z-10">
      <Link href="/" className="flex items-center gap-2 w-fit">
        <span className="text-2xl">🦉</span>
        <h1 className={`text-xl font-bold ${textColor} transition-colors duration-1000`}>
          Buho
        </h1>
      </Link>
    </header>
  );
}

