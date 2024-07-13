import{_ as n,o as s,c as a,a as p}from"./app-Pv2J7xBQ.js";const t={},e=p(`<h2 id="hal-init" tabindex="-1"><a class="header-anchor" href="#hal-init"><span>HAL_Init()</span></a></h2><p>该函数是用于初始化HAL库，它必须是第一个在main函数中执行的指令(在调用其他HAL函数之前)，它执行了以下的功能：</p><p>配置Flash预取功、配置SysTick一毫秒产生一个中断、设置中断优先级组、初始化低等级硬件</p><div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line">HAL_StatusTypeDef <span class="token function">HAL_Init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* Configure Flash prefetch */</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token punctuation">(</span>PREFETCH_ENABLE <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span></span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>STM32F101x6<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F101xB<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F101xE<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F101xG<span class="token punctuation">)</span> <span class="token operator">||</span> </span><span class="token punctuation">\\</span></span>
<span class="line">    <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>STM32F102x6<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F102xB<span class="token punctuation">)</span> <span class="token operator">||</span> </span><span class="token punctuation">\\</span></span>
<span class="line">    <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>STM32F103x6<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F103xB<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F103xE<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F103xG<span class="token punctuation">)</span> <span class="token operator">||</span> </span><span class="token punctuation">\\</span></span>
<span class="line">    <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>STM32F105xC<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>STM32F107xC<span class="token punctuation">)</span></span></span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//开启缓存预读功能</span></span>
<span class="line">  <span class="token comment">/* Prefetch buffer is not available on value line devices */</span></span>
<span class="line">  <span class="token function">__HAL_FLASH_PREFETCH_BUFFER_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* PREFETCH_ENABLE */</span></span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//设置中断优先级分组</span></span>
<span class="line">  <span class="token comment">/* Set Interrupt Group Priority */</span></span>
<span class="line">  <span class="token function">HAL_NVIC_SetPriorityGrouping</span><span class="token punctuation">(</span>NVIC_PRIORITYGROUP_4<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//设置1ms一次的systick</span></span>
<span class="line">  <span class="token comment">/* Use systick as time base source and configure 1ms tick (default clock after Reset is HSI) */</span></span>
<span class="line">  <span class="token function">HAL_InitTick</span><span class="token punctuation">(</span>TICK_INT_PRIORITY<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//初始化硬件</span></span>
<span class="line">  <span class="token comment">/* Init the low level hardware */</span></span>
<span class="line">  <span class="token function">HAL_MspInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* Return function status */</span></span>
<span class="line">  <span class="token keyword">return</span> HAL_OK<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hal-flash-prefetch-buffer-enable" tabindex="-1"><a class="header-anchor" href="#hal-flash-prefetch-buffer-enable"><span>__HAL_FLASH_PREFETCH_BUFFER_ENABLE()</span></a></h3><p>启用Flash预取功能</p><p>FLSAh-&gt;ACR 地址：0x4002 2000</p><p>配置Flash预取功能，设置FLASH-&gt;ACR寄存器bit4的值为1，只有在系统时钟(SYSCLK)小于24MHz并且没有打开AHB的预分频器(即HCLK必须等于 SYSHCLK)时，才能执行预取缓冲器的打开和关闭操作</p><p><img src="https://s21.ax1x.com/2024/05/12/pkeHf8P.png" alt="pkeHf8P.png"></p><p><code>#define __HAL_FLASH_PREFETCH_BUFFER_ENABLE() (FLASH-&gt;ACR |= FLASH_ACR_PRFTBE)</code></p><h3 id="hal-nvic-setprioritygrouping" tabindex="-1"><a class="header-anchor" href="#hal-nvic-setprioritygrouping"><span>HAL_NVIC_SetPriorityGrouping()</span></a></h3><p>通过写SCB-&gt;AIRCR寄存器bit[10:8]，设置优先级分组字段(抢占优先级和子优先级)</p><p><img src="https://s21.ax1x.com/2024/05/14/pkm8xq1.png" alt="pkm8xq1.png"></p><ul><li><p><strong>bit[31:16]</strong> VECTKEY 访问钥匙,任何对该寄存器的写操作，都需要将0x50FA写入这些位，否则将会忽略操作</p></li><li><p><strong>bit15</strong> ENDIANESS 字节顺序(r) 读出为1，stm32f103c8t6为小端CPU</p></li><li><p><strong>bit[10:8]</strong> PRIGROUP 优先级分组(r/w)</p></li></ul><h4 id="代码" tabindex="-1"><a class="header-anchor" href="#代码"><span>代码</span></a></h4><div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line"><span class="token keyword">void</span> <span class="token function">HAL_NVIC_SetPriorityGrouping</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> PriorityGroup<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* Check the parameters */</span></span>
<span class="line">  <span class="token comment">//检查参数，PriorityGroup是否是从NVIC_PRIORITYGROUP_0到NVIC_PRIORITYGROUP_4</span></span>
<span class="line">  <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_NVIC_PRIORITY_GROUP</span><span class="token punctuation">(</span>PriorityGroup<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">//设置中断优先级组</span></span>
<span class="line">  <span class="token comment">/* Set the PRIGROUP[10:8] bits according to the PriorityGroup parameter value */</span></span>
<span class="line">  <span class="token function">NVIC_SetPriorityGrouping</span><span class="token punctuation">(</span>PriorityGroup<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">NVIC_SetPriorityGrouping</span>    <span class="token expression">__NVIC_SetPriorityGrouping</span></span></span>
<span class="line"></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SCB_AIRCR_VECTKEY_Pos</span>              <span class="token expression"><span class="token number">16U</span>                                            </span><span class="token comment">/*!&lt; SCB AIRCR: VECTKEY Position */</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SCB_AIRCR_VECTKEY_Msk</span>              <span class="token expression"><span class="token punctuation">(</span><span class="token number">0xFFFFUL</span> <span class="token operator">&lt;&lt;</span> SCB_AIRCR_VECTKEY_Pos<span class="token punctuation">)</span>            </span><span class="token comment">/*!&lt; SCB AIRCR: VECTKEY Mask */</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SCB_AIRCR_PRIGROUP_Pos</span>              <span class="token expression"><span class="token number">8U</span>                                            </span><span class="token comment">/*!&lt; SCB AIRCR: PRIGROUP Position */</span></span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">SCB_AIRCR_PRIGROUP_Msk</span>             <span class="token expression"><span class="token punctuation">(</span><span class="token number">7UL</span> <span class="token operator">&lt;&lt;</span> SCB_AIRCR_PRIGROUP_Pos<span class="token punctuation">)</span>                </span><span class="token comment">/*!&lt; SCB AIRCR: PRIGROUP Mask */</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//设置SCB-&gt;AIRCR寄存器的[10:8]位</span></span>
<span class="line">__STATIC_INLINE <span class="token keyword">void</span> <span class="token function">__NVIC_SetPriorityGrouping</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> PriorityGroup<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token class-name">uint32_t</span> reg_value<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//确保设置的优先级位只有三位</span></span>
<span class="line"></span>
<span class="line">  <span class="token class-name">uint32_t</span> PriorityGroupTmp <span class="token operator">=</span> <span class="token punctuation">(</span>PriorityGroup <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token number">0x07UL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">/* only values 0..7 are used          */</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//读取当前寄存器的值</span></span>
<span class="line">  <span class="token comment">//reg_value = 0xFA05 0000</span></span>
<span class="line">  reg_value  <span class="token operator">=</span>  SCB<span class="token operator">-&gt;</span>AIRCR<span class="token punctuation">;</span>                                                   <span class="token comment">/* read old register configuration    */</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//让reg_value的[31:16]、[10:8]位为0,其他位为读出值</span></span>
<span class="line">  <span class="token comment">//((uint32_t)(SCB_AIRCR_VECTKEY_Msk | SCB_AIRCR_PRIGROUP_Msk)) = 0xFFFF 0700</span></span>
<span class="line">  <span class="token comment">//清零reg_value的[31:16]、[10:8]</span></span>
<span class="line">  <span class="token comment">//~((uint32_t)(SCB_AIRCR_VECTKEY_Msk | SCB_AIRCR_PRIGROUP_Msk)) = 0x0000 F8FF </span></span>
<span class="line">  <span class="token comment">//reg_value = 0xFA05 0000 | 0x0000 F8FF = 0x0000 0000;</span></span>
<span class="line">  reg_value <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>SCB_AIRCR_VECTKEY_Msk <span class="token operator">|</span> SCB_AIRCR_PRIGROUP_Msk<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* clear bits to change               */</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">//设置寄存器的[31:16]为0x05FA、[10:8]位为PriorityGroup值，其他位为读出值</span></span>
<span class="line">  reg_value  <span class="token operator">=</span>  <span class="token punctuation">(</span>reg_value                                   <span class="token operator">|</span></span>
<span class="line">                <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token number">0x5FAUL</span> <span class="token operator">&lt;&lt;</span> SCB_AIRCR_VECTKEY_Pos<span class="token punctuation">)</span> <span class="token operator">|</span></span>
<span class="line">                <span class="token punctuation">(</span>PriorityGroupTmp <span class="token operator">&lt;&lt;</span> SCB_AIRCR_PRIGROUP_Pos<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">/* Insert write key and priority group */</span></span>
<span class="line">  <span class="token comment">//将值写入到寄存器</span></span>
<span class="line">  SCB<span class="token operator">-&gt;</span>AIRCR <span class="token operator">=</span>  reg_value<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hal-inittick-tick-int-priority" tabindex="-1"><a class="header-anchor" href="#hal-inittick-tick-int-priority"><span>HAL_InitTick(TICK_INT_PRIORITY)</span></a></h3><p>SysTick的寄存器</p><p><img src="https://s21.ax1x.com/2024/05/15/pkn12NT.png" alt="pkn12NT.png"></p><p>SysTick-&gt;CTRL寄存器</p><p><img src="https://s21.ax1x.com/2024/05/15/pkn1TD1.png" alt="pkn1TD1.png"></p><p>SysTick中断优先级寄存器,只用了SCB-&gt;SHPx寄存器只使用了高4位</p><p><img src="https://s21.ax1x.com/2024/05/15/pkn3bss.png" alt="pkn3bss.png"></p><div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line">__weak HAL_StatusTypeDef <span class="token function">HAL_InitTick</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> TickPriority<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* Configure the SysTick to have interrupt in 1ms time basis*/</span></span>
<span class="line">  <span class="token comment">/*配置SysTickSysTick寄存器的值，让其实现1ms的中断，</span>
<span class="line">    在芯片刚启动时候，使用的是内部时钟，SystemCoreClock = 16000000*/</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_SYSTICK_Config</span><span class="token punctuation">(</span>SystemCoreClock <span class="token operator">/</span> <span class="token punctuation">(</span><span class="token number">1000U</span> <span class="token operator">/</span> uwTickFreq<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0U</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token comment">//配置SysTick中断寄存器</span></span>
<span class="line">  <span class="token comment">/* Configure the SysTick IRQ priority */</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//检查TickPriority优先级是否大于物理寄存器允许值</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>TickPriority <span class="token operator">&lt;</span> <span class="token punctuation">(</span><span class="token number">1UL</span> <span class="token operator">&lt;&lt;</span> __NVIC_PRIO_BITS<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//设置SysTick抢占优先级和响应优先级</span></span>
<span class="line">    <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>SysTick_IRQn<span class="token punctuation">,</span> TickPriority<span class="token punctuation">,</span> <span class="token number">0U</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    uwTickPrio <span class="token operator">=</span> TickPriority<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">else</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* Return function status */</span></span>
<span class="line">  <span class="token keyword">return</span> HAL_OK<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">uint32_t</span> <span class="token function">HAL_SYSTICK_Config</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> TicksNumb<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">return</span> <span class="token function">SysTick_Config</span><span class="token punctuation">(</span>TicksNumb<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//配置SysTick寄存器</span></span>
<span class="line">__STATIC_INLINE <span class="token class-name">uint32_t</span> <span class="token function">SysTick_Config</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span> ticks<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">//检查ticks是否大于RELOAD寄存器的值</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ticks <span class="token operator">-</span> <span class="token number">1UL</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> SysTick_LOAD_RELOAD_Msk<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token number">1UL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                                                   <span class="token comment">/* Reload value impossible */</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token comment">//LOAD寄存器</span></span>
<span class="line">  SysTick<span class="token operator">-&gt;</span>LOAD  <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>ticks <span class="token operator">-</span> <span class="token number">1UL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                         <span class="token comment">/* set reload register */</span></span>
<span class="line">  <span class="token comment">//设置SysTick优先级寄存器(最低优先等级)</span></span>
<span class="line">  <span class="token function">NVIC_SetPriority</span> <span class="token punctuation">(</span>SysTick_IRQn<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">1UL</span> <span class="token operator">&lt;&lt;</span> __NVIC_PRIO_BITS<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1UL</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* set Priority for Systick Interrupt */</span></span>
<span class="line">  <span class="token comment">//VAL寄存器</span></span>
<span class="line">  SysTick<span class="token operator">-&gt;</span>VAL   <span class="token operator">=</span> <span class="token number">0UL</span><span class="token punctuation">;</span>                                             <span class="token comment">/* Load the SysTick Counter Value */</span></span>
<span class="line">  <span class="token comment">//CTRL寄存器 外部时钟、开始中断、开始计时</span></span>
<span class="line">  SysTick<span class="token operator">-&gt;</span>CTRL  <span class="token operator">=</span> SysTick_CTRL_CLKSOURCE_Msk <span class="token operator">|</span></span>
<span class="line">                   SysTick_CTRL_TICKINT_Msk   <span class="token operator">|</span></span>
<span class="line">                   SysTick_CTRL_ENABLE_Msk<span class="token punctuation">;</span>                         <span class="token comment">/* Enable SysTick IRQ and SysTick Timer */</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token number">0UL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                                                     <span class="token comment">/* Function successful */</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//设置中断(外设)和异常(m3内核)优先级</span></span>
<span class="line">__STATIC_INLINE <span class="token keyword">void</span> <span class="token function">__NVIC_SetPriority</span><span class="token punctuation">(</span>IRQn_Type IRQn<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> priority<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">int32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>IRQn<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span>  </span>
<span class="line">    <span class="token comment">//外设</span></span>
<span class="line">    NVIC<span class="token operator">-&gt;</span>IP<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span>IRQn<span class="token punctuation">)</span><span class="token punctuation">]</span>               <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">uint8_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span>priority <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">8U</span> <span class="token operator">-</span> __NVIC_PRIO_BITS<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token number">0xFFUL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">else</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//m3内核</span></span>
<span class="line">    SCB<span class="token operator">-&gt;</span>SHP<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span>IRQn<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0xFUL</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">4UL</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">uint8_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span>priority <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">8U</span> <span class="token operator">-</span> __NVIC_PRIO_BITS<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token number">0xFFUL</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//设置抢占优先级和相应优先级</span></span>
<span class="line"><span class="token keyword">void</span> <span class="token function">HAL_NVIC_SetPriority</span><span class="token punctuation">(</span>IRQn_Type IRQn<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> PreemptPriority<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> SubPriority<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span> </span>
<span class="line">  <span class="token class-name">uint32_t</span> prioritygroup <span class="token operator">=</span> <span class="token number">0x00U</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">/* Check the parameters */</span></span>
<span class="line">  <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_NVIC_SUB_PRIORITY</span><span class="token punctuation">(</span>SubPriority<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_NVIC_PREEMPTION_PRIORITY</span><span class="token punctuation">(</span>PreemptPriority<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">//获取NVIC设置的抢占优先级和子优先级</span></span>
<span class="line">  prioritygroup <span class="token operator">=</span> <span class="token function">NVIC_GetPriorityGrouping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token function">NVIC_SetPriority</span><span class="token punctuation">(</span>IRQn<span class="token punctuation">,</span> <span class="token function">NVIC_EncodePriority</span><span class="token punctuation">(</span>prioritygroup<span class="token punctuation">,</span> PreemptPriority<span class="token punctuation">,</span> SubPriority<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//获取设置的中断优先级组</span></span>
<span class="line">__STATIC_INLINE <span class="token class-name">uint32_t</span> <span class="token function">__NVIC_GetPriorityGrouping</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span>SCB<span class="token operator">-&gt;</span>AIRCR <span class="token operator">&amp;</span> SCB_AIRCR_PRIGROUP_Msk<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> SCB_AIRCR_PRIGROUP_Pos<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">__NVIC_PRIO_BITS</span>           <span class="token expression"><span class="token number">4U</span>  </span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//根据设置的中断优先级组，来编码外设的抢占优先级和响应优先级</span></span>
<span class="line">__STATIC_INLINE <span class="token class-name">uint32_t</span> <span class="token function">NVIC_EncodePriority</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span> PriorityGroup<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> PreemptPriority<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> SubPriority<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/*获取NVIC设置的优先级</span>
<span class="line">    7(111) : 0bit抢占优先级 4bit响应优先级</span>
<span class="line">    6(110) : 1bit抢占优先级 3bit响应优先级</span>
<span class="line">    5(101) : 2bit抢占优先级 2bit响应优先级</span>
<span class="line">    4(100) : 3bit抢占优先级 1bit响应优先级</span>
<span class="line">    3(011) : 4bit抢占优先级 0bit响应优先级</span>
<span class="line">  */</span></span>
<span class="line"></span>
<span class="line">  <span class="token class-name">uint32_t</span> PriorityGroupTmp <span class="token operator">=</span> <span class="token punctuation">(</span>PriorityGroup <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token number">0x07UL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">/* only values 0..7 are used          */</span></span>
<span class="line">  <span class="token class-name">uint32_t</span> PreemptPriorityBits<span class="token punctuation">;</span></span>
<span class="line">  <span class="token class-name">uint32_t</span> SubPriorityBits<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/*计算抢占优先级位数</span>
<span class="line">  因为 (3 &lt;= PriorityGroupTmp &lt;= 7) , (0&lt;= (7 - PriorityGroupTmp) &lt;=4)</span>
<span class="line">  那么 ((7UL - PriorityGroupTmp) &gt; (uint32_t)(__NVIC_PRIO_BITS)) = false</span>
<span class="line">  所以 PreemptPriorityBits = (uint32_t)(7UL - PriorityGroupTmp) (0 &lt;= PreemptPriorityBits &lt;= 4)</span>
<span class="line">  */</span></span>
<span class="line">  PreemptPriorityBits <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">7UL</span> <span class="token operator">-</span> PriorityGroupTmp<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>__NVIC_PRIO_BITS<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>__NVIC_PRIO_BITS<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">7UL</span> <span class="token operator">-</span> PriorityGroupTmp<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/*计算响应优先级位数</span>
<span class="line">  因为 (3 &lt;=PriorityGroupTmp&lt;= 7) , (7 &lt;= (PriorityGroupTmp + (uint32_t)(__NVIC_PRIO_BITS)) &lt;= 13 )</span>
<span class="line">  那么 ((PriorityGroupTmp + (uint32_t)(__NVIC_PRIO_BITS)) &lt; (uint32_t)7UL) = false</span>
<span class="line">  所以 SubPriorityBits = (uint32_t)((PriorityGroupTmp - 7UL) + (uint32_t)(__NVIC_PRIO_BITS))</span>
<span class="line">  */</span></span>
<span class="line">  SubPriorityBits     <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>PriorityGroupTmp <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>__NVIC_PRIO_BITS<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token number">7UL</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token number">0UL</span> <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span>PriorityGroupTmp <span class="token operator">-</span> <span class="token number">7UL</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span>__NVIC_PRIO_BITS<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  </span>
<span class="line">  <span class="token keyword">return</span> <span class="token punctuation">(</span></span>
<span class="line">           <span class="token comment">//抢占优先级的数据</span></span>
<span class="line">           <span class="token punctuation">(</span><span class="token punctuation">(</span>PreemptPriority <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">1UL</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span>PreemptPriorityBits<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1UL</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> SubPriorityBits<span class="token punctuation">)</span> <span class="token operator">|</span></span>
<span class="line">           <span class="token comment">//响应优先级的数据</span></span>
<span class="line">           <span class="token punctuation">(</span><span class="token punctuation">(</span>SubPriority     <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token class-name">uint32_t</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">1UL</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span>SubPriorityBits    <span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1UL</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">         <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hal-mspinit" tabindex="-1"><a class="header-anchor" href="#hal-mspinit"><span>HAL_MspInit()</span></a></h3><h4 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器"><span>寄存器</span></a></h4><p>APB2外设时钟使能寄存器(RCC_APB2ENR) RCC基础地址:0x4002 1000</p><p>当使用复用功能时，需要先开启APB2寄存器时钟,配置外设功能(APB2)</p><p><img src="https://s21.ax1x.com/2024/05/16/pkn7Foj.png" alt="pkn7Foj.png"></p><p>APB1外设时钟使能寄存器(RCC_APB1ENR)</p><p>配置外设功能(APB1)</p><p><img src="https://s21.ax1x.com/2024/05/16/pkn7lTJ.png" alt="pkn7lTJ.png"></p><p>复用重映射和调试I/O配置寄存器(AFIO_MAPR) AFIO基础地址:0x4001 0000</p><p>该寄存器用于配置外设功能和重映射管脚</p><p><img src="https://s21.ax1x.com/2024/05/16/pkn7OnU.png" alt="pkn7OnU.png"></p><h4 id="代码-1" tabindex="-1"><a class="header-anchor" href="#代码-1"><span>代码</span></a></h4><div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line"><span class="token keyword">void</span> <span class="token function">HAL_MspInit</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">/* USER CODE BEGIN MspInit 0 */</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* USER CODE END MspInit 0 */</span></span>
<span class="line">  <span class="token comment">//启动AFIO时钟 RCC-&gt;APB2ENR</span></span>
<span class="line">  <span class="token function">__HAL_RCC_AFIO_CLK_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//开启电源接口时钟 RCC-&gt;APB1ENR</span></span>
<span class="line">  <span class="token function">__HAL_RCC_PWR_CLK_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* System interrupt init*/</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/** NOJTAG: JTAG-DP Disabled and SW-DP Enabled</span>
<span class="line">  */</span></span>
<span class="line">  <span class="token comment">//关闭JTAG调试，开启SW调试 AFIO-&gt;MAPR</span></span>
<span class="line">  <span class="token function">__HAL_AFIO_REMAP_SWJ_NOJTAG</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* USER CODE BEGIN MspInit 1 */</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* USER CODE END MspInit 1 */</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//设置APB2ENR寄存器的bit0为1，开启AFIO功能</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">__HAL_RCC_AFIO_CLK_ENABLE</span><span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token keyword">do</span> <span class="token punctuation">{</span> </span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression">__IO <span class="token class-name">uint32_t</span> tmpreg<span class="token punctuation">;</span> </span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression"><span class="token function">SET_BIT</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>APB2ENR<span class="token punctuation">,</span> RCC_APB2ENR_AFIOEN<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token comment">/* Delay after an RCC peripheral clock enabling */</span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression">tmpreg <span class="token operator">=</span> <span class="token function">READ_BIT</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>APB2ENR<span class="token punctuation">,</span> RCC_APB2ENR_AFIOEN<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression"><span class="token function">UNUSED</span><span class="token punctuation">(</span>tmpreg<span class="token punctuation">)</span><span class="token punctuation">;</span> </span><span class="token punctuation">\\</span></span>
<span class="line">                                      <span class="token expression"><span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">0U</span><span class="token punctuation">)</span></span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//设置APB1ENR寄存的bit28为1，开启PWR功能</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">__HAL_RCC_PWR_CLK_ENABLE</span><span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token keyword">do</span> <span class="token punctuation">{</span> </span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression">__IO <span class="token class-name">uint32_t</span> tmpreg<span class="token punctuation">;</span> </span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression"><span class="token function">SET_BIT</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>APB1ENR<span class="token punctuation">,</span> RCC_APB1ENR_PWREN<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token comment">/* Delay after an RCC peripheral clock enabling */</span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression">tmpreg <span class="token operator">=</span> <span class="token function">READ_BIT</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>APB1ENR<span class="token punctuation">,</span> RCC_APB1ENR_PWREN<span class="token punctuation">)</span><span class="token punctuation">;</span></span><span class="token punctuation">\\</span></span>
<span class="line">                                        <span class="token expression"><span class="token function">UNUSED</span><span class="token punctuation">(</span>tmpreg<span class="token punctuation">)</span><span class="token punctuation">;</span> </span><span class="token punctuation">\\</span></span>
<span class="line">                                      <span class="token expression"><span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">0U</span><span class="token punctuation">)</span></span></span></span>
<span class="line"></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name function">AFIO_DBGAFR_CONFIG</span><span class="token expression"><span class="token punctuation">(</span>DBGAFR_SWJCFG<span class="token punctuation">)</span>  <span class="token keyword">do</span><span class="token punctuation">{</span> <span class="token class-name">uint32_t</span> tmpreg <span class="token operator">=</span> AFIO<span class="token operator">-&gt;</span>MAPR<span class="token punctuation">;</span>     </span><span class="token punctuation">\\</span></span>
<span class="line">                                               <span class="token expression">tmpreg <span class="token operator">&amp;=</span> <span class="token operator">~</span>AFIO_MAPR_SWJ_CFG_Msk<span class="token punctuation">;</span> </span><span class="token punctuation">\\</span></span>
<span class="line">                                               <span class="token expression">tmpreg <span class="token operator">|=</span> DBGAFR_SWJCFG<span class="token punctuation">;</span>          </span><span class="token punctuation">\\</span></span>
<span class="line">                                               <span class="token expression">AFIO<span class="token operator">-&gt;</span>MAPR <span class="token operator">=</span> tmpreg<span class="token punctuation">;</span>              </span><span class="token punctuation">\\</span></span>
<span class="line">                                               <span class="token expression"><span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span><span class="token number">0u</span><span class="token punctuation">)</span></span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="systemclock-config" tabindex="-1"><a class="header-anchor" href="#systemclock-config"><span>SystemClock_Config()</span></a></h2><p>该函数用于配置系统时钟，包括HSE、HSI、LSE、LSI、PLL。通过设置RCC相关的寄存器</p><p>RCC-&gt;CR寄存器，在该函数中，该寄存器用于使能PLL时钟、HSE时钟、HSI时钟，以及读取它们是否已经稳定运行</p><p><img src="https://s21.ax1x.com/2024/05/27/pk1u5sH.png" alt="pk1u5sH.png"></p><p>RCC-&gt;CSR寄存器，在该函数中，该寄存器用于使能LSI时钟，判断LSI是否稳定。</p><p><img src="https://s21.ax1x.com/2024/05/27/pk1KYOH.png" alt="pk1KYOH.png"></p><p>PWR-&gt;CRCR寄存器，在该函数中用于使能写域备份控制器</p><p><img src="https://s21.ax1x.com/2024/05/27/pk1Kvh6.png" alt="pk1Kvh6.png"></p><p>RCC-&gt;BDCR寄存器，在该函数中用于使能LSE时钟，判断LSE是否稳定。</p><p><img src="https://s21.ax1x.com/2024/05/27/pk1MPnH.png" alt="pk1MPnH.png"></p><p>RCC-&gt;CFGR寄存器，在该函数中用于配置HSE、PLL预分频倍数、PLL时钟源</p><p><img src="https://s21.ax1x.com/2024/05/27/pk1M8Nq.png" alt="pk1M8Nq.png"></p><h3 id="systemclock-config-1" tabindex="-1"><a class="header-anchor" href="#systemclock-config-1"><span>SystemClock_Config()</span></a></h3><p>设置时钟参数</p><div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line"><span class="token keyword">void</span> <span class="token function">SystemClock_Config</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">//内部/外部振荡器结构体</span></span>
<span class="line">  RCC_OscInitTypeDef RCC_OscInitStruct <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//RCC系统、AHB总线和APB总线的时钟配置结构定义</span></span>
<span class="line">  RCC_ClkInitTypeDef RCC_ClkInitStruct <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/** Initializes the RCC Oscillators according to the specified parameters</span>
<span class="line">  * in the RCC_OscInitTypeDef structure.</span>
<span class="line">  */</span></span>
<span class="line">  <span class="token comment">//配置时钟结构体</span></span>
<span class="line">  <span class="token comment">//配置外置时钟</span></span>
<span class="line">  RCC_OscInitStruct<span class="token punctuation">.</span>OscillatorType <span class="token operator">=</span> RCC_OSCILLATORTYPE_HSE<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//开启外置时钟</span></span>
<span class="line">  RCC_OscInitStruct<span class="token punctuation">.</span>HSEState <span class="token operator">=</span> RCC_HSE_ON<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//HSE时钟预分频器 设置为不分频 RCC_CFGR bit17</span></span>
<span class="line">  RCC_OscInitStruct<span class="token punctuation">.</span>HSEPredivValue <span class="token operator">=</span> RCC_HSE_PREDIV_DIV1<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//开启内置时钟</span></span>
<span class="line">  RCC_OscInitStruct<span class="token punctuation">.</span>HSIState <span class="token operator">=</span> RCC_HSI_ON<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//使用PLL</span></span>
<span class="line">  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLState <span class="token operator">=</span> RCC_PLL_ON<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//PLL时钟源是HSE</span></span>
<span class="line">  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLSource <span class="token operator">=</span> RCC_PLLSOURCE_HSE<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//PLL倍频9倍</span></span>
<span class="line">  RCC_OscInitStruct<span class="token punctuation">.</span>PLL<span class="token punctuation">.</span>PLLMUL <span class="token operator">=</span> RCC_PLL_MUL9<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//配置HSE、PLL</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_RCC_OscConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>RCC_OscInitStruct<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/** Initializes the CPU, AHB and APB buses clocks</span>
<span class="line">  */</span></span>
<span class="line">  <span class="token comment">//使能HCLK、SYSCLK、PCLK1、PCLK2</span></span>
<span class="line">  RCC_ClkInitStruct<span class="token punctuation">.</span>ClockType <span class="token operator">=</span> RCC_CLOCKTYPE_HCLK<span class="token operator">|</span>RCC_CLOCKTYPE_SYSCLK</span>
<span class="line">                              <span class="token operator">|</span>RCC_CLOCKTYPE_PCLK1<span class="token operator">|</span>RCC_CLOCKTYPE_PCLK2<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//系统时钟使用PLL</span></span>
<span class="line">  RCC_ClkInitStruct<span class="token punctuation">.</span>SYSCLKSource <span class="token operator">=</span> RCC_SYSCLKSOURCE_PLLCLK<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//AHB预分频器不分频</span></span>
<span class="line">  RCC_ClkInitStruct<span class="token punctuation">.</span>AHBCLKDivider <span class="token operator">=</span> RCC_SYSCLK_DIV1<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//APB1预分频器2分频</span></span>
<span class="line">  RCC_ClkInitStruct<span class="token punctuation">.</span>APB1CLKDivider <span class="token operator">=</span> RCC_HCLK_DIV2<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">//APB2预分频器不分频</span></span>
<span class="line">  RCC_ClkInitStruct<span class="token punctuation">.</span>APB2CLKDivider <span class="token operator">=</span> RCC_HCLK_DIV1<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_RCC_ClockConfig</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>RCC_ClkInitStruct<span class="token punctuation">,</span> FLASH_LATENCY_2<span class="token punctuation">)</span> <span class="token operator">!=</span> HAL_OK<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Error_Handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="hal-rcc-oscconfig" tabindex="-1"><a class="header-anchor" href="#hal-rcc-oscconfig"><span>HAL_RCC_OscConfig()</span></a></h3><p>配置HSE、LSE、HSI、LSI、PLL时钟</p><div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line">HAL_StatusTypeDef <span class="token function">HAL_RCC_OscConfig</span><span class="token punctuation">(</span>RCC_OscInitTypeDef  <span class="token operator">*</span>RCC_OscInitStruct<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token class-name">uint32_t</span> tickstart<span class="token punctuation">;</span></span>
<span class="line">  <span class="token class-name">uint32_t</span> pll_config<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* Check Null pointer */</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>RCC_OscInitStruct <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">/* Check the parameters */</span></span>
<span class="line">  <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_OSCILLATORTYPE</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>OscillatorType<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">//配置HSE时钟(开启或者关闭)</span></span>
<span class="line">  <span class="token comment">/*------------------------------- HSE Configuration ------------------------*/</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>OscillatorType<span class="token punctuation">)</span> <span class="token operator">&amp;</span> RCC_OSCILLATORTYPE_HSE<span class="token punctuation">)</span> <span class="token operator">==</span> RCC_OSCILLATORTYPE_HSE<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* Check the parameters */</span></span>
<span class="line">    <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_HSE</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSEState<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//当HSE被用作系统时钟，或者PLL时钟被作为系统时钟且HSE是PLL时钟时，HSE必须开启</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">/* When the HSE is used as system clock or clock source for PLL in these cases it is not allowed to be disabled </span>
<span class="line">    RCC系统时钟源是系统时钟(读取寄存器)，或者RCC系统时钟源是PLL时钟，且PLL时钟源是HSE时钟</span>
<span class="line">    (当配置HSE为开启时，系统时钟源或PLL时钟源是HSI时钟，同时，HSI也是系统启动后默认的时钟(16000000))*/</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_SYSCLK_SOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_SYSCLKSOURCE_STATUS_HSE<span class="token punctuation">)</span> <span class="token comment">//</span></span>
<span class="line">        <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_SYSCLK_SOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_SYSCLKSOURCE_STATUS_PLLCLK<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_PLL_OSCSOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_PLLSOURCE_HSE<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">//HSE就绪，且HSE状态要被设置关闭(当HSE被用作系统时钟或者PLL时钟时，HSE必须开启)</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_HSERDY<span class="token punctuation">)</span> <span class="token operator">!=</span> RESET<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSEState <span class="token operator">==</span> RCC_HSE_OFF<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">/* Set the new HSE configuration ---------------------------------------*/</span></span>
<span class="line">      <span class="token comment">//设置HSE时钟状态(RCC-&gt;CR bit16)和旁路状态(RCC-&gt;CR bit18)</span></span>
<span class="line">      <span class="token function">__HAL_RCC_HSE_CONFIG</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSEState<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">//检查HSE是否开启成功以及是否稳定</span></span>
<span class="line">      <span class="token comment">/* Check the HSE State */</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSEState <span class="token operator">!=</span> RCC_HSE_OFF<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Wait till HSE is ready */</span></span>
<span class="line">        <span class="token comment">//检查HSE时钟开启成功,是否稳定(RCC-&gt;CR bit17)</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_HSERDY<span class="token punctuation">)</span> <span class="token operator">==</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> HSE_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">else</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Wait till HSE is disabled */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_HSERDY<span class="token punctuation">)</span> <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> HSE_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token comment">//配置HSI</span></span>
<span class="line">  <span class="token comment">/*----------------------------- HSI Configuration --------------------------*/</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>OscillatorType<span class="token punctuation">)</span> <span class="token operator">&amp;</span> RCC_OSCILLATORTYPE_HSI<span class="token punctuation">)</span> <span class="token operator">==</span> RCC_OSCILLATORTYPE_HSI<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* Check the parameters */</span></span>
<span class="line">    <span class="token comment">//检查HSI配置参数</span></span>
<span class="line">    <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_HSI</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSIState<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">//检查HSI校准值</span></span>
<span class="line">    <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_CALIBRATION_VALUE</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSICalibrationValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//当HSI被用作系统时钟，或者PLL时钟被作为系统时钟且HSI是PLL时钟时，HSI必须开启</span></span>
<span class="line">    <span class="token comment">/* Check if HSI is used as system clock or as PLL source when PLL is selected as system clock */</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_SYSCLK_SOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_SYSCLKSOURCE_STATUS_HSI<span class="token punctuation">)</span></span>
<span class="line">        <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_SYSCLK_SOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_SYSCLKSOURCE_STATUS_PLLCLK<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_PLL_OSCSOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_PLLSOURCE_HSI_DIV2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">//HSI就绪，且HSI状态要被设置关闭(当HSE被用作系统时钟或者PLL时钟时，HSI必须开启)</span></span>
<span class="line">      <span class="token comment">/* When HSI is used as system clock it will not disabled */</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_HSIRDY<span class="token punctuation">)</span> <span class="token operator">!=</span> RESET<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSIState <span class="token operator">!=</span> RCC_HSI_ON<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token comment">//HSI就绪，只能允许调整校准值</span></span>
<span class="line">      <span class="token comment">/* Otherwise, just the calibration is allowed */</span></span>
<span class="line">      <span class="token keyword">else</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Adjusts the Internal High Speed oscillator (HSI) calibration value.*/</span></span>
<span class="line">        <span class="token function">__HAL_RCC_HSI_CALIBRATIONVALUE_ADJUST</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSICalibrationValue<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">/* Check the HSI State */</span></span>
<span class="line">      <span class="token comment">//打开HSI时钟</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSIState <span class="token operator">!=</span> RCC_HSI_OFF<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Enable the Internal High Speed oscillator (HSI). */</span></span>
<span class="line">        <span class="token comment">//开启HSI时钟RCC-&gt;CR bit0 位带操作</span></span>
<span class="line">        <span class="token function">__HAL_RCC_HSI_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">//检查HSI是否开启成功 开启HSI时钟RCC-&gt;CR bit1 </span></span>
<span class="line">        <span class="token comment">/* Wait till HSI is ready */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_HSIRDY<span class="token punctuation">)</span> <span class="token operator">==</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> HSI_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">//调整HSI校准值</span></span>
<span class="line">        <span class="token comment">/* Adjusts the Internal High Speed oscillator (HSI) calibration value.*/</span></span>
<span class="line">        <span class="token function">__HAL_RCC_HSI_CALIBRATIONVALUE_ADJUST</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSICalibrationValue<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">else</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">//关闭HSI</span></span>
<span class="line">        <span class="token comment">/* Disable the Internal High Speed oscillator (HSI). */</span></span>
<span class="line">        <span class="token function">__HAL_RCC_HSI_DISABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">//等待HSI就绪</span></span>
<span class="line">        <span class="token comment">/* Wait till HSI is disabled */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_HSIRDY<span class="token punctuation">)</span> <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> HSI_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">//配置LSI</span></span>
<span class="line">  <span class="token comment">/*------------------------------ LSI Configuration -------------------------*/</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>OscillatorType<span class="token punctuation">)</span> <span class="token operator">&amp;</span> RCC_OSCILLATORTYPE_LSI<span class="token punctuation">)</span> <span class="token operator">==</span> RCC_OSCILLATORTYPE_LSI<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* Check the parameters */</span></span>
<span class="line">    <span class="token comment">//检查LSI状态参数</span></span>
<span class="line">    <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_LSI</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>LSIState<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">/* Check the LSI State */</span></span>
<span class="line">    <span class="token comment">//打开LSI</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>LSIState <span class="token operator">!=</span> RCC_LSI_OFF<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">/* Enable the Internal Low Speed oscillator (LSI). */</span></span>
<span class="line">      <span class="token comment">//打开LSI 位带操作 RCC-&gt;CSR bit0</span></span>
<span class="line">      <span class="token function">__HAL_RCC_LSI_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">      tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">/* Wait till LSI is ready */</span></span>
<span class="line">      <span class="token comment">//等待LSI稳定 RCC-&gt;CSR bit1</span></span>
<span class="line">      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_LSIRDY<span class="token punctuation">)</span> <span class="token operator">==</span> RESET<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> LSI_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token comment">/*  To have a fully stabilized clock in the specified range, a software delay of 1ms</span>
<span class="line">          should be added.延迟1ms确保时钟更加稳定</span>
<span class="line">          */</span></span>
<span class="line">      <span class="token function">RCC_Delay</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">/* Disable the Internal Low Speed oscillator (LSI). */</span></span>
<span class="line">      <span class="token comment">//关闭LSI 位带操作 RCC-&gt;CSR bit0</span></span>
<span class="line">      <span class="token function">__HAL_RCC_LSI_DISABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">      tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">/* Wait till LSI is disabled */</span></span>
<span class="line">      <span class="token comment">//等待LSI稳定 RCC-&gt;CSR bit1</span></span>
<span class="line">      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_LSIRDY<span class="token punctuation">)</span> <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> LSI_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  </span>
<span class="line">  <span class="token comment">//配置LSE</span></span>
<span class="line">  <span class="token comment">/*------------------------------ LSE Configuration -------------------------*/</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>OscillatorType<span class="token punctuation">)</span> <span class="token operator">&amp;</span> RCC_OSCILLATORTYPE_LSE<span class="token punctuation">)</span> <span class="token operator">==</span> RCC_OSCILLATORTYPE_LSE<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    FlagStatus       pwrclkchanged <span class="token operator">=</span> RESET<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">/* Check the parameters */</span></span>
<span class="line">    <span class="token comment">//检查LSEState状态</span></span>
<span class="line">    <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_LSE</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>LSEState<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//更新域备份控制器中LSE配置，要求有必要的写域备份控制器的权限</span></span>
<span class="line">    <span class="token comment">/* Update LSE configuration in Backup Domain control register    */</span></span>
<span class="line">    <span class="token comment">/* Requires to enable write access to Backup Domain of necessary */</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//检查电源接口时钟未开启</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_PWR_IS_CLK_DISABLED</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">//打开电源接口时钟</span></span>
<span class="line">      <span class="token function">__HAL_RCC_PWR_CLK_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      pwrclkchanged <span class="token operator">=</span> SET<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//禁止写入RTC和后备寄存器 PWR-&gt;CR bit8</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_IS_BIT_CLR</span><span class="token punctuation">(</span>PWR<span class="token operator">-&gt;</span>CR<span class="token punctuation">,</span> PWR_CR_DBP<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">/* Enable write access to Backup domain */</span></span>
<span class="line">      <span class="token comment">//打开写入RTC和后备寄存器权限</span></span>
<span class="line">      <span class="token function">SET_BIT</span><span class="token punctuation">(</span>PWR<span class="token operator">-&gt;</span>CR<span class="token punctuation">,</span> PWR_CR_DBP<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">//等待电源控制寄存器写权限稳定</span></span>
<span class="line">      <span class="token comment">/* Wait for Backup domain Write protection disable */</span></span>
<span class="line">      tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">HAL_IS_BIT_CLR</span><span class="token punctuation">(</span>PWR<span class="token operator">-&gt;</span>CR<span class="token punctuation">,</span> PWR_CR_DBP<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> RCC_DBP_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">//设置LSE配置</span></span>
<span class="line">    <span class="token comment">/* Set the new LSE configuration -----------------------------------------*/</span></span>
<span class="line">    <span class="token comment">//设置LSE时钟状态(RCC-&gt;BDCR bit0)和旁路状态(RCC-&gt;CR bit2)</span></span>
<span class="line">    <span class="token function">__HAL_RCC_LSE_CONFIG</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>LSEState<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">/* Check the LSE State */</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>LSEState <span class="token operator">!=</span> RCC_LSE_OFF<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">      tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">/* Wait till LSE is ready */</span></span>
<span class="line">      <span class="token comment">//等待LSE稳定 RCC-&gt;BDCR bit1</span></span>
<span class="line">      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_LSERDY<span class="token punctuation">)</span> <span class="token operator">==</span> RESET<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> RCC_LSE_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">      tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      <span class="token comment">/* Wait till LSE is disabled */</span></span>
<span class="line">      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_LSERDY<span class="token punctuation">)</span> <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> RCC_LSE_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">/* Require to disable power clock if necessary */</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>pwrclkchanged <span class="token operator">==</span> SET<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">//关闭写域备份控制器的权限</span></span>
<span class="line">      <span class="token function">__HAL_RCC_PWR_CLK_DISABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">//false</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>RCC_CR_PLL2ON<span class="token punctuation">)</span></span></span></span>
<span class="line">  <span class="token comment">/*-------------------------------- PLL2 Configuration -----------------------*/</span></span>
<span class="line">  <span class="token comment">/* Check the parameters */</span></span>
<span class="line">  <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_PLL2</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>PLL2State<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>PLL2State<span class="token punctuation">)</span> <span class="token operator">!=</span> RCC_PLL2_NONE<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">/* This bit can not be cleared if the PLL2 clock is used indirectly as system</span>
<span class="line">      clock (i.e. it is used as PLL clock entry that is used as system clock). */</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_PLL_OSCSOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_PLLSOURCE_HSE<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> \\</span>
<span class="line">        <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_SYSCLK_SOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_SYSCLKSOURCE_STATUS_PLLCLK<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> \\</span>
<span class="line">        <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">READ_BIT</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>CFGR2<span class="token punctuation">,</span> RCC_CFGR2_PREDIV1SRC<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> RCC_CFGR2_PREDIV1SRC_PLL2<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>PLL2State<span class="token punctuation">)</span> <span class="token operator">==</span> RCC_PLL2_ON<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Check the parameters */</span></span>
<span class="line">        <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_PLL2_MUL</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>PLL2MUL<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_HSE_PREDIV2</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>HSEPrediv2Value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Prediv2 can be written only when the PLLI2S is disabled. */</span></span>
<span class="line">        <span class="token comment">/* Return an error only if new value is different from the programmed value */</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">HAL_IS_BIT_SET</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>CR<span class="token punctuation">,</span> RCC_CR_PLL3ON<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> \\</span>
<span class="line">            <span class="token punctuation">(</span><span class="token function">__HAL_RCC_HSE_GET_PREDIV2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>HSEPrediv2Value<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Disable the main PLL2. */</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL2_DISABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Wait till PLL2 is disabled */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_PLL2RDY<span class="token punctuation">)</span> <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> PLL2_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Configure the HSE prediv2 factor --------------------------------*/</span></span>
<span class="line">        <span class="token function">__HAL_RCC_HSE_PREDIV2_CONFIG</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>HSEPrediv2Value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Configure the main PLL2 multiplication factors. */</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL2_CONFIG</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL2<span class="token punctuation">.</span>PLL2MUL<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Enable the main PLL2. */</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL2_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Wait till PLL2 is ready */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_PLL2RDY<span class="token punctuation">)</span>  <span class="token operator">==</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> PLL2_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">else</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Set PREDIV1 source to HSE */</span></span>
<span class="line">        <span class="token function">CLEAR_BIT</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>CFGR2<span class="token punctuation">,</span> RCC_CFGR2_PREDIV1SRC<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Disable the main PLL2. */</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL2_DISABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Wait till PLL2 is disabled */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_PLL2RDY<span class="token punctuation">)</span>  <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> PLL2_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* RCC_CR_PLL2ON */</span></span></span>
<span class="line">  <span class="token comment">//配置PLL</span></span>
<span class="line">  <span class="token comment">/*-------------------------------- PLL Configuration -----------------------*/</span></span>
<span class="line">  <span class="token comment">/* Check the parameters */</span></span>
<span class="line">  <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_PLL</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLState<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLState<span class="token punctuation">)</span> <span class="token operator">!=</span> RCC_PLL_NONE<span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//PLL是否被用作系统时钟，只有当PLL没有被被用作系统时钟才能操作</span></span>
<span class="line">    <span class="token comment">/* Check if the PLL is used as system clock or not */</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_SYSCLK_SOURCE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> RCC_SYSCLKSOURCE_STATUS_PLLCLK<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span> </span>
<span class="line">      <span class="token comment">//使能PLL</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLState<span class="token punctuation">)</span> <span class="token operator">==</span> RCC_PLL_ON<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Check the parameters */</span></span>
<span class="line">        <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_PLLSOURCE</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLSource<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_PLL_MUL</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLMUL<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">//关掉PLL RCC-&gt;CR,bit24</span></span>
<span class="line">        <span class="token comment">//位段操作</span></span>
<span class="line">        <span class="token comment">//((uint32_t)(0x42000000)+(0x21000*32)+(24*4))</span></span>
<span class="line">        <span class="token comment">/* Disable the main PLL. */</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL_DISABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">      </span>
<span class="line">        <span class="token comment">//RCC-&gt;CR bit25 等待PLL稳定</span></span>
<span class="line">        <span class="token comment">/* Wait till PLL is disabled */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_PLLRDY<span class="token punctuation">)</span>  <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> PLL_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Configure the HSE prediv factor --------------------------------*/</span></span>
<span class="line">        <span class="token comment">//配置HSE预分频</span></span>
<span class="line">        <span class="token comment">/* It can be written only when the PLL is disabled. Not used in PLL source is different than HSE */</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLSource <span class="token operator">==</span> RCC_PLLSOURCE_HSE<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token comment">/* Check the parameter */</span></span>
<span class="line">          <span class="token comment">//检查HSE分频参数</span></span>
<span class="line">          <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_HSE_PREDIV</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSEPredivValue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>RCC_CFGR2_PREDIV1SRC<span class="token punctuation">)</span></span></span></span>
<span class="line">          <span class="token function">assert_param</span><span class="token punctuation">(</span><span class="token function">IS_RCC_PREDIV1_SOURCE</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>Prediv1Source<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">          <span class="token comment">/* Set PREDIV1 source */</span></span>
<span class="line">          <span class="token function">SET_BIT</span><span class="token punctuation">(</span>RCC<span class="token operator">-&gt;</span>CFGR2<span class="token punctuation">,</span> RCC_OscInitStruct<span class="token operator">-&gt;</span>Prediv1Source<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span> <span class="token comment">/* RCC_CFGR2_PREDIV1SRC */</span></span></span>
<span class="line"></span>
<span class="line">          <span class="token comment">/* Set PREDIV1 Value */</span></span>
<span class="line">          <span class="token comment">//配置HSE分频参数</span></span>
<span class="line">          <span class="token comment">//RCC-CFGR bit17</span></span>
<span class="line">          <span class="token function">__HAL_RCC_HSE_PREDIV_CONFIG</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>HSEPredivValue<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        </span>
<span class="line">        <span class="token comment">//配置PLL来源和PLL倍频数</span></span>
<span class="line">        <span class="token comment">//RCC-CFGR bit16 、 bit21:18</span></span>
<span class="line">        <span class="token comment">/* Configure the main PLL clock source and multiplication factors. */</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL_CONFIG</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLSource<span class="token punctuation">,</span></span>
<span class="line">                             RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLMUL<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">/* Enable the main PLL. */</span></span>
<span class="line">        <span class="token comment">//使能PLL</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL_ENABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">//等待PLL就绪</span></span>
<span class="line">        <span class="token comment">/* Wait till PLL is ready */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_PLLRDY<span class="token punctuation">)</span>  <span class="token operator">==</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> PLL_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">else</span><span class="token comment">//失能PLL</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">/* Disable the main PLL. */</span></span>
<span class="line">        <span class="token comment">//位段操作</span></span>
<span class="line">        <span class="token function">__HAL_RCC_PLL_DISABLE</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Get Start Tick */</span></span>
<span class="line">        tickstart <span class="token operator">=</span> <span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">/* Wait till PLL is disabled */</span></span>
<span class="line">        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">__HAL_RCC_GET_FLAG</span><span class="token punctuation">(</span>RCC_FLAG_PLLRDY<span class="token punctuation">)</span>  <span class="token operator">!=</span> RESET<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">HAL_GetTick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> tickstart<span class="token punctuation">)</span> <span class="token operator">&gt;</span> PLL_TIMEOUT_VALUE<span class="token punctuation">)</span></span>
<span class="line">          <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> HAL_TIMEOUT<span class="token punctuation">;</span></span>
<span class="line">          <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token comment">//PLL已经被当作系统时钟源</span></span>
<span class="line">    <span class="token keyword">else</span></span>
<span class="line">    <span class="token punctuation">{</span> </span>
<span class="line">      <span class="token comment">//关闭PLL时钟</span></span>
<span class="line">      <span class="token comment">/* Check if there is a request to disable the PLL used as System clock source */</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLState<span class="token punctuation">)</span> <span class="token operator">==</span> RCC_PLL_OFF<span class="token punctuation">)</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      <span class="token keyword">else</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">//其他配置</span></span>
<span class="line">        <span class="token comment">/* Do not return HAL_ERROR if request repeats the current configuration */</span></span>
<span class="line">        pll_config <span class="token operator">=</span> RCC<span class="token operator">-&gt;</span>CFGR<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token function">READ_BIT</span><span class="token punctuation">(</span>pll_config<span class="token punctuation">,</span> RCC_CFGR_PLLSRC<span class="token punctuation">)</span> <span class="token operator">!=</span> RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLSource<span class="token punctuation">)</span> <span class="token operator">||</span></span>
<span class="line">            <span class="token punctuation">(</span><span class="token function">READ_BIT</span><span class="token punctuation">(</span>pll_config<span class="token punctuation">,</span> RCC_CFGR_PLLMULL<span class="token punctuation">)</span> <span class="token operator">!=</span> RCC_OscInitStruct<span class="token operator">-&gt;</span>PLL<span class="token punctuation">.</span>PLLMUL<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token keyword">return</span> HAL_ERROR<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> HAL_OK<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,55),c=[e];function l(i,o){return s(),a("div",null,c)}const k=n(t,[["render",l],["__file","chushihua.html.vue"]]),r=JSON.parse('{"path":"/blogs/stm32/chushihua.html","title":"初始化","lang":"en-US","frontmatter":{"title":"初始化","date":"2024/5/12","tags":["初始化"],"categories":["stm32"]},"headers":[{"level":2,"title":"HAL_Init()","slug":"hal-init","link":"#hal-init","children":[{"level":3,"title":"__HAL_FLASH_PREFETCH_BUFFER_ENABLE()","slug":"hal-flash-prefetch-buffer-enable","link":"#hal-flash-prefetch-buffer-enable","children":[]},{"level":3,"title":"HAL_NVIC_SetPriorityGrouping()","slug":"hal-nvic-setprioritygrouping","link":"#hal-nvic-setprioritygrouping","children":[]},{"level":3,"title":"HAL_InitTick(TICK_INT_PRIORITY)","slug":"hal-inittick-tick-int-priority","link":"#hal-inittick-tick-int-priority","children":[]},{"level":3,"title":"HAL_MspInit()","slug":"hal-mspinit","link":"#hal-mspinit","children":[]}]},{"level":2,"title":"SystemClock_Config()","slug":"systemclock-config","link":"#systemclock-config","children":[{"level":3,"title":"SystemClock_Config()","slug":"systemclock-config-1","link":"#systemclock-config-1","children":[]},{"level":3,"title":"HAL_RCC_OscConfig()","slug":"hal-rcc-oscconfig","link":"#hal-rcc-oscconfig","children":[]}]}],"git":{},"filePathRelative":"blogs/stm32/初始化.md"}');export{k as comp,r as data};
