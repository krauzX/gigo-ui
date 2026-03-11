<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		targetMs = 5000,
		goBackwards = true,
		stall = true,
		lieAboutCompletion = true,
		onComplete,
		class: className,
		...restProps
	}: {
		targetMs?: number;
		goBackwards?: boolean;
		stall?: boolean;
		lieAboutCompletion?: boolean;
		onComplete?: () => void;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let progress = $state(0);
	let displayProgress = $state(0);
	let statusText = $state('Loading...');
	let isComplete = $state(false);
	let fakePercent = $state(0);
	let barColor = $state('#e040fb');

	const STATUS_MESSAGES = [
		'Loading...', 'Almost there...', 'Just a moment...', 'Reticulating splines...',
		'Downloading more RAM...', 'Consulting the oracle...', 'Please wait...',
		'Undoing progress...', 'Going backwards...', 'Starting over...',
		'99% complete (lie)', 'Any second now...', 'Oops, lost some progress...',
		'Compiling excuses...', 'Buffering your patience...',
	];

	$effect(() => {
		let startTime = performance.now();
		let running = true;

		function tick() {
			if (!running) return;
			const elapsed = performance.now() - startTime;
			let rawProgress = Math.min((elapsed / targetMs) * 100, 100);

			if (goBackwards && rawProgress > 30 && rawProgress < 70 && Math.random() > 0.95) {
				startTime += 800;
				rawProgress = Math.max(0, rawProgress - 15);
			}

			if (stall && rawProgress > 50 && rawProgress < 80 && Math.random() > 0.9) {
				startTime += 500;
			}

			progress = rawProgress;
			displayProgress = Math.max(0, Math.min(100, rawProgress + (Math.random() - 0.5) * 8));

			if (lieAboutCompletion) {
				if (rawProgress < 20) fakePercent = rawProgress * 3;
				else if (rawProgress < 80) fakePercent = 60 + Math.random() * 35;
				else fakePercent = 95 + Math.random() * 4.9;
			} else {
				fakePercent = displayProgress;
			}

			const msgIdx = Math.floor((rawProgress / 100) * STATUS_MESSAGES.length);
			statusText = STATUS_MESSAGES[Math.min(msgIdx, STATUS_MESSAGES.length - 1)];

			if (rawProgress < 30) barColor = '#e040fb';
			else if (rawProgress < 60) barColor = '#18ffff';
			else if (rawProgress < 90) barColor = '#76ff03';
			else barColor = '#ff1744';

			if (rawProgress >= 100 && !isComplete) {
				isComplete = true;
				statusText = lieAboutCompletion ? 'Done! (was it though?)' : 'Complete!';
				onComplete?.();
			}

			if (!isComplete) requestAnimationFrame(tick);
		}

		requestAnimationFrame(tick);
		return () => { running = false; };
	});

	function restart() {
		progress = 0;
		displayProgress = 0;
		fakePercent = 0;
		isComplete = false;
		statusText = 'Loading...';
	}
</script>

<div class={cn('space-y-3 max-w-md', className)} {...restProps}>
	<div class="flex items-center justify-between">
		<span class="text-xs font-mono text-(--muted-foreground)">{statusText}</span>
		<span class="text-xs font-mono font-bold" style:color={barColor}>
			{Math.round(fakePercent)}%
		</span>
	</div>

	<div class="relative h-4 w-full overflow-hidden rounded-full border border-(--border) bg-(--secondary)">
		<div
			class="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
			style:width="{Math.max(0, Math.min(100, displayProgress))}%"
			style:background="linear-gradient(90deg, {barColor}, {barColor}99)"
			style:box-shadow="0 0 12px {barColor}66"
		></div>
		{#if displayProgress > 10}
			<div
				class="absolute inset-y-0 left-0 rounded-full opacity-30"
				style:width="{Math.max(0, Math.min(100, displayProgress))}%"
				style:background="linear-gradient(90deg, transparent, white 50%, transparent)"
				style:animation="gigo-shimmer 1.5s linear infinite"
			></div>
		{/if}
	</div>

	<div class="flex items-center justify-between text-[10px] font-mono text-(--muted-foreground)">
		<span>Real: {Math.round(progress)}%</span>
		<span>Shown: {Math.round(displayProgress)}%</span>
		<span>Claimed: {Math.round(fakePercent)}%</span>
	</div>

	{#if isComplete}
		<button
			class="w-full rounded-xl border border-gigo-magenta/30 bg-gigo-magenta/10 px-4 py-2 text-sm font-mono text-gigo-magenta hover:bg-gigo-magenta/20 transition-colors cursor-pointer"
			onclick={restart}
		>
			Restart the suffering
		</button>
	{/if}

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Three different progress values. None of them are honest.
	</p>
</div>
