import Link from "next/link";

export default function Header() {
    return (
        <div className="flex p-3 border-b border-black justify-end">
                <Link className="m-3" href="/planner">Planner</Link>
                <Link className="m-3" href="/recipes">Recipes</Link>
                <Link className="m-3" href="/shopping">Shopping</Link>
        </div>
    )
}