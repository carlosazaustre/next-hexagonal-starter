import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

function SectionLinksList(): JSX.Element {
	return (
		<>
			<li>
				<Link className="btn btn-primary" href="/create">Create Post</Link>
			</li>
			<li>
				<Link href="/">Posts</Link>
			</li>
			<li>
				<Link href="/users">Users</Link>
			</li>
		</>
	);
}

interface NavBarProps {
  children: React.ReactNode;
}

export function NavBar({ children }: NavBarProps): JSX.Element {
	return (
		<div className={`${inter.className} drawer`}>
			{/* Header Part */}
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<div className="w-full navbar bg-primary">
					<div className="flex-none lg:hidden">
						<label htmlFor="burguerMenu" className="btn btn-square btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-6 h-6 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</label>
					</div>
					<div className="container mx-auto">
						<div className="navbar">
							<Link href="/" className="btn btn-ghost normal-case text-xl">
                Hexagonal Blog Example
							</Link>
						</div>
						<div className="flex-none hidden lg:block">
							<ul className="menu menu-horizontal">
								<SectionLinksList />
							</ul>
						</div>
					</div>
				</div>
				{children}
			</div>

			{/* Side Part */}
			<div className="drawer-side">
				<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 bg-base-100">
					<SectionLinksList />
				</ul>
			</div>
		</div>
	);
}
