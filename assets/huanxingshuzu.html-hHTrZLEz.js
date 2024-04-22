import{_ as n,o as s,c as a,a as t}from"./app-pkHxpBYY.js";const p={},e=t(`<p>环形缓冲区（Ring Buffer）是一种常见的数据结构，其主要作用是在有限的内存空间中实现数据的循环存储，环形缓冲区可以提供高效的数据存储和访问，使得数据可以被持续处理和传输。比如在一个RTOS中，Task A周期性运行，而Task B会不停的产生数据。而这个时候，就可以让Task B往环形缓冲区里面写数据，TASK A周期性的处理缓冲区里面的数据。</p><h2 id="环形缓冲区的读写" tabindex="-1"><a class="header-anchor" href="#环形缓冲区的读写" aria-hidden="true">#</a> 环形缓冲区的读写</h2><p>环形缓冲区有一个读和写的</p><h2 id="源代码" tabindex="-1"><a class="header-anchor" href="#源代码" aria-hidden="true">#</a> 源代码:</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;stdlib.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;time.h&quot;</span></span>
<span class="token keyword">struct</span> <span class="token class-name">RingBuff</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> next_read_index<span class="token punctuation">;</span>
    <span class="token keyword">int</span> next_Write_index<span class="token punctuation">;</span>
    <span class="token keyword">int</span> <span class="token operator">*</span>data<span class="token punctuation">;</span>
    <span class="token keyword">int</span> size<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">RingBuff</span> xRingBuff<span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> buffSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
xRingBuff <span class="token operator">*</span><span class="token function">CreateRingBuff</span><span class="token punctuation">(</span><span class="token keyword">int</span> buffSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">enqueueBuffRing</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">,</span> xRingBuff <span class="token operator">*</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">TaskA</span><span class="token punctuation">(</span>xRingBuff <span class="token operator">*</span>xRingBuff<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">TaskB</span><span class="token punctuation">(</span>xRingBuff <span class="token operator">*</span>xRingBuff<span class="token punctuation">)</span><span class="token punctuation">;</span>

xRingBuff <span class="token operator">*</span><span class="token function">CreateRingBuff</span><span class="token punctuation">(</span><span class="token keyword">int</span> buffSize<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// 分配结构体内存</span>
    xRingBuff <span class="token operator">*</span>buffer <span class="token operator">=</span> <span class="token punctuation">(</span>xRingBuff <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>buffSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>buffer <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;malloc xRingBuff fialed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;malloc xRingBuff success\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 分配数据数组内存</span>
    buffer<span class="token operator">-&gt;</span>data <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token operator">*</span> buffSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>buffer<span class="token operator">-&gt;</span>data <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;malloc xRingBuff data failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">free</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    buffer<span class="token operator">-&gt;</span>size <span class="token operator">=</span> buffSize<span class="token punctuation">;</span>
    buffer<span class="token operator">-&gt;</span>next_read_index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    buffer<span class="token operator">-&gt;</span>next_Write_index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 将数据设置为0</span>
    <span class="token function">memset</span><span class="token punctuation">(</span>buffer<span class="token operator">-&gt;</span>data<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> buffSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> buffer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在buff 没有满的时候，往ringBuff里面写数据</span>
<span class="token keyword">void</span> <span class="token function">enqueueBuffRing</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">,</span> xRingBuff <span class="token operator">*</span>buffer<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//在牺牲一个数据位置的代价下，实现检查ring buff是否已经满了</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>buffer<span class="token operator">-&gt;</span>next_read_index <span class="token operator">==</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>buffer<span class="token operator">-&gt;</span>next_Write_index<span class="token punctuation">,</span> buffer<span class="token operator">-&gt;</span>size<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;the Ring buff[%d] is not been read,write Ring buff[%d]fialed\\n&quot;</span><span class="token punctuation">,</span>buffer<span class="token operator">-&gt;</span>next_read_index<span class="token punctuation">,</span>buffer<span class="token operator">-&gt;</span>next_Write_index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;WRITE data in ring buff[%d] : %d\\n&quot;</span><span class="token punctuation">,</span> buffer<span class="token operator">-&gt;</span>next_Write_index<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        buffer<span class="token operator">-&gt;</span>data<span class="token punctuation">[</span>buffer<span class="token operator">-&gt;</span>next_Write_index<span class="token punctuation">]</span> <span class="token operator">=</span> data<span class="token punctuation">;</span>
        buffer<span class="token operator">-&gt;</span>next_Write_index <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>buffer<span class="token operator">-&gt;</span>next_Write_index<span class="token punctuation">,</span> buffer<span class="token operator">-&gt;</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在数据不是空的时候，读取数据</span>
<span class="token keyword">int</span> <span class="token function">dequeueBuffRing</span><span class="token punctuation">(</span>xRingBuff <span class="token operator">*</span>buffer<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> data <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// 检查buff是不是空的</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>buffer<span class="token operator">-&gt;</span>next_read_index <span class="token operator">==</span> buffer<span class="token operator">-&gt;</span>next_Write_index<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;the ring buff is empty,get Ring buff data failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        data <span class="token operator">=</span> buffer<span class="token operator">-&gt;</span>data<span class="token punctuation">[</span>buffer<span class="token operator">-&gt;</span>next_read_index<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;READ data in ring buff[%d] : %d\\n&quot;</span><span class="token punctuation">,</span> buffer<span class="token operator">-&gt;</span>next_read_index<span class="token punctuation">,</span> buffer<span class="token operator">-&gt;</span>data<span class="token punctuation">[</span>buffer<span class="token operator">-&gt;</span>next_read_index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        buffer<span class="token operator">-&gt;</span>next_read_index <span class="token operator">=</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span>buffer<span class="token operator">-&gt;</span>next_read_index<span class="token punctuation">,</span> buffer<span class="token operator">-&gt;</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> data<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 下一个读/写位置</span>
<span class="token keyword">int</span> <span class="token function">nextIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> buffSize<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> buffSize<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//随机写测试</span>
<span class="token keyword">void</span> <span class="token function">TaskA</span><span class="token punctuation">(</span>xRingBuff <span class="token operator">*</span>xRingBuff<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">int</span> data <span class="token operator">=</span> <span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">100</span><span class="token punctuation">;</span>
        <span class="token function">enqueueBuffRing</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> xRingBuff<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//随机读测试</span>
<span class="token keyword">void</span> <span class="token function">TaskB</span><span class="token punctuation">(</span>xRingBuff <span class="token operator">*</span>xRingBuff<span class="token punctuation">)</span>
<span class="token punctuation">{</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">rand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">int</span> data <span class="token operator">=</span> <span class="token function">dequeueBuffRing</span><span class="token punctuation">(</span>xRingBuff<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> buffSize <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
    xRingBuff <span class="token operator">*</span>myRingBuff <span class="token operator">=</span> <span class="token function">CreateRingBuff</span><span class="token punctuation">(</span>buffSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">srand</span><span class="token punctuation">(</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">200</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">TaskA</span><span class="token punctuation">(</span>myRingBuff<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">TaskB</span><span class="token punctuation">(</span>myRingBuff<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[e];function c(i,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","huanxingshuzu.html.vue"]]);export{r as default};
