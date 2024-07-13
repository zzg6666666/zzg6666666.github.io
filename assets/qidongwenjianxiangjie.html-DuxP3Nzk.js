import{_ as s,o as n,c as e,a}from"./app-Pv2J7xBQ.js";const l={},i=a(`<p>主要分析的文件是STM32CubeMx生成，芯片是STM32F103C8T6。</p><p>启用文件的作用是初始化内存，将已经初始化了的变量的值，从flash复制到ram中，为初始化的变量的内存设置为0，初始化c++相关的全局变量，定义向量表和中断函数。</p><h3 id="简略文件" tabindex="-1"><a class="header-anchor" href="#简略文件"><span>简略文件</span></a></h3><p>删除了注释的简略的的启动文件如下：</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">  .syntax unified</span>
<span class="line">  .cpu cortex-m3</span>
<span class="line">  .fpu softvfp</span>
<span class="line">  .thumb</span>
<span class="line"></span>
<span class="line">.global g_pfnVectors</span>
<span class="line">.global Default_Handler</span>
<span class="line"></span>
<span class="line">.word _sidata</span>
<span class="line"></span>
<span class="line">.word _sdata</span>
<span class="line"></span>
<span class="line">.word _edata</span>
<span class="line"></span>
<span class="line">.word _sbss</span>
<span class="line"></span>
<span class="line">.word _ebss</span>
<span class="line"></span>
<span class="line">.equ  BootRAM, 0xF108F85F</span>
<span class="line"></span>
<span class="line">  .section .text.Reset_Handler</span>
<span class="line">  .weak Reset_Handler</span>
<span class="line">  .type Reset_Handler, %function</span>
<span class="line">Reset_Handler:</span>
<span class="line"></span>
<span class="line">  bl  SystemInit</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">  ldr r0, =_sdata</span>
<span class="line">  ldr r1, =_edata</span>
<span class="line">  ldr r2, =_sidata</span>
<span class="line">  movs r3, #0</span>
<span class="line">  b LoopCopyDataInit</span>
<span class="line"></span>
<span class="line">CopyDataInit:</span>
<span class="line">  ldr r4, [r2, r3]</span>
<span class="line">  str r4, [r0, r3]</span>
<span class="line">  adds r3, r3, #4</span>
<span class="line"></span>
<span class="line">LoopCopyDataInit:</span>
<span class="line">  adds r4, r0, r3</span>
<span class="line">  cmp r4, r1</span>
<span class="line">  bcc CopyDataInit</span>
<span class="line">  </span>
<span class="line">  ldr r2, =_sbss</span>
<span class="line">  ldr r4, =_ebss</span>
<span class="line">  movs r3, #0</span>
<span class="line">  b LoopFillZerobss</span>
<span class="line"></span>
<span class="line">FillZerobss:</span>
<span class="line">  str  r3, [r2]</span>
<span class="line">  adds r2, r2, #4</span>
<span class="line"></span>
<span class="line">LoopFillZerobss:</span>
<span class="line">  cmp r2, r4</span>
<span class="line">  bcc FillZerobss</span>
<span class="line"></span>
<span class="line">    bl __libc_init_array</span>
<span class="line">    </span>
<span class="line">  bl main</span>
<span class="line">  bx lr</span>
<span class="line">.size Reset_Handler, .-Reset_Handler</span>
<span class="line"></span>
<span class="line">    .section .text.Default_Handler,&quot;ax&quot;,%progbits</span>
<span class="line">Default_Handler:</span>
<span class="line">Infinite_Loop:</span>
<span class="line">  b Infinite_Loop</span>
<span class="line">  .size Default_Handler, .-Default_Handler</span>
<span class="line">  </span>
<span class="line">  .section .isr_vector,&quot;a&quot;,%progbits</span>
<span class="line">  .type g_pfnVectors, %object</span>
<span class="line">  .size g_pfnVectors, .-g_pfnVectors</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">g_pfnVectors:</span>
<span class="line"></span>
<span class="line">  .word _estack</span>
<span class="line">  .word Reset_Handler</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .word BootRAM</span>
<span class="line"></span>
<span class="line">  .weak NMI_Handler</span>
<span class="line">  .thumb_set NMI_Handler,Default_Handler</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .weak USBWakeUp_IRQHandler</span>
<span class="line">  .thumb_set USBWakeUp_IRQHandler,Default_Handler</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件头" tabindex="-1"><a class="header-anchor" href="#文件头"><span>文件头</span></a></h3><p>首先，启动文件做了一些描述，告诉编译器该文件的语法等信息</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">  /*使用arm汇编和thumb汇编*/</span>
<span class="line">  .syntax unified</span>
<span class="line">  /* CPU型号 */</span>
<span class="line">  .cpu cortex-m3</span>
<span class="line">  /* 软件FPU */</span>
<span class="line">  .fpu softvfp</span>
<span class="line">  /* 接下来的指令使用 thumb汇编 */</span>
<span class="line">  .thumb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>.syntax unified</strong>:启用统一语法格式，允许在一个汇编中使用arm和thumb汇编。在某些情况下，可能需要设置为<code> .syntax divided</code>,启用传统的语法模式。</p><p><strong>.cpu cortex-m3</strong>：指定目标处理器为 Cortex-M3，通过**.cpu<strong>指令可以让编译器在编译的时候进行优化。你也能会看到这样的汇编指令：</strong>.arch armv7-m**，这指定了处理的架构。<strong>.CPU</strong>和**.arch**汇编指令，都是让编译器为特定的架构进行优化，在通常情况下，只使用一个汇编命令就足够了。</p><p><strong>.fpu softvfp</strong>：指定浮点的处理方式，也可以在makefile中指定，M3架构是没有硬件fpu，因此使用软件fpu。</p><p><strong>.thumb</strong>:指定接下来的汇编语法为thumb汇编</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">.global g_pfnVectors</span>
<span class="line">.global Default_Handler</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>声明全局符号，<code>g_pfnVectors</code>和<code>Default_Handler</code>,对链接文件暴露。g_pfnVectors是全局向量表，Default_Handler是默认的异常处理函数。</p><h3 id="使用的变量" tabindex="-1"><a class="header-anchor" href="#使用的变量"><span>使用的变量</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">/* start address for the initialization values of the .data section. </span>
<span class="line">defined in linker script */</span>
<span class="line">.word  _sidata</span>
<span class="line">/* start address for the .data section. defined in linker script */  </span>
<span class="line">.word  _sdata</span>
<span class="line">/* end address for the .data section. defined in linker script */</span>
<span class="line">.word  _edata</span>
<span class="line">/* start address for the .bss section. defined in linker script */</span>
<span class="line">.word  _sbss</span>
<span class="line">/* end address for the .bss section. defined in linker script */</span>
<span class="line">.word  _ebss</span>
<span class="line">/* stack used for SystemInit_ExtMemCtl; always internal RAM used */</span>
<span class="line"></span>
<span class="line">.equ  BootRAM, 0xF108F85F</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>.word</strong>：一个32位的地址，这里的5个符号都是在链接文件定义，会在链接文件中解释。</p><p><strong>.equ</strong>：相当于C语言的**#define**</p><h3 id="reset-handler的定义" tabindex="-1"><a class="header-anchor" href="#reset-handler的定义"><span>Reset_Handler的定义</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">  .section .text.Reset_Handler</span>
<span class="line">  .weak Reset_Handler</span>
<span class="line">  .type Reset_Handler, %function</span>
<span class="line">Reset_Handler:</span>
<span class="line"></span>
<span class="line">/* Call the clock system initialization function.*/</span>
<span class="line">   bl  SystemInit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>.section</strong>定义一个段，将会占用一些RAM/ROM空间，<strong>.text</strong>表示该段是代码段。<code> .section .text.Reset_Handler</code>表示定义一个叫做<strong>Reset_Handler</strong>函数的代码段。</p><p><strong>.weak</strong>表示该函数是弱定义，如果在其他地方定义过该函数，那么不使用这里的函数。</p><p><strong>.type</strong>：告诉编译器该段的类型，<strong>%function</strong>表示该段是函数类型，让编译器进行优化。</p><p><strong>Reset_Handler:</strong> Reset_Handler函数的代码从这里开始。</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">/* Call the clock system initialization function.*/</span>
<span class="line">  bl  SystemInit</span>
<span class="line"></span>
<span class="line">/* Copy the data segment initializers from flash to SRAM */</span>
<span class="line">  ldr r0, =_sdata   //数据段在内存中的开始地址</span>
<span class="line">  ldr r1, =_edata	  //数据段在内存中的结束地址</span>
<span class="line">  ldr r2, =_sidata 	//数据段在flash的储存地址</span>
<span class="line">  movs r3, #0</span>
<span class="line">  b LoopCopyDataInit</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code> bl SystemInit</code>：执行SystemInit函数，该函数的作用不在讨论内容中。</p><p><code>ldr r0, =</code>_sdata ...：加载数据段先关的地址到寄存器，同时设置r3寄存器的值为0。</p><p><code>b LoopCopyDataInit</code>:执行LoopCopyDataInit。</p><h4 id="初始化-data" tabindex="-1"><a class="header-anchor" href="#初始化-data"><span>初始化.data</span></a></h4><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">CopyDataInit:</span>
<span class="line">	//将r2寄存器加上r3寄存器的值，在ROM中对应的值加载到r4寄存器中</span>
<span class="line">  ldr r4, [r2, r3]</span>
<span class="line">  //将r4寄存器的值存到，r0寄存器加r3寄存器，在ram的位置</span>
<span class="line">  str r4, [r0, r3]</span>
<span class="line">  adds r3, r3, #4</span>
<span class="line"></span>
<span class="line">LoopCopyDataInit:</span>
<span class="line">	//r4等于_sdata地址加 r3 </span>
<span class="line">  adds r4, r0, r3</span>
<span class="line">  //比较r4寄存器和_edata的地址，并设置C标志位</span>
<span class="line">  cmp r4, r1</span>
<span class="line">  //C标志位为0就执行</span>
<span class="line">  bcc CopyDataInit</span>
<span class="line">  </span>
<span class="line">/* Zero fill the bss segment. */</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的作用是初始化.data段的值。</p><p><code>LoopCopyDataInit</code>函数相当于一个for循环，在r4寄存器的值小于_edata时，执行<code>CopyDataInit</code>函数。大于等于就执行<code>/* Zero fill the bss segment. */</code>后面的代码。</p><p><code>CopyDataInit</code>函数的作用是将 flash 的值加载到 ram 中。</p><h4 id="初始化-bss" tabindex="-1"><a class="header-anchor" href="#初始化-bss"><span>初始化.bss</span></a></h4><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">/* Zero fill the bss segment. */</span>
<span class="line">	//加载bss段的开始地址到r2</span>
<span class="line">  ldr r2, =_sbss</span>
<span class="line">  //加载bss段的开始地址到r4</span>
<span class="line">  ldr r4, =_ebss</span>
<span class="line">  //设置r3寄存器的值</span>
<span class="line">  movs r3, #0</span>
<span class="line">  b LoopFillZerobss</span>
<span class="line"></span>
<span class="line">FillZerobss:</span>
<span class="line">	//将r3寄存器(0)，存到r2寄存器对应的ram中</span>
<span class="line">  str  r3, [r2]</span>
<span class="line">  //r2 累加 4</span>
<span class="line">  adds r2, r2, #4</span>
<span class="line"></span>
<span class="line">LoopFillZerobss:</span>
<span class="line">	//比较r3 和 r4寄存器的值</span>
<span class="line">  cmp r2, r4</span>
<span class="line">  //r2 小于 r4就执行</span>
<span class="line">  bcc FillZerobss</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码的作用是初始化.bss段的值。代码逻辑和前面一样。不一样的是bss段的值都设置为0。</p><h4 id="c-相关的初始化与调用main" tabindex="-1"><a class="header-anchor" href="#c-相关的初始化与调用main"><span>C++相关的初始化与调用main</span></a></h4><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">/* Call static constructors */</span>
<span class="line">    bl __libc_init_array</span>
<span class="line">/* Call the application&#39;s entry point.*/</span>
<span class="line">  bl main</span>
<span class="line">  bx lr</span>
<span class="line">.size Reset_Handler, .-Reset_Handler</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>bl __libc_init_array</code>:初始化C++相关的全局和静态对象。由编译器提供。</p><p><code>bl main</code>:将会执行main函数，同时设置lr寄存器。</p><p><code>bx lr</code>当执行完成main函数后，会执行这行</p><p><code>.size Reset_Handler, .-Reset_Handler</code>，<code>.size</code>计算Reset_Handler段的大小，告诉给链接文件该.text类型的段大小。</p><h3 id="default-handler" tabindex="-1"><a class="header-anchor" href="#default-handler"><span>Default_Handler</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">    .section .text.Default_Handler,&quot;ax&quot;,%progbits</span>
<span class="line">Default_Handler:</span>
<span class="line">Infinite_Loop:</span>
<span class="line">  b Infinite_Loop</span>
<span class="line">  .size Default_Handler, .-Default_Handler</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个代码段，<code>Default_Handler</code>，这是默认的异常处理函数，为死循环。<code>a</code>表示该段可以被分配到程序中，<code>x</code>表示该段包含可执行代码，<code>%progbits</code>是<code>.type</code>,表示该段包含有用的数据或代码。</p><h3 id="异常向量表" tabindex="-1"><a class="header-anchor" href="#异常向量表"><span>异常向量表</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">  .section .isr_vector,&quot;a&quot;,%progbits</span>
<span class="line">  .type g_pfnVectors, %object</span>
<span class="line">  .size g_pfnVectors, .-g_pfnVectors</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.section .isr_vector,&quot;a&quot;,%progbits</code>，定义<code>.isr_vector</code>段，<code>a</code>表示该段是可分配的%progbits\`表示该段含有数据或者代码。</p><p><code> .type g_pfnVectors, %object</code>，在<code>.isr_vector</code>段存储了<code>g_pfnVectors</code>,<code>%object</code>表示<code>g_pfnVectors</code>为数据对象（变量或数组。</p><p><code> .size g_pfnVectors, .-g_pfnVectors</code>计算<code>g_pfnVectors</code>的大小，计算方式是当前位置减去<code>g_pfnVectors</code>的定义位置。</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">g_pfnVectors:</span>
<span class="line"></span>
<span class="line">  .word _estack</span>
<span class="line">  .word Reset_Handler</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .word BootRAM</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义<code>g_pfnVectors</code>向量表，每个元素占用了32位的大小，向量表的第一个元素是栈顶的位置，除了最后一个元素，剩下的都是各种异常中断的函数地址。</p><p>M3、M4内核在上电后，会将向量表的第一个元素加载到SP寄存器中，然后执行向量表的第二个元素。</p><h3 id="异常handler" tabindex="-1"><a class="header-anchor" href="#异常handler"><span>异常Handler</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">  .weak NMI_Handler</span>
<span class="line">  .thumb_set NMI_Handler,Default_Handler</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .</span>
<span class="line">  .weak USBWakeUp_IRQHandler</span>
<span class="line">  .thumb_set USBWakeUp_IRQHandler,Default_Handler</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>.weak NMI_Handler</code>表示NMI_Handler是一个弱定义函数，如果在其他地方定义，则不使用此处定义的函数。</p><p><code>.thumb_set NMI_Handler,Default_Handler</code>设置<code>NMI_Handler</code>的地址为<code>Default_Handler</code>的地址。</p>`,57),d=[i];function r(c,p){return n(),e("div",null,d)}const v=s(l,[["render",r],["__file","qidongwenjianxiangjie.html.vue"]]),b=JSON.parse('{"path":"/blogs/huibian/qidongwenjianxiangjie.html","title":"启动文件详解","lang":"en-US","frontmatter":{"title":"启动文件详解","date":"2024/7/14","tags":["cortex-m3"],"categories":["stm32"]},"headers":[{"level":3,"title":"简略文件","slug":"简略文件","link":"#简略文件","children":[]},{"level":3,"title":"文件头","slug":"文件头","link":"#文件头","children":[]},{"level":3,"title":"使用的变量","slug":"使用的变量","link":"#使用的变量","children":[]},{"level":3,"title":"Reset_Handler的定义","slug":"reset-handler的定义","link":"#reset-handler的定义","children":[]},{"level":3,"title":"Default_Handler","slug":"default-handler","link":"#default-handler","children":[]},{"level":3,"title":"异常向量表","slug":"异常向量表","link":"#异常向量表","children":[]},{"level":3,"title":"异常Handler","slug":"异常handler","link":"#异常handler","children":[]}],"git":{},"filePathRelative":"blogs/汇编/启动文件详解.md"}');export{v as comp,b as data};
