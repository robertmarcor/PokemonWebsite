import { routes } from "./data/routes";

type Props = { className?: string };
export default function Nav({ className }: Props) {
  return (
    <>
      <nav className={`${className}h-8 p-2 m-2 flex`}>
        <ul className="flex gap-4">
          {routes.map((route) => (
            <li key={route.name}>
              <a href={route.href}>{route.name.toUpperCase()}</a>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
    </>
  );
}
