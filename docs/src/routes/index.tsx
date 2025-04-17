import { buttonVariants } from "@/components/ui/button";
import { CodeIcon, CopyIcon } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

export default function Home() {
	const codeExample = `import { auctions, profiles, collections } from "skyblockts";

// Get all the auctions from the auction house
const allAuctions != await auctions.all();

// Filter auctions with various criteria
const filteredAuctions = await auctions.filter({
    itemName: "Hyperion",
    tier: "LEGENDARY",
    binOnly: true,
});

// Get a user's profiles by their UUID
const userProfiles = await profiles.get("playerUUID");

// Get all the collections within a category
const farmingCollections = await collections.get("farming");`;

	return (
		<div className="min-h-screen grid grid-cols-1 xl:grid-cols-2 justify-items-center p-3 place-items-center justify-center">
			{/* Hero Section */}
			<div className="flex flex-col items-center gap-5 max-w-3xl text-center xl:mt-16 mt-[20vh]">
				<h1 className="text-balance mb-4 text-center text-3xl/[1.4] font-bold sm:max-w-[24ch] md:text-4xl/[1.6] xl:text-5xl/[1.5]">
					The <span className="bg-blue-500/70 p-1 rounded-lg">TypeScript</span>{" "}
					Gateway to{" "}
					<span className="bg-yellow-500/70 p-1 rounded-lg">
						Hypixel Skyblock
					</span>
				</h1>
				<h2 className="max-w-md text-neutral-600 dark:text-slate-400">
					SkyblockTS Turns Complex API Calls into Simple TypeScript Functions
					with built-in caching.
				</h2>
				<div className="grid grid-cols-1 max-w-xs xl:max-w-xl xl:grid-cols-2 w-full gap-3">
					<a className={buttonVariants({ size: "lg" })} href="/docs">
						Get Started
					</a>
					<div className="font-code rounded-md p-2 bg-neutral-200 dark:bg-slate-800 flex items-center justify-between">
						<span>
							<CodeIcon className="size-5" />
						</span>
						<span className="mx-2">npm install skyblockts</span>
						<button
							onClick={() =>
								navigator.clipboard.writeText("npm install skyblockts")
							}
							className="cursor-pointer hover:scale-110 transition-all"
						>
							<CopyIcon className="size-5" />
						</button>
					</div>
				</div>
			</div>

			<div className="w-full max-w-xl mt-16 px-4">
				<div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700/30 dark:border-slate-700/30">
					<div className="dark:bg-slate-800 bg-neutral-800 text-white p-3 flex items-center">
						<div className="flex items-center space-x-1 mr-auto">
							<div className="bg-neutral-600/80 dark:bg-slate-600/80 text-white px-3 py-1 rounded-t-md font-medium text-sm flex items-center">
								<CodeIcon className="size-3.5 mr-1.5" />
								<span>example.ts</span>
							</div>
							<div className="text-neutral-400 px-3 py-1 text-sm hover:text-white transition-colors cursor-pointer">
								+
							</div>
						</div>

						<button
							onClick={() => navigator.clipboard.writeText(codeExample)}
							className="cursor-pointer hover:bg-white/10 p-1.5 rounded-md transition-all text-neutral-300 hover:text-white flex items-center gap-1 text-xs"
						>
							<CopyIcon className="size-4" />
							<span className="hidden sm:inline">Copy</span>
						</button>
					</div>

					<div className="text-neutral-100 overflow-x-auto text-sm p-1 bg-neutral-900 dark:bg-slate-900">
						<Highlight
							code={codeExample}
							language="typescript"
							theme={themes.vsDark}
						>
							{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre
									className={className}
									style={{
										...style,
										background: "transparent",
										padding: "1rem",
									}}
								>
									{tokens.map((line, i) => (
										<div
											key={i}
											{...getLineProps({ line, key: i })}
											className="line-number"
										>
											{line.map((token, key) => (
												<span key={key} {...getTokenProps({ token, key })} />
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
					</div>
				</div>
			</div>
		</div>
	);
}
