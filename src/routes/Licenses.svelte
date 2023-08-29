<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let parent;
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
	<header class="text-2xl font-bold">Licenses for software used by open-ticket</header>
	<Accordion autocollapse>
		<AccordionItem>
			<svelte:fragment slot="summary">SvelteKit</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					Copyright (c) 2020 [these people](https://github.com/sveltejs/kit/graphs/contributors)<br
					/>
					Permission is hereby granted, free of charge, to any person obtaining a copy of this software
					and associated documentation files (the "Software"), to deal in the Software without restriction,
					including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
					and/or sell copies of the Software, and to permit persons to whom the Software is furnished
					to do so, subject to the following conditions: <br />The above copyright notice and this
					permission notice shall be included in all copies or substantial portions of the Software.
					<br />THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
					INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
					PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
					FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
					OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
					DEALINGS IN THE SOFTWARE.
				</p>
				<a href="https://github.com/sveltejs/kit/blob/master/LICENSE" class="mt-2 underline"
					>Link to license</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">Skeleton UI</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					MIT License Copyright (c) 2023 Skeleton Labs, LLC Permission is hereby granted, free of
					charge, to any person obtaining a copy of this software and associated documentation files
					(the "Software"), to deal in the Software without restriction, including without
					limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
					sell copies of the Software, and to permit persons to whom the Software is furnished to do
					so, subject to the following conditions: The above copyright notice and this permission
					notice shall be included in all copies or substantial portions of the Software. THE
					SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
					BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
					NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
					CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
					ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
					THE SOFTWARE.
				</p>
				<a
					href="https://github.com/skeletonlabs/skeleton/blob/master/LICENSE"
					class="mt-2 underline">Link to license</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">PocketBase</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					The MIT License (MIT) Copyright (c) 2022 - present, Gani Georgiev Permission is hereby
					granted, free of charge, to any person obtaining a copy of this software and associated
					documentation files (the "Software"), to deal in the Software without restriction,
					including without limitation the rights to use, copy, modify, merge, publish, distribute,
					sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
					is furnished to do so, subject to the following conditions: The above copyright notice and
					this permission notice shall be included in all copies or substantial portions of the
					Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
					IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
					PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
					BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
					TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
					OTHER DEALINGS IN THE SOFTWARE.
				</p>
				<a
					href="https://github.com/pocketbase/pocketbase/blob/master/LICENSE.md"
					class="mt-2 underline">Link to license</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">date-fns</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					MIT License Copyright (c) 2021 Sasha Koss and Lesha Koss
					<a class="underline" href="https://kossnocorp.mit-license.org"
						>https://kossnocorp.mit-license.org</a
					> Permission is hereby granted, free of charge, to any person obtaining a copy of this software
					and associated documentation files (the "Software"), to deal in the Software without restriction,
					including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
					and/or sell copies of the Software, and to permit persons to whom the Software is furnished
					to do so, subject to the following conditions: The above copyright notice and this permission
					notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE
					IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
					TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
					IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
					LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
					CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
				</p>
				<a href="https://github.com/date-fns/date-fns/blob/main/LICENSE.md" class="mt-2 underline"
					>Link to license</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">lodash</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					The MIT License Copyright JS Foundation and other contributors <a
						class="underline"
						href="https://js.foundation">https://js.foundation</a
					>

					Based on Underscore.js, copyright Jeremy Ashkenas, DocumentCloud and Investigative
					Reporters & Editors
					<a class="underline" href="http://underscorejs.org">http://underscorejs.org</a>

					This software consists of voluntary contributions made by many individuals. For exact
					contribution history, see the revision history available at
					https://github.com/lodash/lodash The following license applies to all parts of this
					software except as documented below: ==== Permission is hereby granted, free of charge, to
					any person obtaining a copy of this software and associated documentation files (the
					"Software"), to deal in the Software without restriction, including without limitation the
					rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
					the Software, and to permit persons to whom the Software is furnished to do so, subject to
					the following conditions: The above copyright notice and this permission notice shall be
					included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED
					"AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
					THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
					IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
					OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
					OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. ====
					Copyright and related rights for sample code are waived via CC0. Sample code is defined as
					all source code displayed within the prose of the documentation. CC0:
					http://creativecommons.org/publicdomain/zero/1.0/ ==== Files located in the node_modules
					and vendor directories are externally maintained libraries used by this software which
					have their own licenses; we recommend you read them, as their terms may differ from the
					terms above.
				</p>
				<a href="https://github.com/lodash/lodash/blob/master/LICENSE" class="mt-2 underline"
					>Link to license</a
				>
			</svelte:fragment>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="summary">lucide</svelte:fragment>
			<svelte:fragment slot="content">
				<p>
					ISC License Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part
					of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
					Permission to use, copy, modify, and/or distribute this software for any purpose with or
					without fee is hereby granted, provided that the above copyright notice and this
					permission notice appear in all copies. THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR
					DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
					MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL,
					DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
					OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
					ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
				</p>
				<a href="https://github.com/lucide-icons/lucide/blob/main/LICENSE" class="mt-2 underline"
					>Link to license</a
				>
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
	<footer class="modal-footer {parent.regionFooter}">
		<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
			>{parent.buttonTextCancel}</button
		>
	</footer>
</div>
