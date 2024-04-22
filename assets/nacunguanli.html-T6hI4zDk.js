import{_ as n,o as s,c as a,a as t}from"./app-KxFgYdMb.js";const e={},p=t(`<p>在free RTOS中，提供了<code>vPortFree()</code>和<code>pvPortMalloc()</code>进行内管的管理，而在C标准库中，也提供了<code>malloc()</code>和<code>free()</code>进行内存管理，但是标准库并没有考虑到嵌入式系统中所存在的资源紧缺的情况。free RTOS提供了多种<code>vPortFree()</code>和<code>pvPortMalloc()</code>，对应不同的情况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>heap_1.c    分配简单，不能释放内存
heap_2.c    不能合并内存碎片 
heap_3.c    使用标准库进行内存管理
heap_4.c    可以合并内存碎片
heap_5.c    可以管理非连续的内存的heap_4.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="heap-1-c" tabindex="-1"><a class="header-anchor" href="#heap-1-c" aria-hidden="true">#</a> heap_1.c</h2><p>heap_1.c是最简单的内存管理方法，仅仅涉及内存分配，不能释放内存，管理一个静态的堆<code>ucHeap</code>，</p><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p><strong>configSUPPORT_DYNAMIC_ALLOCATION</strong>:是否允许动态内存分配，在所有的heap_x.c中，都应该为1</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configSUPPORT_DYNAMIC_ALLOCATION <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span></span></span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">error</span> <span class="token expression">This file must not be used <span class="token keyword">if</span> configSUPPORT_DYNAMIC_ALLOCATION is <span class="token number">0</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>portBYTE_ALIGNMENT<span class="token operator">:</span> 		内存对齐的值，取决于平台架构

configTOTAL_HEAP_SIZE<span class="token operator">:</span>		堆的总大小，可用于动态分配内存的总内存量

configADJUSTED_HEAP_SIZE<span class="token operator">:</span>	调整后的堆的大小，<span class="token punctuation">(</span>可以确保堆的开始地址满足对齐要求<span class="token operator">?</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/* A few bytes might be lost to byte aligning the heap start address. */</span>
<span class="token comment">//丢弃一点内存空间，用于字节对齐</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">configADJUSTED_HEAP_SIZE</span>	<span class="token expression"><span class="token punctuation">(</span> configTOTAL_HEAP_SIZE <span class="token operator">-</span> portBYTE_ALIGNMENT <span class="token punctuation">)</span></span></span>

<span class="token comment">/* Allocate the memory for the heap. */</span>
<span class="token comment">//是否由应用分配内存</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> configAPPLICATION_ALLOCATED_HEAP <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token comment">/* The application writer has already defined the array used for the RTOS
	heap - probably so it can be placed in a special segment or address. */</span>
	<span class="token comment">//用户自己定义的静态内存</span>
	<span class="token keyword">extern</span> <span class="token class-name">uint8_t</span> ucHeap<span class="token punctuation">[</span> configTOTAL_HEAP_SIZE <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
	<span class="token comment">//使用系统默认定义的内存</span>
	<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> ucHeap<span class="token punctuation">[</span> configTOTAL_HEAP_SIZE <span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* configAPPLICATION_ALLOCATED_HEAP */</span></span>

<span class="token comment">/* Index into the ucHeap array. */</span>
<span class="token keyword">static</span> <span class="token class-name">size_t</span> xNextFreeByte <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pvportmalloc" tabindex="-1"><a class="header-anchor" href="#pvportmalloc" aria-hidden="true">#</a> pvPortMalloc()</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">pvPortMalloc</span><span class="token punctuation">(</span> <span class="token class-name">size_t</span> xWantedSize <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token keyword">void</span> <span class="token operator">*</span>pvReturn <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span>pucAlignedHeap <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token comment">/* Ensure that blocks are always aligned to the required number of bytes. */</span>
	<span class="token comment">//如果字节对齐的单位不是1，进行字节对齐</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span><span class="token expression"><span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">!=</span> <span class="token number">1</span> <span class="token punctuation">)</span></span></span>
	<span class="token punctuation">{</span>
		<span class="token comment">//对数据进行对齐的操作，根据\`portBYTE_ALIGNMENT\`的值，\`portBYTE_ALIGNMENT_MASK\`也有不同的值。</span>
		<span class="token comment">/*检测xWantedSize是否已经字节对齐，相比xWantedSize % portBYTE_ALIGNMENT_MASK更快*/</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/*
			Byte alignment required. 
			将xWantedSize按照portBYTE_ALIGNMENT进行强制对齐，让xWantedSize是portBYTE_ALIGNMENT的倍数
			xWantedSize &amp; portBYTE_ALIGNMENT_MASK : 没有对齐的字节数量
			portBYTE_ALIGNMENT - ( xWantedSize &amp; portBYTE_ALIGNMENT_MASK ) : 差多少个字节就可以对齐
			*/</span>
			xWantedSize <span class="token operator">+=</span> <span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token comment">//挂起所有任务</span>
	<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">{</span>	<span class="token comment">//初始化pucAlignedHeap地址</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pucAlignedHeap <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>	
			<span class="token comment">/*
			&amp;ucHeap[ portBYTE_ALIGNMENT ]，获取堆数组ucHeap第portBYTE_ALIGNMENT个字节的地址，
			默认分配的ucHeap[0]的地址可能没有字节对齐，不是portBYTE_ALIGNMENT的整数倍
			那么处理器一次读取8个字节(见指针读写的内存)，需要从ucHeap[0]和ucHeap[0]的地址的后一个内存单元
			，各取一部分组成完整的4字节的数据，因此，跳过一定数量的字节，得到满足对齐要求的地址。
			
			~( ( portPOINTER_SIZE_TYPE ) portBYTE_ALIGNMENT_MASK ):创造一个掩码，用于清除指针的低位，它的值是:
			0xffff fff8:1111 1111 1111 1111 1111 1111 1111 1000(portBYTE_ALIGNMENT_MASK:0x0007)
			这行代码，让pucAlignedHeap的地址在ucHeap[0] 和 ucHeap[ portBYTE_ALIGNMENT ]之间(portBYTE_ALIGNMENT = 8)，从而实现了字节对齐，很精妙的代码
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>heap_1.c的内存分配:</p><p><img src="https://s21.ax1x.com/2024/04/14/pFjj4pt.png" alt="pFjj4pt.png"></p><p>当没有进行字节对齐的时候，如果ucHeap[0]开始，存储的是四个字节的数据，需要读取0x0000和0x0007的内存，才可以拼接成4字节的数据。进程字节对齐以后，只需要从0x0007(*pucAlignedHeap)的内存读取一次就行了。字节对齐之后，对内存的操作，会变得更加高效。</p><p><img src="https://s21.ax1x.com/2024/04/09/pFONch4.png" alt="pFONch4.png"></p><h2 id="heap-2-c" tabindex="-1"><a class="header-anchor" href="#heap-2-c" aria-hidden="true">#</a> heap_2.c</h2><p>heap_2.c可以分配和释放内存，但是不能合并内存，管理一个静态的堆<code>ucHeap</code>。</p><h3 id="配置-1" tabindex="-1"><a class="header-anchor" href="#配置-1" aria-hidden="true">#</a> 配置</h3><p>heap_2.c实现了内存管理，在原始代码上，多了些许参数配置。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">A_BLOCK_LINK</span>
<span class="token punctuation">{</span>	<span class="token comment">//指向下一个内存节点</span>
	<span class="token keyword">struct</span> <span class="token class-name">A_BLOCK_LINK</span> <span class="token operator">*</span>pxNextFreeBlock<span class="token punctuation">;</span> <span class="token comment">/*&lt;&lt; The next free block in the list. */</span>
	<span class="token comment">//当前内存节点的大小，等于链表节点的大小加上链表后面，可以用的内存空间的大小</span>
	<span class="token class-name">size_t</span> xBlockSize<span class="token punctuation">;</span>					  <span class="token comment">/*&lt;&lt; The size of the free block. */</span>
<span class="token punctuation">}</span> BlockLink_t<span class="token punctuation">;</span>

<span class="token comment">//BlockLink_t 进行字节对后的大小，字节对齐方式和heap_1.c一样</span>
<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token class-name">uint16_t</span> heapSTRUCT_SIZE <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>BlockLink_t<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token operator">~</span>portBYTE_ALIGNMENT_MASK<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//heap_2.c中最小的内存分配大小</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">heapMINIMUM_BLOCK_SIZE</span> <span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">size_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>heapSTRUCT_SIZE <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span>

<span class="token comment">//内存的开始和结尾链表</span>
<span class="token keyword">static</span> BlockLink_t xStart<span class="token punctuation">,</span> xEnd<span class="token punctuation">;</span>

<span class="token comment">//空暇内存(未分配内存大小)</span>
<span class="token keyword">static</span> <span class="token class-name">size_t</span> xFreeBytesRemaining <span class="token operator">=</span> configADJUSTED_HEAP_SIZE<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prvheapinit" tabindex="-1"><a class="header-anchor" href="#prvheapinit" aria-hidden="true">#</a> prvHeapInit()</h3><p>在heap_2.c开始，引入了prvHeapInit()函数，函数会初始化ucHeap首地址为字节对齐，同时初始化空闲链表。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">prvHeapInit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	BlockLink_t <span class="token operator">*</span>pxFirstFreeBlock<span class="token punctuation">;</span>
	<span class="token class-name">uint8_t</span> <span class="token operator">*</span>pucAlignedHeap<span class="token punctuation">;</span>

	<span class="token comment">/* Ensure the heap starts on a correctly aligned boundary. */</span>
	<span class="token comment">/*对ucHeap的地址进行字节对齐处理*/</span>
	pucAlignedHeap <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>portPOINTER_SIZE_TYPE<span class="token punctuation">)</span><span class="token operator">&amp;</span>ucHeap<span class="token punctuation">[</span>portBYTE_ALIGNMENT<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">~</span><span class="token punctuation">(</span><span class="token punctuation">(</span>portPOINTER_SIZE_TYPE<span class="token punctuation">)</span>portBYTE_ALIGNMENT_MASK<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/* xStart is used to hold a pointer to the first item in the list of free
	blocks.  The void cast is used to prevent compiler warnings. */</span>
	<span class="token comment">/*将xStart的pxNextFreeBlock地址指向pucAlignedHeap*/</span>
	xStart<span class="token punctuation">.</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span>pucAlignedHeap<span class="token punctuation">;</span>
	xStart<span class="token punctuation">.</span>xBlockSize <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">size_t</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">;</span>

	<span class="token comment">/* xEnd is used to mark the end of the list of free blocks. */</span>
	xEnd<span class="token punctuation">.</span>xBlockSize <span class="token operator">=</span> configADJUSTED_HEAP_SIZE<span class="token punctuation">;</span>
	xEnd<span class="token punctuation">.</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token comment">/* To start with there is a single free block that is sized to take up the
	entire heap space. */</span>
	<span class="token comment">/*在pucAlignedHeap创建pxFirstFreeBlock*/</span>
	pxFirstFreeBlock <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span>pucAlignedHeap<span class="token punctuation">;</span>
	pxFirstFreeBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> configADJUSTED_HEAP_SIZE<span class="token punctuation">;</span>
	pxFirstFreeBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token operator">&amp;</span>xEnd<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在prvHeapInit()之后的空闲内存链表结构:</p><p><img src="https://s21.ax1x.com/2024/04/16/pFxyAqU.png" alt="pFxyAqU.png"></p><h3 id="pvportmalloc-1" tabindex="-1"><a class="header-anchor" href="#pvportmalloc-1" aria-hidden="true">#</a> pvPortMalloc()</h3><p>heap_2.cd的pvPortMalloc函数，对ucHeap分配成一个一个的链表，方便进行free，而heap_1.c没有链表来管理内存，不能进行free。在heap_2.c中，空闲链表的开始是xStart，结束是xEnd，中间的链表是空闲链表，在<code>prvHeapInit()</code>中，会将ucHeap初始化，在ucHeap地址对齐后的地址，创建pxFirstFreeBlock节点，这是第一个空闲节点，空闲链表的结构会初始化成xStart-&gt;pxFirstFreeBlock-&gt;xEnd。在后续的使用中，空闲链表的排序指向会是从小到大的排序,xStart-&gt;freeBlock1-&gt;freeBlock2-&gt;......-&gt;freeBlockEnd-&gt;xEnd,freeBlock1的空间有最小的，freeBlockEnd有最大的空间。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">pvPortMalloc</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> xWantedSize<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//pxPreviousBlock.next 指向 pxBlock。pxNewBlockLink是xWantedSize所需要的链表节点</span>
	BlockLink_t <span class="token operator">*</span>pxBlock<span class="token punctuation">,</span> <span class="token operator">*</span>pxPreviousBlock<span class="token punctuation">,</span> <span class="token operator">*</span>pxNewBlockLink<span class="token punctuation">;</span>
	<span class="token comment">//用于判断空闲链表是否初始化</span>
	<span class="token keyword">static</span> BaseType_t xHeapHasBeenInitialised <span class="token operator">=</span> pdFALSE<span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>pvReturn <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token comment">//暂停所有任务</span>
	<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* If this is the first call to malloc then the heap will require
		initialisation to setup the list of free blocks. */</span>
		<span class="token comment">//如果空闲链表没有初始化，进行初始化操作</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>xHeapHasBeenInitialised <span class="token operator">==</span> pdFALSE<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token function">prvHeapInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			xHeapHasBeenInitialised <span class="token operator">=</span> pdTRUE<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">/* The wanted size is increased so it can contain a BlockLink_t
		structure in addition to the requested amount of bytes. */</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>xWantedSize <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">//xWantedSize加上链表的大小，一次malloc所占用的空间，包含了xWantedSize和链表的大小</span>
			<span class="token comment">//在ucHeap的地址关系是 BlockLink_t + xWantedSize</span>
			xWantedSize <span class="token operator">+=</span> heapSTRUCT_SIZE<span class="token punctuation">;</span>

			<span class="token comment">//进行字节对齐，和heap_1.c一样</span>
			<span class="token comment">/* Ensure that blocks are always aligned to the required number of bytes. */</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">/* Byte alignment required. */</span>
				xWantedSize <span class="token operator">+=</span> <span class="token punctuation">(</span>portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token punctuation">(</span>xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">//确保xWantedSize的大小不会超过configADJUSTED_HEAP_SIZE的大小</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>xWantedSize <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>xWantedSize <span class="token operator">&lt;</span> configADJUSTED_HEAP_SIZE<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Blocks are stored in byte order - traverse the list from the start
			(smallest) block until one of adequate size is found. */</span>
			<span class="token comment">/*pxBlock是当前进行内存判断的链表，pxPreviousBlock是在pxBlock之前的节点
			在第一次进行内存分配的时候，链表的关系是xStart-&gt;pxFirstFreeBlock-&gt;xEnd
			链表里面永远是xStart开始，xEnd结束，中间是一个个，从小到大的空闲内存节点
			在这里pxBlock = pxFirstFreeBlock。
			*/</span>
			pxPreviousBlock <span class="token operator">=</span> <span class="token operator">&amp;</span>xStart<span class="token punctuation">;</span>
			pxBlock <span class="token operator">=</span> xStart<span class="token punctuation">.</span>pxNextFreeBlock<span class="token punctuation">;</span>

			<span class="token comment">//找到第一个，满足xWantedSize需求的节点</span>
			<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&lt;</span> xWantedSize<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				pxPreviousBlock <span class="token operator">=</span> pxBlock<span class="token punctuation">;</span>
				pxBlock <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token comment">/* If we found the end marker then a block of adequate size was not found. */</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>pxBlock <span class="token operator">!=</span> <span class="token operator">&amp;</span>xEnd<span class="token punctuation">)</span>
			<span class="token punctuation">{</span>	
				<span class="token comment">/* Return the memory space - jumping over the BlockLink_t structure
				at its start. */</span>
				<span class="token comment">//返回的地址需要跳过节点头的大小，新分配的内存占用了pxBlock地址的一个节点大小和xWantedSize的大小</span>
				pvReturn <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>pxPreviousBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">)</span> <span class="token operator">+</span> heapSTRUCT_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>

				<span class="token comment">/* This block is being returned for use so must be taken out of the
				list of free blocks. */</span>
				<span class="token comment">//将pxBlock从空闲链表中删除，将pxPreviousBlock指向pxBlock的下一个链表节点</span>
				pxPreviousBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>

				<span class="token comment">//如果pxBlock分配后剩下的空间大于分配最小空间，在剩下的空间分配新的链表</span>
				<span class="token comment">/* If the block is larger than required it can be split into two. */</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">-</span> xWantedSize<span class="token punctuation">)</span> <span class="token operator">&gt;</span> heapMINIMUM_BLOCK_SIZE<span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					<span class="token comment">/* This block is to be split into two.  Create a new block
					following the number of bytes requested. The void cast is
					used to prevent byte alignment warnings from the compiler. */</span>

					<span class="token comment">//分割成的新的链表节点的地址</span>
					pxNewBlockLink <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>pxBlock<span class="token punctuation">)</span> <span class="token operator">+</span> xWantedSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

					<span class="token comment">/* Calculate the sizes of two blocks split from the single
					block. */</span>
					<span class="token comment">//新链表节点的大小(1)</span>
					pxNewBlockLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">-</span> xWantedSize<span class="token punctuation">;</span>
					pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> xWantedSize<span class="token punctuation">;</span>
					
					<span class="token comment">//将新链表节点插入到空闲链表中</span>
					<span class="token comment">/* Insert the new block into the list of free blocks. */</span>
					<span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span><span class="token punctuation">(</span>pxNewBlockLink<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>

				xFreeBytesRemaining <span class="token operator">-=</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token function">traceMALLOC</span><span class="token punctuation">(</span>pvReturn<span class="token punctuation">,</span> xWantedSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token function">xTaskResumeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token punctuation">(</span>configUSE_MALLOC_FAILED_HOOK <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>pvReturn <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">//分配失败的Hook函数</span>
			<span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">vApplicationMallocFailedHook</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token function">vApplicationMallocFailedHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token keyword">return</span> pvReturn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(1)初次malloc，将pxFirstFreeBlock的地址+heapSTRUCT_SIZE作为分配成功的返回地址(pvReturn)，调整pxFirstFreeBlock节点的size成xWantedSize，同时在pvReturn地址加上xWantedSize处，新建pxNewBlockLink链表节点。</p><p><img src="https://s21.ax1x.com/2024/04/16/pFxyNid.png" alt="pFxyNid.png"></p><h3 id="prvinsertblockintofreelist" tabindex="-1"><a class="header-anchor" href="#prvinsertblockintofreelist" aria-hidden="true">#</a> prvInsertBlockIntoFreeList()</h3><p>将链表插入到空闲链表中，插入的空闲链表是从小到大排序</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">prvInsertBlockIntoFreeList</span><span class="token expression"><span class="token punctuation">(</span>pxBlockToInsert<span class="token punctuation">)</span>                                                                                </span><span class="token punctuation">\\</span>
	<span class="token expression"><span class="token punctuation">{</span>                                                                                                                              </span><span class="token punctuation">\\</span>
		<span class="token comment">//临时变量，用于改变地址</span></span>
		BlockLink_t <span class="token operator">*</span>pxIterator<span class="token punctuation">;</span>                                                                                                   \\
		<span class="token comment">//需要插入的大小</span>
		<span class="token class-name">size_t</span> xBlockSize<span class="token punctuation">;</span>                                                                                                         \\
                                                                                                                                   \\
		xBlockSize <span class="token operator">=</span> pxBlockToInsert<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>                                                                                  \\
                                                                                                                                   \\
		<span class="token comment">/* Iterate through the list until a block is found that has a larger size */</span>                                               \\
		<span class="token comment">/* than the block we are inserting. */</span>                                                                                     \\
		<span class="token comment">//从xStart开始排序，找到第一个，链表节点size大于需要插入的链表节点的size</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span>pxIterator <span class="token operator">=</span> <span class="token operator">&amp;</span>xStart<span class="token punctuation">;</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&lt;</span> xBlockSize<span class="token punctuation">;</span> pxIterator <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">)</span> \\
		<span class="token punctuation">{</span>                                                                                                                          \\
			<span class="token comment">/* There is nothing to do here - just iterate to the correct position. */</span>                                              \\
		<span class="token punctuation">}</span>                                                                                                                          \\
                                                                                                                                   \\
		<span class="token comment">/* Update the list to include the block being inserted in the correct */</span>                                                   \\
		<span class="token comment">/* position. */</span>                                                                                                            \\
		<span class="token comment">//将需要插入的链表节点指向第一个比自己大的链表节点 </span>
		pxBlockToInsert<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>                                                            \\
		<span class="token comment">//将第一个比自己大的链表节点的前一个链表节点指向自己 </span>
		pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxBlockToInsert<span class="token punctuation">;</span>                                                                             \\
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vportfree" tabindex="-1"><a class="header-anchor" href="#vportfree" aria-hidden="true">#</a> vPortFree()</h3><p>函数接受一个需要释放的内存地址，同时将需要释放的内存所对应的链表节插入到空闲链表中</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">vPortFree</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>pv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token comment">//将void类型指针强制转换成uint8_t类型指针</span>
	<span class="token class-name">uint8_t</span> <span class="token operator">*</span>puc <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">uint8_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>pv<span class="token punctuation">;</span>
	BlockLink_t <span class="token operator">*</span>pxLink<span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span>pv <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* The memory being freed will have an BlockLink_t structure immediately
		before it. */</span>
		<span class="token comment">//找到需要释放的内存地址的之前的链表节点地址</span>
		puc <span class="token operator">-=</span> heapSTRUCT_SIZE<span class="token punctuation">;</span>

		<span class="token comment">/* This unexpected casting is to keep some compilers from issuing
		byte alignment warnings. */</span>
		<span class="token comment">//将地址强制转化成BlockLink_t类型指针</span>
		pxLink <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span>puc<span class="token punctuation">;</span>

		<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Add this block to the list of free blocks. */</span>
			<span class="token comment">//插入</span>
			<span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>BlockLink_t <span class="token operator">*</span><span class="token punctuation">)</span>pxLink<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			xFreeBytesRemaining <span class="token operator">+=</span> pxLink<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
			<span class="token function">traceFREE</span><span class="token punctuation">(</span>pv<span class="token punctuation">,</span> pxLink<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token function">xTaskResumeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="heap-4-c" tabindex="-1"><a class="header-anchor" href="#heap-4-c" aria-hidden="true">#</a> heap_4.c</h2><p>heap_4.c的功能和heap_2.c一样，但是能够实现内存合并，通过改变空闲链表的排序方式，由链表节点从小到大排序改成按照列表节点地址大小排序实现</p><h3 id="配置-2" tabindex="-1"><a class="header-anchor" href="#配置-2" aria-hidden="true">#</a> 配置</h3><p>heap_4.c新增了以下的配置</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">//heap_4.c中最小的内存分配大小，是xHeapStructSize的2倍大小</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">heapMINIMUM_BLOCK_SIZE</span>	<span class="token expression"><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span> xHeapStructSize <span class="token operator">&lt;&lt;</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span></span></span>
<span class="token comment">//每个字节的位数</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">heapBITS_PER_BYTE</span>		<span class="token expression"><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">8</span> <span class="token punctuation">)</span></span></span>
<span class="token comment">//相比heap_2.c，pxEnd变成指针，减少了一个变量用于判断是否初始化</span>
<span class="token keyword">static</span> BlockLink_t xStart<span class="token punctuation">,</span> <span class="token operator">*</span>pxEnd <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token comment">//表示内存块的分配状态</span>
<span class="token keyword">static</span> <span class="token class-name">size_t</span> xBlockAllocatedBit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prvheapinit-1" tabindex="-1"><a class="header-anchor" href="#prvheapinit-1" aria-hidden="true">#</a> prvHeapInit()</h3><p>相比heap_2.c变化也不大</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">prvHeapInit</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
BlockLink_t <span class="token operator">*</span>pxFirstFreeBlock<span class="token punctuation">;</span>
<span class="token class-name">uint8_t</span> <span class="token operator">*</span>pucAlignedHeap<span class="token punctuation">;</span>
<span class="token class-name">size_t</span> uxAddress<span class="token punctuation">;</span>
<span class="token class-name">size_t</span> xTotalHeapSize <span class="token operator">=</span> configTOTAL_HEAP_SIZE<span class="token punctuation">;</span>

	<span class="token comment">//对uxAddress进行字节对齐</span>
	
	<span class="token comment">/* Ensure the heap starts on a correctly aligned boundary. */</span>
	uxAddress <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> ucHeap<span class="token punctuation">;</span>
	
	<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> uxAddress <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		uxAddress <span class="token operator">+=</span> <span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		uxAddress <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">//实际总共可用的内存容量，uxAddress - ( size_t ) ucHeap ：字节对齐的损耗</span>
		xTotalHeapSize <span class="token operator">-=</span> uxAddress <span class="token operator">-</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> ucHeap<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//内存分配的起始地址</span>
	pucAlignedHeap <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> uxAddress<span class="token punctuation">;</span>

	<span class="token comment">/* xStart is used to hold a pointer to the first item in the list of free
	blocks.  The void cast is used to prevent compiler warnings. */</span>
	xStart<span class="token punctuation">.</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pucAlignedHeap<span class="token punctuation">;</span>
	xStart<span class="token punctuation">.</span>xBlockSize <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">;</span>

	<span class="token comment">/* pxEnd is used to mark the end of the list of free blocks and is inserted
	at the end of the heap space. */</span>
	<span class="token comment">//ucHeap的堆底地址</span>
	uxAddress <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pucAlignedHeap <span class="token punctuation">)</span> <span class="token operator">+</span> xTotalHeapSize<span class="token punctuation">;</span>、
	<span class="token comment">//堆底地址减去一个链表节点的地址</span>
	uxAddress <span class="token operator">-=</span> xHeapStructSize<span class="token punctuation">;</span>
	<span class="token comment">//字节对齐后的地址，可能会略微损失一点字节</span>
	uxAddress <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span><span class="token punctuation">;</span>
	pxEnd <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> uxAddress<span class="token punctuation">;</span>
	pxEnd<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	pxEnd<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token comment">/* To start with there is a single free block that is sized to take up the
	entire heap space, minus the space taken by pxEnd. */</span>
	<span class="token comment">//将pxFirstFreeBlock指向upucAlignedHeap，即ucHeap[0]字节对齐后的地址</span>
	pxFirstFreeBlock <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pucAlignedHeap<span class="token punctuation">;</span>
	pxFirstFreeBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> uxAddress <span class="token operator">-</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pxFirstFreeBlock<span class="token punctuation">;</span>
	pxFirstFreeBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxEnd<span class="token punctuation">;</span>

	<span class="token comment">/* Only one block exists - and it covers the entire usable heap space. */</span>
	xMinimumEverFreeBytesRemaining <span class="token operator">=</span> pxFirstFreeBlock<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
	xFreeBytesRemaining <span class="token operator">=</span> pxFirstFreeBlock<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>

	<span class="token comment">/* Work out the position of the top bit in a size_t variable. */</span>
	<span class="token comment">//将xBlockAllocatedBit的二进制最高位置1</span>
	xBlockAllocatedBit <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token operator">*</span> heapBITS_PER_BYTE <span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pvportmalloc-2" tabindex="-1"><a class="header-anchor" href="#pvportmalloc-2" aria-hidden="true">#</a> pvPortMalloc()</h3><p>相比heap_2.c变化不大</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">pvPortMalloc</span><span class="token punctuation">(</span> <span class="token class-name">size_t</span> xWantedSize <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
BlockLink_t <span class="token operator">*</span>pxBlock<span class="token punctuation">,</span> <span class="token operator">*</span>pxPreviousBlock<span class="token punctuation">,</span> <span class="token operator">*</span>pxNewBlockLink<span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token operator">*</span>pvReturn <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* If this is the first call to malloc then the heap will require
		initialisation to setup the list of free blocks. */</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pxEnd <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token function">prvHeapInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">/* Check the requested block size is not so large that the top bit is
		set.  The top bit of the block size member of the BlockLink_t structure
		is used to determine who owns the block - the application or the
		kernel, so it must be free. */</span>
		<span class="token comment">//检查请求的内存块大小是否可以被分配，xBlockAllocatedBit用于判断表示内存块是否已经被分配给应用程序使用</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> xBlockAllocatedBit <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* The wanted size is increased so it can contain a BlockLink_t
			structure in addition to the requested amount of bytes. */</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span> xWantedSize <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">//xWantedSize对齐进行字节对齐</span>
				xWantedSize <span class="token operator">+=</span> xHeapStructSize<span class="token punctuation">;</span>

				<span class="token comment">/* Ensure that blocks are always aligned to the required number
				of bytes. */</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0x00</span> <span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					<span class="token comment">/* Byte alignment required. */</span>
					xWantedSize <span class="token operator">+=</span> <span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token function">configASSERT</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">else</span>
				<span class="token punctuation">{</span>
					<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span>
			<span class="token punctuation">{</span>
				<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token comment">//尝试找到满足分配要求的空闲内存链表节点</span>

			<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&lt;=</span> xFreeBytesRemaining <span class="token punctuation">)</span> <span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">/* Traverse the list from the start	(lowest address) block until
				one	of adequate size is found. */</span>
				pxPreviousBlock <span class="token operator">=</span> <span class="token operator">&amp;</span>xStart<span class="token punctuation">;</span>
				pxBlock <span class="token operator">=</span> xStart<span class="token punctuation">.</span>pxNextFreeBlock<span class="token punctuation">;</span>
				<span class="token keyword">while</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&lt;</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					pxPreviousBlock <span class="token operator">=</span> pxBlock<span class="token punctuation">;</span>
					pxBlock <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>

				<span class="token comment">/* If the end marker was reached then a block of adequate size
				was	not found. */</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span> pxBlock <span class="token operator">!=</span> pxEnd <span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					<span class="token comment">/* Return the memory space pointed to - jumping over the
					BlockLink_t structure at its start. */</span>
					pvReturn <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxPreviousBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token punctuation">)</span> <span class="token operator">+</span> xHeapStructSize <span class="token punctuation">)</span><span class="token punctuation">;</span>

					<span class="token comment">/* This block is being returned for use so must be taken out
					of the list of free blocks. */</span>
					pxPreviousBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>

					<span class="token comment">/* If the block is larger than required it can be split into
					two. */</span>
					<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">-</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&gt;</span> heapMINIMUM_BLOCK_SIZE <span class="token punctuation">)</span>
					<span class="token punctuation">{</span>
						<span class="token comment">/* This block is to be split into two.  Create a new
						block following the number of bytes requested. The void
						cast is used to prevent byte alignment warnings from the
						compiler. */</span>
						pxNewBlockLink <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxBlock <span class="token punctuation">)</span> <span class="token operator">+</span> xWantedSize <span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token function">configASSERT</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pxNewBlockLink <span class="token punctuation">)</span> <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

						<span class="token comment">/* Calculate the sizes of two blocks split from the
						single block. */</span>
						pxNewBlockLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">-</span> xWantedSize<span class="token punctuation">;</span>
						pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> xWantedSize<span class="token punctuation">;</span>

						<span class="token comment">/* Insert the new block into the list of free blocks. */</span>
						<span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span> pxNewBlockLink <span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
					<span class="token keyword">else</span>
					<span class="token punctuation">{</span>
						<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>

					<span class="token comment">//更新空闲内存容量</span>

					xFreeBytesRemaining <span class="token operator">-=</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>

					<span class="token keyword">if</span><span class="token punctuation">(</span> xFreeBytesRemaining <span class="token operator">&lt;</span> xMinimumEverFreeBytesRemaining <span class="token punctuation">)</span>
					<span class="token punctuation">{</span>
						xMinimumEverFreeBytesRemaining <span class="token operator">=</span> xFreeBytesRemaining<span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
					<span class="token keyword">else</span>
					<span class="token punctuation">{</span>
						<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>

					<span class="token comment">/* The block is being returned - it is allocated and owned
					by the application and has no &quot;next&quot; block. */</span>
					<span class="token comment">//xBlockSize最高位为1，标记为该pxBlock已经被使用</span>
					pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">|=</span> xBlockAllocatedBit<span class="token punctuation">;</span>
					pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">else</span>
				<span class="token punctuation">{</span>
					<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span>
			<span class="token punctuation">{</span>
				<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token function">configASSERT</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pvReturn <span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> pvReturn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prvinsertblockintofreelist-1" tabindex="-1"><a class="header-anchor" href="#prvinsertblockintofreelist-1" aria-hidden="true">#</a> prvInsertBlockIntoFreeList()</h3><p>将链表插入到空闲链表中，相比heap_2.c,插入的空闲链表是按照地址大小排序，heap_4.c按照内存地址排序，并且会把相邻的内存块合并</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span> BlockLink_t <span class="token operator">*</span>pxBlockToInsert <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
BlockLink_t <span class="token operator">*</span>pxIterator<span class="token punctuation">;</span>
<span class="token class-name">uint8_t</span> <span class="token operator">*</span>puc<span class="token punctuation">;</span>

	<span class="token comment">/* Iterate through the list until a block is found that has a higher address
	than the block being inserted. */</span>
	<span class="token comment">/*找到第一个比自己地址大的链表节点的前一个节点
	节点关系: pxIterator &lt;  pxBlockToInsert &lt; pxIterator-&gt;pxNextFreeBlock*/</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span> pxIterator <span class="token operator">=</span> <span class="token operator">&amp;</span>xStart<span class="token punctuation">;</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">&lt;</span> pxBlockToInsert<span class="token punctuation">;</span> pxIterator <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* Nothing to do here, just iterate to the right position. */</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//pxIterator 和 pxBlockToInsert ，两块内存能不能成为一个连续的块，the block being inserted指的是pxIterator</span>
	<span class="token comment">/* Do the block being inserted, and the block it is being inserted after
	make a contiguous block of memory? */</span>
	puc <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxIterator<span class="token punctuation">;</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> puc <span class="token operator">+</span> pxIterator<span class="token operator">-&gt;</span>xBlockSize <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxBlockToInsert <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>	
		<span class="token comment">//将pxIterator和将要插入的pxBlockToInsert块合并</span>
		pxIterator<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">+=</span> pxBlockToInsert<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
		<span class="token comment">//将要合入的链表改成pxIterator，完成合入，同时让pxBlockToInsert的地址指向完成合并的块，在接下来判断能不能继续合入</span>
		pxBlockToInsert <span class="token operator">=</span> pxIterator<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//两块内存能不能成为一个连续的块(pxBlockToInsert 和 pxIterator-&gt;pxNextFreeBlock)</span>
	<span class="token comment">/* Do the block being inserted, and the block it is being inserted before
	make a contiguous block of memory? */</span>
	puc <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxBlockToInsert<span class="token punctuation">;</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> puc <span class="token operator">+</span> pxBlockToInsert<span class="token operator">-&gt;</span>xBlockSize <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">!=</span> pxEnd <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>	
			<span class="token comment">//更新pxBlockToInsert的大小，将pxBlockToInsert的xBlockSize加上pxIterator后一个块的xBlockSize</span>
			<span class="token comment">/* Form one big block from the two blocks. */</span>
			pxBlockToInsert<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">+=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
			<span class="token comment">//将pxBlockToInsert的pxNextFreeBlock指向pxIterator后一个块的后一个块</span>
			pxBlockToInsert<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			pxBlockToInsert<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxEnd<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>	
		<span class="token comment">//pxBlockToInsert的前一块或者后面一块都不能合并</span>
		pxBlockToInsert<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* If the block being inserted plugged a gab, so was merged with the block
	before and the block after, then it&#39;s pxNextFreeBlock pointer will have
	already been set, and should not be set here as that would make it point
	to itself. */</span>
	<span class="token comment">//除了pxBlockToInsert和pxBlockToInsert之前的块合并成功的情况，都需要更新地址</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span> pxIterator <span class="token operator">!=</span> pxBlockToInsert <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxBlockToInsert<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vportfree-1" tabindex="-1"><a class="header-anchor" href="#vportfree-1" aria-hidden="true">#</a> vPortFree()</h3><p>相比Heap_2.c,heap_4.c的vPortFree，增加了对内存块是否被使用的判断</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">vPortFree</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span>pv <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token class-name">uint8_t</span> <span class="token operator">*</span>puc <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pv<span class="token punctuation">;</span>
BlockLink_t <span class="token operator">*</span>pxLink<span class="token punctuation">;</span>

	<span class="token keyword">if</span><span class="token punctuation">(</span> pv <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* The memory being freed will have an BlockLink_t structure immediately
		before it. */</span>
		puc <span class="token operator">-=</span> xHeapStructSize<span class="token punctuation">;</span>

		<span class="token comment">/* This casting is to keep the compiler from issuing warnings. */</span>
		pxLink <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> puc<span class="token punctuation">;</span>

		<span class="token comment">/* Check the block is actually allocated. */</span>
		<span class="token comment">//如果内存快没有被使用 则不能释放</span>
		<span class="token function">configASSERT</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&amp;</span> xBlockAllocatedBit <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">configASSERT</span><span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&amp;</span> xBlockAllocatedBit <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">/* The block is being returned to the heap - it is no longer
				allocated. */</span>
				<span class="token comment">//标记内存块未被使用</span>
				pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&amp;=</span> <span class="token operator">~</span>xBlockAllocatedBit<span class="token punctuation">;</span>

				<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">{</span>
					<span class="token comment">/* Add this block to the list of free blocks. */</span>
					xFreeBytesRemaining <span class="token operator">+=</span> pxLink<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
					<span class="token function">traceFREE</span><span class="token punctuation">(</span> pv<span class="token punctuation">,</span> pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token comment">//插入到空闲内存链表</span>
					<span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> BlockLink_t <span class="token operator">*</span> <span class="token punctuation">)</span> pxLink <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span> <span class="token function">xTaskResumeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span>
			<span class="token punctuation">{</span>
				<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="heap-5-c" tabindex="-1"><a class="header-anchor" href="#heap-5-c" aria-hidden="true">#</a> heap_5.c</h2><p>heap_5.c是相对heap_4.c进行改进，能管理物理空间上不连续的内存，将prvHeapInit替换成vPortDefineHeapRegions，进行内存的初始化。</p><h3 id="配置-3" tabindex="-1"><a class="header-anchor" href="#配置-3" aria-hidden="true">#</a> 配置</h3><p>相比heap_4.c,因为可以管理物理空间上不连续的内存，因此，删除了ucHeap，新增了HeapRegion，其他的变化不大。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">HeapRegion</span>
<span class="token punctuation">{</span>
	<span class="token class-name">uint8_t</span> <span class="token operator">*</span>pucStartAddress<span class="token punctuation">;</span>
	<span class="token class-name">size_t</span> xSizeInBytes<span class="token punctuation">;</span>
<span class="token punctuation">}</span> HeapRegion_t<span class="token punctuation">;</span>

<span class="token comment">//用法</span>
 HeapRegion_t xHeapRegions<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span>
 <span class="token punctuation">{</span>
	<span class="token punctuation">{</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token number">0x80000000UL</span><span class="token punctuation">,</span> <span class="token number">0x10000</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">&lt;&lt;</span> Defines a block of <span class="token number">0x10000</span> bytes starting at address <span class="token number">0x80000000</span>
  	<span class="token punctuation">{</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token number">0x90000000UL</span><span class="token punctuation">,</span> <span class="token number">0xa0000</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">&lt;&lt;</span> Defines a block of <span class="token number">0xa0000</span> bytes starting at address of <span class="token number">0x90000000</span>
  	<span class="token punctuation">{</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span> <span class="token punctuation">}</span>                <span class="token operator">&lt;&lt;</span> Terminates the array<span class="token punctuation">.</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vportdefineheapregions" tabindex="-1"><a class="header-anchor" href="#vportdefineheapregions" aria-hidden="true">#</a> vPortDefineHeapRegions()</h3><p>初始化空闲内存链表，需要一个HeapRegion_t数组，记录内存大小和起始地址</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">vPortDefineHeapRegions</span><span class="token punctuation">(</span> <span class="token keyword">const</span> HeapRegion_t <span class="token operator">*</span> <span class="token keyword">const</span> pxHeapRegions <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
BlockLink_t <span class="token operator">*</span>pxFirstFreeBlockInRegion <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token operator">*</span>pxPreviousFreeBlock<span class="token punctuation">;</span>
<span class="token class-name">size_t</span> xAlignedHeap<span class="token punctuation">;</span>
<span class="token class-name">size_t</span> xTotalRegionSize<span class="token punctuation">,</span> xTotalHeapSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
BaseType_t xDefinedRegions <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">size_t</span> xAddress<span class="token punctuation">;</span>
<span class="token keyword">const</span> HeapRegion_t <span class="token operator">*</span>pxHeapRegion<span class="token punctuation">;</span>

	<span class="token comment">/* Can only call once! */</span>
	<span class="token function">configASSERT</span><span class="token punctuation">(</span> pxEnd <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//取出pxHeapRegions中，第一个HeapRegion_t</span>
	pxHeapRegion <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span> pxHeapRegions<span class="token punctuation">[</span> xDefinedRegions <span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">//循环pxHeapRegions，直到pxHeapRegion-&gt;xSizeInBytes = 0</span>
	<span class="token keyword">while</span><span class="token punctuation">(</span> pxHeapRegion<span class="token operator">-&gt;</span>xSizeInBytes <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		xTotalRegionSize <span class="token operator">=</span> pxHeapRegion<span class="token operator">-&gt;</span>xSizeInBytes<span class="token punctuation">;</span>

		<span class="token comment">//确保新增的pxHeapRegion的地址已经字节对齐</span>
		<span class="token comment">/* Ensure the heap region starts on a correctly aligned boundary. */</span>
		xAddress <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pxHeapRegion<span class="token operator">-&gt;</span>pucStartAddress<span class="token punctuation">;</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xAddress <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			xAddress <span class="token operator">+=</span> <span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
			xAddress <span class="token operator">&amp;=</span> <span class="token operator">~</span>portBYTE_ALIGNMENT_MASK<span class="token punctuation">;</span>

			<span class="token comment">/* Adjust the size for the bytes lost to alignment. */</span>
			<span class="token comment">//更新xTotalRegionSize，内存容量大小</span>
			xTotalRegionSize <span class="token operator">-=</span> xAddress <span class="token operator">-</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pxHeapRegion<span class="token operator">-&gt;</span>pucStartAddress<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">//当前块的可用的内存地址</span>
		xAlignedHeap <span class="token operator">=</span> xAddress<span class="token punctuation">;</span>

		<span class="token comment">/* Set xStart if it has not already been set. */</span>
		<span class="token comment">//当第一次循环的时候，xStart没有初始化</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> xDefinedRegions <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* xStart is used to hold a pointer to the first item in the list of
			free blocks.  The void cast is used to prevent compiler warnings. */</span>
			<span class="token comment">//将xStart指向第一块可用的内存地址</span>
			xStart<span class="token punctuation">.</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token punctuation">(</span> BlockLink_t <span class="token operator">*</span> <span class="token punctuation">)</span> xAlignedHeap<span class="token punctuation">;</span>
			xStart<span class="token punctuation">.</span>xBlockSize <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>	
			<span class="token comment">//不是第一次循环，在第一次循环中，pxEnd已经被赋值</span>
			<span class="token comment">/* Should only get here if one region has already been added to the
			heap. */</span>
			<span class="token function">configASSERT</span><span class="token punctuation">(</span> pxEnd <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">/* Check blocks are passed in with increasing start addresses. */</span>
			<span class="token function">configASSERT</span><span class="token punctuation">(</span> xAddress <span class="token operator">&gt;</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pxEnd <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">/* Remember the location of the end marker in the previous region, if
		any. */</span>
		<span class="token comment">//不是第一次循环时，需要将上一次循环的pxEnd指向这次循环的pxFirstFreeBlockInRegion</span>
		pxPreviousFreeBlock <span class="token operator">=</span> pxEnd<span class="token punctuation">;</span>

		<span class="token comment">/* pxEnd is used to mark the end of the list of free blocks and is
		inserted at the end of the region space.
		在一个内存块的末尾创建pxEnd */</span>
		<span class="token comment">//找到一个内存块的末尾</span>
		xAddress <span class="token operator">=</span> xAlignedHeap <span class="token operator">+</span> xTotalRegionSize<span class="token punctuation">;</span>
		<span class="token comment">//内存块的末尾减去xHeapStructSize的地址</span>
		xAddress <span class="token operator">-=</span> xHeapStructSize<span class="token punctuation">;</span>
		<span class="token comment">//将其字节对齐</span>
		xAddress <span class="token operator">&amp;=</span> <span class="token operator">~</span>portBYTE_ALIGNMENT_MASK<span class="token punctuation">;</span>
		<span class="token comment">//创建一个pxEnd</span>
		pxEnd <span class="token operator">=</span> <span class="token punctuation">(</span> BlockLink_t <span class="token operator">*</span> <span class="token punctuation">)</span> xAddress<span class="token punctuation">;</span>
		pxEnd<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		pxEnd<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

		<span class="token comment">/* To start with there is a single free block in this region that is
		sized to take up the entire heap region minus the space taken by the
		free block structure. 
		//在一个内存块的可用地址创建pxFirstFreeBlockInRegion
		*/</span>
		pxFirstFreeBlockInRegion <span class="token operator">=</span> <span class="token punctuation">(</span> BlockLink_t <span class="token operator">*</span> <span class="token punctuation">)</span> xAlignedHeap<span class="token punctuation">;</span>
		<span class="token comment">//记录空闲块的内存大小，时链表头的大小，加上没有被pxFirstFreeBlockInRegion和pxEnd占据的内存大小</span>
		pxFirstFreeBlockInRegion<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> xAddress <span class="token operator">-</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> pxFirstFreeBlockInRegion<span class="token punctuation">;</span>
		<span class="token comment">//将pxFirstFreeBlockInRegion指向xEnd</span>
		pxFirstFreeBlockInRegion<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxEnd<span class="token punctuation">;</span>

		<span class="token comment">/* If this is not the first region that makes up the entire heap space
		then link the previous region to this region. */</span>
		<span class="token comment">//将上一块内存的结尾链表，指向这一块内存的开始链表，在第一次不生效</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pxPreviousFreeBlock <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			pxPreviousFreeBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxFirstFreeBlockInRegion<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">//总共的可以大小</span>
		xTotalHeapSize <span class="token operator">+=</span> pxFirstFreeBlockInRegion<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>

		<span class="token comment">/* Move onto the next HeapRegion_t structure. */</span>
		xDefinedRegions<span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token comment">//迭代到下一块内存块</span>
		pxHeapRegion <span class="token operator">=</span> <span class="token operator">&amp;</span><span class="token punctuation">(</span> pxHeapRegions<span class="token punctuation">[</span> xDefinedRegions <span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	xMinimumEverFreeBytesRemaining <span class="token operator">=</span> xTotalHeapSize<span class="token punctuation">;</span>
	xFreeBytesRemaining <span class="token operator">=</span> xTotalHeapSize<span class="token punctuation">;</span>

	<span class="token comment">/* Check something was actually defined before it is accessed. */</span>
	<span class="token function">configASSERT</span><span class="token punctuation">(</span> xTotalHeapSize <span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">/* Work out the position of the top bit in a size_t variable. */</span>
	<span class="token comment">//让xBlockAllocatedBit最高位为1</span>
	xBlockAllocatedBit <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span> <span class="token class-name">size_t</span> <span class="token punctuation">)</span> <span class="token operator">*</span> heapBITS_PER_BYTE <span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pvportmalloc-3" tabindex="-1"><a class="header-anchor" href="#pvportmalloc-3" aria-hidden="true">#</a> pvPortMalloc()</h3><p>相比heap_4.c变化不大</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">pvPortMalloc</span><span class="token punctuation">(</span> <span class="token class-name">size_t</span> xWantedSize <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
BlockLink_t <span class="token operator">*</span>pxBlock<span class="token punctuation">,</span> <span class="token operator">*</span>pxPreviousBlock<span class="token punctuation">,</span> <span class="token operator">*</span>pxNewBlockLink<span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token operator">*</span>pvReturn <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	<span class="token comment">//确保堆已经被初始化，未初始化时，pxEnd = 0</span>
	<span class="token comment">/* The heap must be initialised before the first call to
	prvPortMalloc(). */</span>
	<span class="token function">configASSERT</span><span class="token punctuation">(</span> pxEnd <span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* Check the requested block size is not so large that the top bit is
		set.  The top bit of the block size member of the BlockLink_t structure
		is used to determine who owns the block - the application or the
		kernel, so it must be free. */</span>
		<span class="token comment">//检查请求的size是否大于xBlockAllocatedBit，最高位用来表示该内存块是否使用</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> xBlockAllocatedBit <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* The wanted size is increased so it can contain a BlockLink_t
			structure in addition to the requested amount of bytes. */</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span> xWantedSize <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">//加上结构体的大小</span>
				xWantedSize <span class="token operator">+=</span> xHeapStructSize<span class="token punctuation">;</span>

				<span class="token comment">/* Ensure that blocks are always aligned to the required number
				of bytes. */</span>
				<span class="token comment">//字节对齐</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0x00</span> <span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					<span class="token comment">/* Byte alignment required. */</span>
					xWantedSize <span class="token operator">+=</span> <span class="token punctuation">(</span> portBYTE_ALIGNMENT <span class="token operator">-</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&amp;</span> portBYTE_ALIGNMENT_MASK <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">else</span>
				<span class="token punctuation">{</span>
					<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span>
			<span class="token punctuation">{</span>
				<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token comment">//检查请求的大小是否大于剩余的内存大小</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span> xWantedSize <span class="token operator">&lt;=</span> xFreeBytesRemaining <span class="token punctuation">)</span> <span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">/* Traverse the list from the start	(lowest address) block until
				one	of adequate size is found. */</span>
				<span class="token comment">//遍历空闲内存链表</span>
				pxPreviousBlock <span class="token operator">=</span> <span class="token operator">&amp;</span>xStart<span class="token punctuation">;</span>
				pxBlock <span class="token operator">=</span> xStart<span class="token punctuation">.</span>pxNextFreeBlock<span class="token punctuation">;</span>
				<span class="token comment">//找到第一个满足需求大小的内存块并赋值为pxBlock</span>
				<span class="token keyword">while</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&lt;</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					pxPreviousBlock <span class="token operator">=</span> pxBlock<span class="token punctuation">;</span>
					pxBlock <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>

				<span class="token comment">/* If the end marker was reached then a block of adequate size
				was	not found. */</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span> pxBlock <span class="token operator">!=</span> pxEnd <span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					<span class="token comment">/* Return the memory space pointed to - jumping over the
					BlockLink_t structure at its start. */</span>
					<span class="token comment">//跳过链表头</span>
					pvReturn <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxPreviousBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token punctuation">)</span> <span class="token operator">+</span> xHeapStructSize <span class="token punctuation">)</span><span class="token punctuation">;</span>

					<span class="token comment">/* This block is being returned for use so must be taken out
					of the list of free blocks. */</span>
					<span class="token comment">//将该内存块从空闲内存链表中删除</span>
					pxPreviousBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>

					<span class="token comment">/* If the block is larger than required it can be split into
					two. */</span>
					<span class="token comment">//如果该内存块的大小大于两倍链表大小</span>
					<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">-</span> xWantedSize <span class="token punctuation">)</span> <span class="token operator">&gt;</span> heapMINIMUM_BLOCK_SIZE <span class="token punctuation">)</span>
					<span class="token punctuation">{</span>
						<span class="token comment">/* This block is to be split into two.  Create a new
						block following the number of bytes requested. The void
						cast is used to prevent byte alignment warnings from the
						compiler. */</span>
						<span class="token comment">//新链表的地址,（xWantedSize = 需要分配的内存大小 + xHeapStructSize）</span>
						pxNewBlockLink <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxBlock <span class="token punctuation">)</span> <span class="token operator">+</span> xWantedSize <span class="token punctuation">)</span><span class="token punctuation">;</span>

						<span class="token comment">/* Calculate the sizes of two blocks split from the
						single block. */</span>
						<span class="token comment">//新空闲链表的大小</span>
						pxNewBlockLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">-</span> xWantedSize<span class="token punctuation">;</span>
						<span class="token comment">//分配的链表大小</span>
						pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">=</span> xWantedSize<span class="token punctuation">;</span>

						<span class="token comment">//将链表插入到空闲链表</span>
						<span class="token comment">/* Insert the new block into the list of free blocks. */</span>
						<span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxNewBlockLink <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
					<span class="token keyword">else</span>
					<span class="token punctuation">{</span>
						<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>

					xFreeBytesRemaining <span class="token operator">-=</span> pxBlock<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>

					<span class="token keyword">if</span><span class="token punctuation">(</span> xFreeBytesRemaining <span class="token operator">&lt;</span> xMinimumEverFreeBytesRemaining <span class="token punctuation">)</span>
					<span class="token punctuation">{</span>
						xMinimumEverFreeBytesRemaining <span class="token operator">=</span> xFreeBytesRemaining<span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
					<span class="token keyword">else</span>
					<span class="token punctuation">{</span>
						<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>

					<span class="token comment">/* The block is being returned - it is allocated and owned
					by the application and has no &quot;next&quot; block. */</span>
					<span class="token comment">//将该区块标记为已经使用</span>
					pxBlock<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">|=</span> xBlockAllocatedBit<span class="token punctuation">;</span>
					pxBlock<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">else</span>
				<span class="token punctuation">{</span>
					<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span>
			<span class="token punctuation">{</span>
				<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

	<span class="token keyword">return</span> pvReturn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vportfree-2" tabindex="-1"><a class="header-anchor" href="#vportfree-2" aria-hidden="true">#</a> vPortFree()</h3><p>将需要释放的区块插入到空闲链表</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">vPortFree</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span>pv <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
<span class="token class-name">uint8_t</span> <span class="token operator">*</span>puc <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pv<span class="token punctuation">;</span>
BlockLink_t <span class="token operator">*</span>pxLink<span class="token punctuation">;</span>

	<span class="token keyword">if</span><span class="token punctuation">(</span> pv <span class="token operator">!=</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* The memory being freed will have an BlockLink_t structure immediately
		before it. */</span>
		<span class="token comment">//减去链表头的地址</span>
		puc <span class="token operator">-=</span> xHeapStructSize<span class="token punctuation">;</span>

		<span class="token comment">/* This casting is to keep the compiler from issuing warnings. */</span>
		pxLink <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span> <span class="token punctuation">)</span> puc<span class="token punctuation">;</span>

		<span class="token comment">/* Check the block is actually allocated. */</span>
		<span class="token comment">//检查该区块是已经被分配了</span>
		<span class="token function">configASSERT</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&amp;</span> xBlockAllocatedBit <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">configASSERT</span><span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&amp;</span> xBlockAllocatedBit <span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token keyword">if</span><span class="token punctuation">(</span> pxLink<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token comment">/* The block is being returned to the heap - it is no longer
				allocated. */</span>
				<span class="token comment">//将该区块标记为未使用</span>
				pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">&amp;=</span> <span class="token operator">~</span>xBlockAllocatedBit<span class="token punctuation">;</span>

				<span class="token function">vTaskSuspendAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">{</span>
					<span class="token comment">/* Add this block to the list of free blocks. */</span>
					xFreeBytesRemaining <span class="token operator">+=</span> pxLink<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
					<span class="token function">traceFREE</span><span class="token punctuation">(</span> pv<span class="token punctuation">,</span> pxLink<span class="token operator">-&gt;</span>xBlockSize <span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token comment">//插入到空闲链表</span>
					<span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> <span class="token punctuation">(</span> BlockLink_t <span class="token operator">*</span> <span class="token punctuation">)</span> pxLink <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token punctuation">)</span> <span class="token function">xTaskResumeAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span>
			<span class="token punctuation">{</span>
				<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prvinsertblockintofreelist-2" tabindex="-1"><a class="header-anchor" href="#prvinsertblockintofreelist-2" aria-hidden="true">#</a> prvInsertBlockIntoFreeList()</h3><p>将链表插入到空闲内存链表中，并且尝试合并。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">prvInsertBlockIntoFreeList</span><span class="token punctuation">(</span> BlockLink_t <span class="token operator">*</span>pxBlockToInsert <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
BlockLink_t <span class="token operator">*</span>pxIterator<span class="token punctuation">;</span>
<span class="token class-name">uint8_t</span> <span class="token operator">*</span>puc<span class="token punctuation">;</span>

	<span class="token comment">/* Iterate through the list until a block is found that has a higher address
	than the block being inserted. */</span>
	<span class="token comment">//找到第一个比插入链表的地址小的空闲链表节点</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span> pxIterator <span class="token operator">=</span> <span class="token operator">&amp;</span>xStart<span class="token punctuation">;</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">&lt;</span> pxBlockToInsert<span class="token punctuation">;</span> pxIterator <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* Nothing to do here, just iterate to the right position. */</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* Do the block being inserted, and the block it is being inserted after
	make a contiguous block of memory? */</span>
	<span class="token comment">//如果第一个比插入链表小的链表的地址，加上它的大小，等于插入链表的地址，那么可以合并</span>
	puc <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxIterator<span class="token punctuation">;</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> puc <span class="token operator">+</span> pxIterator<span class="token operator">-&gt;</span>xBlockSize <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxBlockToInsert <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		pxIterator<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">+=</span> pxBlockToInsert<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
		<span class="token comment">//将插入的链表改成第一个比插入链表小的链表</span>
		pxBlockToInsert <span class="token operator">=</span> pxIterator<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//判断插入的链表能否和它后面的一个链表合并</span>
	<span class="token comment">/* Do the block being inserted, and the block it is being inserted before
	make a contiguous block of memory? */</span>
	puc <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxBlockToInsert<span class="token punctuation">;</span>
	<span class="token comment">//插入的链表的地址加上它的大小，等于它后面的链表地址即可合并</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span> puc <span class="token operator">+</span> pxBlockToInsert<span class="token operator">-&gt;</span>xBlockSize <span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token punctuation">(</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span> <span class="token punctuation">)</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">//插入的链表的后面一个链表不是pxEnd</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">!=</span> pxEnd <span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Form one big block from the two blocks. */</span>
			<span class="token comment">//插入的链表的大小加上它后面一个链表的大小</span>
			pxBlockToInsert<span class="token operator">-&gt;</span>xBlockSize <span class="token operator">+=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token operator">-&gt;</span>xBlockSize<span class="token punctuation">;</span>
			<span class="token comment">//插入的链表的后面一个链表指向 插入的链表的后面一个链表的后面一个链表</span>
			pxBlockToInsert<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span>
		<span class="token punctuation">{</span>
			<span class="token comment">//将插入的链表的后面指向pxEnd</span>
			pxBlockToInsert<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxEnd<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		<span class="token comment">//插入的链表不能和它后面的一个链表合并，将插入的链表指向第一个比插入链表小的链表的后面一个链表</span>
		pxBlockToInsert<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* If the block being inserted plugged a gab, so was merged with the block
	before and the block after, then it&#39;s pxNextFreeBlock pointer will have
	already been set, and should not be set here as that would make it point
	to itself. */</span>
	<span class="token comment">//插入的链表不能和它前面的一个链表合并</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span> pxIterator <span class="token operator">!=</span> pxBlockToInsert <span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">//第一个比插入的链表小的链表，指向被插入的链表</span>
		pxIterator<span class="token operator">-&gt;</span>pxNextFreeBlock <span class="token operator">=</span> pxBlockToInsert<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		<span class="token function">mtCOVERAGE_TEST_MARKER</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,70),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","nacunguanli.html.vue"]]);export{r as default};
