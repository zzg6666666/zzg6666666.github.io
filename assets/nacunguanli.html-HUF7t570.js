import{_ as n,o as s,c as a,a as e}from"./app-MpY3xo6F.js";const t={},p=e(`<p>在free RTOS中，提供了<code>vPortFree()</code>和<code>pvPortMalloc()</code>进行内管的管理，而在C标准库中，也提供了<code>malloc()</code>和<code>free()</code>进行内存管理，但是标准库并没有考虑到嵌入式系统中所存在的资源紧缺的情况。free RTOS提供了多种<code>vPortFree()</code>和<code>pvPortMalloc()</code>，对应不同的情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>heap_1.c    分配简单，不能释放内存
heap_2.c    不能合并内存碎片 
heap_3.c    使用标准库进行内存管理
heap_4.c    可以合并内存碎片
heap_5.c    可以管理非连续的内存的heap_4.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="heap-1-c" tabindex="-1"><a class="header-anchor" href="#heap-1-c" aria-hidden="true">#</a> heap_1.c</h2><p>heap_1.c是最简单的内存管理方法，仅仅涉及内存分配，不能释放内存，只能管理一个静态的堆<code>ucHeap</code>，</p><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p><strong>configSUPPORT_DYNAMIC_ALLOCATION</strong>:是否允许动态内存分配，在所有的heap_x.c中，都应该为1</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configSUPPORT_DYNAMIC_ALLOCATION <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">error</span> <span class="token expression">This file must not be used <span class="token keyword">if</span> configSUPPORT_DYNAMIC_ALLOCATION is <span class="token number">0</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>portBYTE_ALIGNMENT<span class="token operator">:</span> 		内存对齐的值，取决于平台架构

configTOTAL_HEAP_SIZE<span class="token operator">:</span>		堆的总大小，可用于动态分配内存的总内存量

configADJUSTED_HEAP_SIZE<span class="token operator">:</span>	调整后的堆的大小，<span class="token punctuation">(</span>可以确保堆的开始地址满足对齐要求<span class="token operator">?</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* A few bytes might be lost to byte aligning the heap start address. */</span>
<span class="token comment">//不是很清楚为什么要这样，释放出portBYTE_ALIGNMENT个字节的空间</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">configADJUSTED_HEAP_SIZE</span>	<span class="token expression"><span class="token punctuation">(</span> configTOTAL_HEAP_SIZE <span class="token operator">-</span> portBYTE_ALIGNMENT <span class="token punctuation">)</span></span></span>

<span class="token comment">/* Allocate the memory for the heap. */</span>
<span class="token comment">/* Allocate the memory for the heap. */</span>
<span class="token comment">//是否由应用分配内存</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configAPPLICATION_ALLOCATED_HEAP <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token comment">/* The application writer has already defined the array used for the RTOS
	heap - probably so it can be placed in a special segment or address. */</span>
	<span class="token comment">//用户自己定义的静态内存</span>
	<span class="token keyword">extern</span> <span class="token class-name">uint8_t</span> ucHeap<span class="token punctuation">[</span> configTOTAL_HEAP_SIZE <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
	<span class="token comment">//系统默认定义的内存</span>
	<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> ucHeap<span class="token punctuation">[</span> configTOTAL_HEAP_SIZE <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* configAPPLICATION_ALLOCATED_HEAP */</span></span>

<span class="token comment">/* Index into the ucHeap array. */</span>
<span class="token keyword">static</span> <span class="token class-name">size_t</span> xNextFreeByte <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pvportmalloc" tabindex="-1"><a class="header-anchor" href="#pvportmalloc" aria-hidden="true">#</a> pvPortMalloc()</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">pvPortMalloc</span><span class="token punctuation">(</span> <span class="token class-name">size_t</span> xWantedSize <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">void</span> <span class="token operator">*</span>pvReturn <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span>pucAlignedHeap <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token comment">/* Ensure that blocks are always aligned to the required number of bytes. */</span>
	<span class="token comment">//如果字节对齐的单位不是1，进行字节对齐</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">!=</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token punctuation">{</span>
		<span class="token comment">//对数据进行对齐的操作，根据\`portBYTE_ALIGNMENT\`的值，\`portBYTE_ALIGNMENT_MASK\`也有不同的值。</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span><span class="token comment">/*相比xWantedSize % portBYTE_ALIGNMENT_MASK更快*/</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/*
			 Byte alignment required. 
			 将xWantedSize按照portBYTE_ALIGNMENT进行强制对齐，让xWantedSize是portBYTE_ALIGNMENT的倍数
			 */</span>
			xWantedSize <span class="token operator">+=</span> <span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token comment">//挂起所有任务</span>
	<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">{</span>	<span class="token comment">//初始化静态变量</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pucAlignedHeap <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>	
			<span class="token comment">/*
			&amp;ucHeap[ portBYTE_ALIGNMENT ]，获取堆数组ucHeap[ portBYTE_ALIGNMENT ]第portBYTE_ALIGNMENT个字节的地址，
			跳过一定数量的字节，使得堆的地址满足对齐要求
			~( ( portPOINTER_SIZE_TYPE ) portBYTE_ALIGNMENT_MASK ):创造一个掩码，用于清除指针的低位
			这行代码，让pucAlignedHeap的地址在ucHeap[0] 和 cHeap[ portBYTE_ALIGNMENT ]之间，同时实现了字节对齐，很精妙的代码
			*/</span>
			<span class="token comment">/* Ensure the heap starts on a correctly aligned boundary. 在分配pucAlignedHeap的地址时，确保堆的开始地址满足对齐要求*/</span>
			pucAlignedHeap <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> portPOINTER_SIZE_TYPE <span class="token punctuation">)</span> <span class="token operator">&amp;</span>ucHeap<span class="token punctuation">[</span> portBYTE_ALIGNMENT <span class="token punctuation">]</span> <span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span> <span class="token operator">~</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> portPOINTER_SIZE_TYPE <span class="token punctuation">)</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">/* Check there is enough room left for the allocation. */</span>
		<span class="token comment">/*检查空余内存和需要的内存大小没有超过可使用的内存空间*/</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> xNextFreeByte <span class="token operator">+</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&lt;</span> configADJUSTED_HEAP_SIZE <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
		<span class="token comment">/* Check for overflow.检查有没有溢出，剩余的内存和需要的内存长度大于size_t的长度将会导致溢出 */</span>
			<span class="token punctuation">(</span> <span class="token punctuation">(</span> xNextFreeByte <span class="token operator">+</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&gt;</span> xNextFreeByte <span class="token punctuation">)</span>	<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Return the next free byte then increment the index past this
			block. */</span>
			<span class="token comment">/*此次分配的内存地址*/</span>
			pvReturn <span class="token operator">=</span> pucAlignedHeap <span class="token operator">+</span> xNextFreeByte<span class="token punctuation">;</span>
			<span class="token comment">/*xNextFreeByte增加此次分配的内存空间*/</span>
			xNextFreeByte <span class="token operator">+=</span> xWantedSize<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">//do nothing</span>
		<span class="token function">traceMALLOC</span><span class="token punctuation">(</span> pvReturn<span class="token punctuation">,</span> xWantedSize <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">/*恢复任务*/</span>
	<span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span> <span class="token function">xTaskResumeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//分配失败的处理</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configUSE_MALLOC_FAILED_HOOK <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pvReturn <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">vApplicationMallocFailedHook</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">vApplicationMallocFailedHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token keyword">return</span> pvReturn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源代码" tabindex="-1"><a class="header-anchor" href="#源代码" aria-hidden="true">#</a> 源代码</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>

<span class="token comment">/* Defining MPU_WRAPPERS_INCLUDED_FROM_API_FILE prevents task.h from redefining
all the API functions to use the MPU wrappers.  That should only be done when
task.h is included from an application file. */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MPU_WRAPPERS_INCLUDED_FROM_API_FILE</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;FreeRTOS.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;task.h&quot;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">undef</span> <span class="token expression">MPU_WRAPPERS_INCLUDED_FROM_API_FILE</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configSUPPORT_DYNAMIC_ALLOCATION <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">error</span> <span class="token expression">This file must not be used <span class="token keyword">if</span> configSUPPORT_DYNAMIC_ALLOCATION is <span class="token number">0</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token comment">/* A few bytes might be lost to byte aligning the heap start address. */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">configADJUSTED_HEAP_SIZE</span>	<span class="token expression"><span class="token punctuation">(</span> configTOTAL_HEAP_SIZE <span class="token operator">-</span> portBYTE_ALIGNMENT <span class="token punctuation">)</span></span></span>

<span class="token comment">/* Allocate the memory for the heap. */</span>
<span class="token comment">/* Allocate the memory for the heap. */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configAPPLICATION_ALLOCATED_HEAP <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token comment">/* The application writer has already defined the array used for the RTOS
	heap - probably so it can be placed in a special segment or address. */</span>
	<span class="token keyword">extern</span> <span class="token class-name">uint8_t</span> ucHeap<span class="token punctuation">[</span> configTOTAL_HEAP_SIZE <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
	<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> ucHeap<span class="token punctuation">[</span> configTOTAL_HEAP_SIZE <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* configAPPLICATION_ALLOCATED_HEAP */</span></span>

<span class="token comment">/* Index into the ucHeap array. */</span>
<span class="token keyword">static</span> <span class="token class-name">size_t</span> xNextFreeByte <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">/*-----------------------------------------------------------*/</span>

<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">pvPortMalloc</span><span class="token punctuation">(</span> <span class="token class-name">size_t</span> xWantedSize <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">void</span> <span class="token operator">*</span>pvReturn <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span>pucAlignedHeap <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token comment">/* Ensure that blocks are always aligned to the required number of bytes. */</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">!=</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Byte alignment required. */</span>
			xWantedSize <span class="token operator">+=</span> <span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pucAlignedHeap <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Ensure the heap starts on a correctly aligned boundary. */</span>
			pucAlignedHeap <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> portPOINTER_SIZE_TYPE <span class="token punctuation">)</span> <span class="token operator">&amp;</span>ucHeap<span class="token punctuation">[</span> portBYTE_ALIGNMENT <span class="token punctuation">]</span> <span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span> <span class="token operator">~</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> portPOINTER_SIZE_TYPE <span class="token punctuation">)</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">/* Check there is enough room left for the allocation. */</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> xNextFreeByte <span class="token operator">+</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&lt;</span> configADJUSTED_HEAP_SIZE <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
			<span class="token punctuation">(</span> <span class="token punctuation">(</span> xNextFreeByte <span class="token operator">+</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&gt;</span> xNextFreeByte <span class="token punctuation">)</span>	<span class="token punctuation">)</span><span class="token comment">/* Check for overflow. */</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Return the next free byte then increment the index past this
			block. */</span>
			pvReturn <span class="token operator">=</span> pucAlignedHeap <span class="token operator">+</span> xNextFreeByte<span class="token punctuation">;</span>
			xNextFreeByte <span class="token operator">+=</span> xWantedSize<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		
		<span class="token function">traceMALLOC</span><span class="token punctuation">(</span> pvReturn<span class="token punctuation">,</span> xWantedSize <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span> <span class="token function">xTaskResumeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configUSE_MALLOC_FAILED_HOOK <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pvReturn <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">vApplicationMallocFailedHook</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">vApplicationMallocFailedHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token keyword">return</span> pvReturn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*-----------------------------------------------------------*/</span>

<span class="token keyword">void</span> <span class="token function">vPortFree</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span>pv <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">/* Memory cannot be freed using this scheme.  See heap_2.c, heap_3.c and
	heap_4.c for alternative implementations, and the memory management pages of
	http://www.FreeRTOS.org for more information. */</span>
	<span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span> pv<span class="token punctuation">;</span>

	<span class="token comment">/* Force an assert as it is invalid to call this function. */</span>
	<span class="token function">configASSERT</span><span class="token punctuation">(</span> pv <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*-----------------------------------------------------------*/</span>

<span class="token keyword">void</span> <span class="token function">vPortInitialiseBlocks</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">/* Only required when static memory is not cleared. */</span>
	xNextFreeByte <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*-----------------------------------------------------------*/</span>

<span class="token class-name">size_t</span> <span class="token function">xPortGetFreeHeapSize</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span> configADJUSTED_HEAP_SIZE <span class="token operator">-</span> xNextFreeByte <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),o=[p];function c(i,l){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","nacunguanli.html.vue"]]);export{u as default};
