"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/public/icon_TRANSPARENT.png";
import { ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TeaserPage() {
	const [consoleText, setConsoleText] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		const messages = [
			"[winterhost]: Initializing system...",
			"[winterhost]: Loading core modules...",
			"[winterhost]: Restructuring infrastructure...",
			"[winterhost]: Optimizing resource allocation...",
			"[winterhost]: Enhancing dashboard...",
			"[winterhost]: Fixing last bugs...",
			"[winterhost]: Preparing for deployment...",
		];

		let currentMessageIndex = 0;
		let currentCharIndex = 0;
		const timeouts: NodeJS.Timeout[] = [];

		const typeNextChar = () => {
			if (currentMessageIndex < messages.length) {
				if (!messages[currentMessageIndex]) return;
				const currentMessage = messages[currentMessageIndex];

				if (currentCharIndex < currentMessage.length) {
					const nextChar = currentMessage[currentCharIndex];
					if (nextChar !== undefined) {
						setConsoleText((prev) => prev + nextChar);
					}
					currentCharIndex++;
					timeouts.push(setTimeout(typeNextChar, 50 + Math.random() * 50));
				} else {
					setConsoleText((prev) => prev + "\n");
					currentMessageIndex++;
					currentCharIndex = 0;
					timeouts.push(setTimeout(typeNextChar, 1000));
				}
			}
		};

		timeouts.push(setTimeout(typeNextChar, 1000));

		return () => {
			timeouts.forEach(clearTimeout);
		};
	}, []);

	return (
		<div className="flex min-h-screen flex-col bg-black text-white">
			<header className="container flex h-16 items-center justify-between py-4">
				<div className="flex items-center gap-2">
					<Image
						src={Logo}
						alt="Winterhost Logo"
						width={20}
						height={20}
						className="text-blue-500"
					/>
					<span className="text-lg font-medium">Winterhost</span>
				</div>
				<div className="flex items-center">
					<div className="flex items-center rounded-full bg-zinc-900 px-3 py-1">
						<span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
						<span className="text-xs text-zinc-400">
							Development in Progress
						</span>
					</div>
				</div>
			</header>

			<main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
				<div className="w-full max-w-2xl space-y-10">
					<div className="space-y-4 text-center">
						<h1 className="text-4xl font-light tracking-tight sm:text-5xl">
							A New <span className="text-blue-500">Winterhost</span> Experience
						</h1>
						<p className="mx-auto max-w-md text-sm text-zinc-400">
							We've completely rebuilt our infrastructure from the ground up.
							More powerful. More reliable. Coming soon.
						</p>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Terminal className="h-4 w-4 text-blue-500" />
							<span className="text-xs font-medium uppercase text-zinc-500">
								System Status
							</span>
						</div>
						<div className="rounded-md border border-zinc-800 bg-zinc-900/50 p-4">
							<pre className="font-mono text-xs text-zinc-400">
								<code>{consoleText || "[winterhost]: Connecting..."}</code>
							</pre>
						</div>
					</div>

					<div className="mx-auto max-w-md space-y-2">
						<p className="text-center text-xs text-zinc-500">
							Get notified when we launch
						</p>
						<div className="flex gap-2">
							<Input
								type="email"
								placeholder="Enter your email"
								className="border-zinc-800 bg-zinc-900/50 text-sm"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Button
								variant="outline"
								className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
							>
								Notify Me
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</main>

			<footer className="container border-t border-zinc-900 py-4">
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-center">
					<p className="text-xs text-zinc-600">
						&copy; {new Date().getFullYear()} Winterhost. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<a
							href="https://discord.gg/XkekC3qJjT"
							target="_blank"
							className="text-xs text-zinc-600 hover:text-zinc-400"
						>
							Discord
						</a>
						<a
							href="https://x.com/winterhostde"
							target="_blank"
							className="text-xs text-zinc-600 hover:text-zinc-400"
						>
							X
						</a>
						<a
							href="https://github.com/winterhost"
							target="_blank"
							className="text-xs text-zinc-600 hover:text-zinc-400"
						>
							GitHub
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
