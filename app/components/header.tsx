import Link from "next/link";

export default function Header() {
    return (
        <div className="flex flex-col">
                <Link href="/planner">Planner</Link>
                <Link href="/recipes">Recipes</Link>
                <Link href="/shopping">Shopping</Link>
        </div>
    )
}