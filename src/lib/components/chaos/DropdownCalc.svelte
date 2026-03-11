<script lang="ts">
	import { cn } from '$lib/utils/cn.js';

	let {
		value = $bindable(''),
		class: className,
		...restProps
	}: {
		value?: string;
		class?: string;
		[key: string]: unknown;
	} = $props();

	let expression = $state<string[]>([]);
	let result = $state<string>('');
	let showResult = $state(false);

	const DIGIT_OPTIONS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const OPERATOR_OPTIONS = ['+', '-', '×', '÷'];
	const DECIMAL_OPTIONS = ['.'];

	let digitDropdowns = $state<(string | null)[]>([null, null, null, null, null, null, null, null]);
	let operatorDropdown = $state<string | null>(null);

	function addDigit(index: number, val: string) {
		digitDropdowns = digitDropdowns.map((d, i) => i === index ? val : d);
		rebuildExpression();
	}

	function setOperator(val: string) {
		operatorDropdown = val;
		rebuildExpression();
	}

	function rebuildExpression() {
		const parts: string[] = [];
		// First number
		const num1Digits = digitDropdowns.slice(0, 4).filter(d => d !== null);
		if (num1Digits.length) parts.push(num1Digits.join(''));

		// Operator
		if (operatorDropdown) parts.push(operatorDropdown);

		// Second number
		const num2Digits = digitDropdowns.slice(4, 8).filter(d => d !== null);
		if (num2Digits.length) parts.push(num2Digits.join(''));

		expression = parts;
		value = parts.join(' ');
		showResult = false;
	}

	function calculate() {
		const num1Str = digitDropdowns.slice(0, 4).filter(d => d !== null).join('');
		const num2Str = digitDropdowns.slice(4, 8).filter(d => d !== null).join('');
		const num1 = parseFloat(num1Str);
		const num2 = parseFloat(num2Str);

		if (isNaN(num1) || isNaN(num2) || !operatorDropdown) {
			result = 'ERR: Incomplete';
			showResult = true;
			return;
		}

		let res: number;
		switch (operatorDropdown) {
			case '+': res = num1 + num2; break;
			case '-': res = num1 - num2; break;
			case '×': res = num1 * num2; break;
			case '÷': res = num2 === 0 ? NaN : num1 / num2; break;
			default: res = NaN;
		}

		result = isNaN(res) ? 'ERR: ÷ by 0' : String(Math.round(res * 10000) / 10000);
		showResult = true;
		value = `${num1} ${operatorDropdown} ${num2} = ${result}`;
	}

	function clearAll() {
		digitDropdowns = [null, null, null, null, null, null, null, null];
		operatorDropdown = null;
		expression = [];
		result = '';
		showResult = false;
		value = '';
	}
</script>

<div class={cn('space-y-4 max-w-lg', className)} {...restProps}>
	<!-- Display -->
	<div class="rounded-xl border border-(--border) bg-(--secondary) px-4 py-3">
		<div class="font-mono text-right text-sm text-(--muted-foreground) min-h-[1.2em]">
			{expression.join(' ') || '_ ? _ = ?'}
		</div>
		{#if showResult}
			<div class="font-mono text-right text-2xl font-bold mt-1"
				style:color={result.startsWith('ERR') ? '#ff1744' : '#76ff03'}>
				{result}
			</div>
		{/if}
	</div>

	<!-- Dropdown rows -->
	<div class="space-y-3">
		<!-- First number label -->
		<div class="text-[10px] font-mono text-(--muted-foreground) uppercase tracking-wider">First Number (select each digit)</div>

		<div class="flex gap-2 flex-wrap">
			{#each [0, 1, 2, 3] as i}
				<div class="flex flex-col items-center gap-1">
					<span class="text-[9px] font-mono text-(--muted-foreground)">
						{i === 0 ? 'Thou.' : i === 1 ? 'Hund.' : i === 2 ? 'Tens' : 'Ones'}
					</span>
					<select
						class="w-16 h-9 rounded-lg border border-(--border) bg-(--card) text-center font-mono text-sm
							text-(--foreground) cursor-pointer appearance-none
							focus:outline-none focus:border-gigo-magenta focus:ring-1 focus:ring-gigo-magenta/30"
						value={digitDropdowns[i] ?? ''}
						onchange={(e) => addDigit(i, (e.target as HTMLSelectElement).value)}
					>
						<option value="" disabled selected>—</option>
						{#each DIGIT_OPTIONS as d}
							<option value={d}>{d}</option>
						{/each}
					</select>
				</div>
			{/each}
		</div>

		<!-- Operator -->
		<div class="text-[10px] font-mono text-(--muted-foreground) uppercase tracking-wider">Operator</div>

		<select
			class="w-20 h-9 rounded-lg border border-(--border) bg-(--card) text-center font-mono text-lg
				text-gigo-magenta cursor-pointer appearance-none
				focus:outline-none focus:border-gigo-magenta focus:ring-1 focus:ring-gigo-magenta/30"
			value={operatorDropdown ?? ''}
			onchange={(e) => setOperator((e.target as HTMLSelectElement).value)}
		>
			<option value="" disabled selected>?</option>
			{#each OPERATOR_OPTIONS as op}
				<option value={op}>{op}</option>
			{/each}
		</select>

		<!-- Second number -->
		<div class="text-[10px] font-mono text-(--muted-foreground) uppercase tracking-wider">Second Number (select each digit)</div>

		<div class="flex gap-2 flex-wrap">
			{#each [4, 5, 6, 7] as i}
				<div class="flex flex-col items-center gap-1">
					<span class="text-[9px] font-mono text-(--muted-foreground)">
						{i === 4 ? 'Thou.' : i === 5 ? 'Hund.' : i === 6 ? 'Tens' : 'Ones'}
					</span>
					<select
						class="w-16 h-9 rounded-lg border border-(--border) bg-(--card) text-center font-mono text-sm
							text-(--foreground) cursor-pointer appearance-none
							focus:outline-none focus:border-gigo-magenta focus:ring-1 focus:ring-gigo-magenta/30"
						value={digitDropdowns[i] ?? ''}
						onchange={(e) => addDigit(i, (e.target as HTMLSelectElement).value)}
					>
						<option value="" disabled selected>—</option>
						{#each DIGIT_OPTIONS as d}
							<option value={d}>{d}</option>
						{/each}
					</select>
				</div>
			{/each}
		</div>
	</div>

	<!-- Action buttons -->
	<div class="flex gap-3">
		<button
			class="flex-1 px-4 py-2.5 rounded-xl font-mono text-sm font-bold
				bg-gigo-magenta/15 border border-gigo-magenta/50 text-gigo-magenta
				hover:bg-gigo-magenta/25 transition-colors cursor-pointer"
			onclick={calculate}
		>
			= Calculate
		</button>
		<button
			class="px-4 py-2.5 rounded-xl font-mono text-sm
				bg-(--secondary) border border-(--border) text-(--muted-foreground)
				hover:text-gigo-red hover:border-gigo-red/30 transition-colors cursor-pointer"
			onclick={clearAll}
		>
			Clear
		</button>
	</div>

	<p class="text-[10px] font-mono text-(--muted-foreground) text-center">
		Every. Single. Digit. Is. A. Dropdown. You're welcome.
	</p>
</div>
