import{_ as s,o as e,c as a,a as n}from"./app-Pv2J7xBQ.js";const l={},i=n(`<h2 id="数据传输指令" tabindex="-1"><a class="header-anchor" href="#数据传输指令"><span>数据传输指令</span></a></h2><p>包括mov、LDR、STR</p><h3 id="mov" tabindex="-1"><a class="header-anchor" href="#mov"><span>mov</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//将常数加载到R0寄存器中，R0 = 10</span>
<span class="line">mov R0, #10 </span>
<span class="line"></span>
<span class="line">//将R2的值放到R0寄存器中</span>
<span class="line">mov R0 , R2 </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mvn-move-not" tabindex="-1"><a class="header-anchor" href="#mvn-move-not"><span>mvn(move not)</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//将常数按照位取反存到寄存器，R0 = 10</span>
<span class="line">mvn R0, #7 = 0111(b)</span>
<span class="line">R0 = 0xFFFFFFF8</span>
<span class="line"></span>
<span class="line">//mov R0 ,#-8 编译器会编译成 mvn R0 ,#7，因为-8的补码等于7的反码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ldr-load-register" tabindex="-1"><a class="header-anchor" href="#ldr-load-register"><span>LDR(load register)</span></a></h3><p>ldr用于加载数据到寄存器，可以加载内存值、常数值、寄存器值等。ldr通常是加载32位，ldr.w用于加载32，ldrh加载半字16位，ldrb加载字节8位</p><p>现在有两个寄存器：R0 和 R1。地址0x200002d0和值0x12345678,地址0x200002d4和值0x87654321。</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//加载常数 需要注意的是这是一条伪指令，编译器会将优化成MOV指令，再将常数赋值给寄存器</span>
<span class="line">//将常数0x12341234加载到R0寄存器中，R0 = 0x12345678</span>
<span class="line">ldr R0, = 0x200002d0</span>
<span class="line"></span>
<span class="line">//从内存地址加载数据</span>
<span class="line">//将地址0x200002d4和加载到R1寄存器中</span>
<span class="line">ldr R1 ,= 0x200002d4</span>
<span class="line">//将R1地址所对应的值，加载到R0寄存器中，R1值不变，R0 = 0x87654321</span>
<span class="line">ldr R0 ,[R1] </span>
<span class="line"></span>
<span class="line">//带偏移的加载</span>
<span class="line">//将地址0x200002d0加载到R0寄存器中</span>
<span class="line">ldr R0 ,= 0x2000000</span>
<span class="line">//将R0加上4字节(32位)(0x200002d4)内存对应的值，加载到R1寄存器,R1 = 0x87654321</span>
<span class="line">ldr R1,[R0 #4]    </span>
<span class="line"></span>
<span class="line">//后递增加载</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">//将R0的地址对应的值加载到R1中，然后将R0的值加4(更新R0=R0 + 4)，R1 = 0x12345678, R0 = 0x200002d4</span>
<span class="line">ldr R1,[R0],#4</span>
<span class="line"></span>
<span class="line">//带寄存器偏移量的加载。</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">//将值0x0004加载到R2寄存器中</span>
<span class="line">ldr R2 ,= 0x0004</span>
<span class="line">//从地址(R0+R2)处的数据加载到R1中，R1 = 0x87654321</span>
<span class="line">Ldr R1,[R0,R2]</span>
<span class="line"></span>
<span class="line">//预递增加载</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">//将R0地址加上4的地址处的值赋值给R1,R1 = 0x87654321。同时更新R0，R0 = R0 +4.!符号表示更新基址寄存器</span>
<span class="line">ldr R1 , [R0,#4]!  </span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="str-store-register" tabindex="-1"><a class="header-anchor" href="#str-store-register"><span>STR(store register)</span></a></h3><p>str用于存储寄存器数据到内存中。str通常是加载32位，str.w用于明确加载32，strh加载半字16位，strb加载字节8位。</p><p>现在有两个寄存器：R0 和 R1。地址0x200002d0和值0x12345678,地址0x200002d4和值0x87654321。</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//基本存储</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">ldr R1 ,= 0x0000</span>
<span class="line">//将R1寄存器所对应的数据，储存到R0寄存器所对应的内存。地址0x200002d0的值0x0000。</span>
<span class="line">str R1 , [R0]       </span>
<span class="line"></span>
<span class="line">//带有偏移的存储</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">ldr R1 ,= 0xFFFF</span>
<span class="line">//将R1的值保存到R0+4地址对应的位置</span>
<span class="line">str R1 , [R0,#4]</span>
<span class="line"></span>
<span class="line">//自动递增的存储</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">ldr R1 ,= 0xFFFF</span>
<span class="line">//将R1的值保存到R0+4地址对应的位置,并且R0的值更新为R0 +4</span>
<span class="line">str R1 , [R0,#4]!</span>
<span class="line"></span>
<span class="line">//带有寄存器偏移量的存储</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">ldr R1 ,= 0xFFFF</span>
<span class="line">ldr R2 ,= 0x04</span>
<span class="line">//将R1的值保存到R0+R2地址对应的位置</span>
<span class="line">str R1 , [R0 , R2]</span>
<span class="line"></span>
<span class="line">//后递增的储存</span>
<span class="line">ldr R0 ,= 0x200002d0</span>
<span class="line">ldr R1 ,= 0xFFFF</span>
<span class="line">#4 //将R1的值储存到R0寄存器对应的地址,并更新R0 = R0 + 4</span>
<span class="line">str R1 , [R0] </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="算数指令" tabindex="-1"><a class="header-anchor" href="#算数指令"><span>算数指令</span></a></h2><h3 id="add" tabindex="-1"><a class="header-anchor" href="#add"><span>add</span></a></h3><p>主要用于将两个数相加，并将结果存储在目标寄存器中</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//两个寄存器相加</span>
<span class="line">mov R0, 0x10</span>
<span class="line">mov R1, #5</span>
<span class="line">//将R1和R0的值相加,并将结果存储在R0,R0 = 0x15</span>
<span class="line">add R0, R1, R0  </span>
<span class="line"></span>
<span class="line">//寄存器和数相加：</span>
<span class="line">//将R1的值和3相加，并将结果存储在R0,R0 = 8</span>
<span class="line">add R0, R1, #3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sub" tabindex="-1"><a class="header-anchor" href="#sub"><span>sub</span></a></h3><p>用于两个数相减</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//两个寄存器相减</span>
<span class="line">mov R0, #5</span>
<span class="line">mov R1, #10</span>
<span class="line">//将R1减去R0,并将结果存储在R0,R0 = 5</span>
<span class="line">sub R0, R1, R0  </span>
<span class="line"></span>
<span class="line">//寄存器和数相减：</span>
<span class="line">//将R1的值减去3，并将结果存储在R0,R0 = 7</span>
<span class="line">sub R0, R1, #3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mul" tabindex="-1"><a class="header-anchor" href="#mul"><span>mul</span></a></h3><p>两个数相乘</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//两个寄存器相乘</span>
<span class="line">mov R0, #5</span>
<span class="line">mov R1, #10</span>
<span class="line">//将R1乘R0,并将结果存储在R0,R0 = 50</span>
<span class="line">mul R0, R1, R0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="位操作指令" tabindex="-1"><a class="header-anchor" href="#位操作指令"><span>位操作指令</span></a></h2><h3 id="and" tabindex="-1"><a class="header-anchor" href="#and"><span>and</span></a></h3><p>按位与 对应c语言的&amp;</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mov R1 ,0xFF00</span>
<span class="line">mov R2 ,0x00FF</span>
<span class="line"></span>
<span class="line">//将R1和R2进行按位与 并且将结果储存到R1中</span>
<span class="line">and R1, R1, R2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="orr" tabindex="-1"><a class="header-anchor" href="#orr"><span>orr</span></a></h3><p>按位或，对应c语言的 |</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mov R1 ,0xFF00</span>
<span class="line">mov R2 ,0x00FF</span>
<span class="line"></span>
<span class="line">//将R1和R2进行按位或 并且将结果储存到R1中</span>
<span class="line">orr R1, R1, R2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="eor" tabindex="-1"><a class="header-anchor" href="#eor"><span>eor</span></a></h3><p>按位亦或，对应c语言的^</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mov R1 ,0x0FF0</span>
<span class="line">mov R2 ,0x00FF</span>
<span class="line"></span>
<span class="line">//将R1和R2进行按位或 并且将结果储存到R0中</span>
<span class="line">eor R0, R1, R2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lsr" tabindex="-1"><a class="header-anchor" href="#lsr"><span>lsr</span></a></h3><p>逻辑右移,对应c语言的&gt;&gt;</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mov R0 ,0xFF00</span>
<span class="line"></span>
<span class="line">//将R0寄存器的值向右移动8位，高位用0补齐，结果存在R1</span>
<span class="line">lsr R1, R0, #8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lsl" tabindex="-1"><a class="header-anchor" href="#lsl"><span>lsl</span></a></h3><p>逻辑左移，对应c语言的&lt;&lt;</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mov R0, 0x00FF</span>
<span class="line"></span>
<span class="line">//将R0寄存器的值向左移动8位，高位用0补齐，结果存在R1 = 0xFF00</span>
<span class="line">lsr R1, R0, #8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="asr" tabindex="-1"><a class="header-anchor" href="#asr"><span>asr</span></a></h3><p>算数右移，符号位（最高位）保持不变。对左数，右侧填充0；对于负数，左侧填充1（因为符号位是1）</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//证书</span>
<span class="line">mov R0, 0x00FF</span>
<span class="line">//将R0向右算数位移8位，结果存在 R1 = 0xff</span>
<span class="line">asr R1, R0, #8 //编译器编译后 mov.w R1 R0 asr #8</span>
<span class="line"></span>
<span class="line">//负数</span>
<span class="line">mov R0 ,#-8</span>
<span class="line"></span>
<span class="line">//将R0向右算数位移8位，结果存在 R1</span>
<span class="line">asr R1, R0, #8 //编译器编译后 mov.w R1 R0 asr #8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bic" tabindex="-1"><a class="header-anchor" href="#bic"><span>bic</span></a></h3><p>清除寄存器中的特定位</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">BIC R0, R0, #0xF//将R0寄存器的低4位设置为0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="标志" tabindex="-1"><a class="header-anchor" href="#标志"><span>标志</span></a></h2><p>在状态寄存器xpsr中的一组位，用于控制程序的流程</p><table><thead><tr><th style="text-align:left;">BIT位</th><th>标志</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:left;">31</td><td>N(negative)</td><td style="text-align:left;">负数标志(Negative)</td></tr><tr><td style="text-align:left;">30</td><td>Z(zore)</td><td style="text-align:left;">零结果标志(Zero)</td></tr><tr><td style="text-align:left;">29</td><td>c(carry)</td><td style="text-align:left;">进位/借位标志(Carry)</td></tr><tr><td style="text-align:left;">28</td><td>V(overflow)</td><td style="text-align:left;">溢出标志(oVerflow)</td></tr></tbody></table><p>c(carry)标志，用于无符号数据的处理，最常见用于加减法时借位，发生借位时，c会被设置为0</p><p>V(overflow)，用于带符号的数据处理</p><p>两个</p><h3 id="条件码" tabindex="-1"><a class="header-anchor" href="#条件码"><span>条件码</span></a></h3><p>在汇编指令后面添加条件码(s)，即可设置标志，可以在特定条件下执行</p><table><thead><tr><th style="text-align:left;">条件码</th><th style="text-align:left;">解释</th></tr></thead><tbody><tr><td style="text-align:left;">条件码</td><td style="text-align:left;">解释</td></tr><tr><td style="text-align:left;">EQ（Equal）（Z == 1)</td><td style="text-align:left;">相等</td></tr><tr><td style="text-align:left;">NE (Not Equal) (Z == 0)</td><td style="text-align:left;">不相等</td></tr><tr><td style="text-align:left;">GT (Greater Than)</td><td style="text-align:left;">大于</td></tr><tr><td style="text-align:left;">LE (Less Than)</td><td style="text-align:left;">小于</td></tr><tr><td style="text-align:left;">GE (Greater or Equal)</td><td style="text-align:left;">大于等于</td></tr><tr><td style="text-align:left;">LE (Less or Equal)</td><td style="text-align:left;">小于等于</td></tr></tbody></table><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">movs R0,R1(设置N和Z)</span>
<span class="line">cbz label //r0为0则跳转</span>
<span class="line"></span>
<span class="line">cmp R0, R1 /设置标志</span>
<span class="line">beq label0 //相等则跳转</span>
<span class="line">bgt label1 //r0 大于等于 R1则跳转</span>
<span class="line">ble</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="位转移指令" tabindex="-1"><a class="header-anchor" href="#位转移指令"><span>位转移指令</span></a></h2><p>跳转到label对应的代码，label可能是某个函数的第多少行，编译器会处理。</p><h3 id="b" tabindex="-1"><a class="header-anchor" href="#b"><span>b</span></a></h3><p>无条件跳转，将要跳转的地址写入到PC寄存器中，多用于循环中跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">b label//直接跳转</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="cbz" tabindex="-1"><a class="header-anchor" href="#cbz"><span>cbz</span></a></h3><p>R0寄存器的值为 0 就跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mov R0, 0x00</span>
<span class="line">//R0的值为0，跳转执行label处的指令</span>
<span class="line">cbz R0, label</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cbnz" tabindex="-1"><a class="header-anchor" href="#cbnz"><span>cbnz</span></a></h3><p>R0寄存器的值不为 0 就跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mov R0, 0xFF</span>
<span class="line">//R0的值不为0，跳转执行0x800001fe处的指令</span>
<span class="line">cbnz R0, label</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="beq-equal" tabindex="-1"><a class="header-anchor" href="#beq-equal"><span>beq (equal)</span></a></h3><p>条件码eq，相等则跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">cmp R1, R2//比较R1和R2的值</span>
<span class="line">beq label 如果R1等于R2那么就跳转</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ble-less-or-equal" tabindex="-1"><a class="header-anchor" href="#ble-less-or-equal"><span>ble(less or equal)</span></a></h3><p>条件码le 小于或者等于则跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">cmp R1, R2//比较R1和R2的值</span>
<span class="line">ble label 如果R1小于等于R2那么就跳转</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bne-not-equal" tabindex="-1"><a class="header-anchor" href="#bne-not-equal"><span>bne (not equal)</span></a></h3><p>条件码ne, 不相等则跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">cmp R1, R2//比较R1和R2的值</span>
<span class="line">bne label 如果R1不等于R2那么就跳转</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bge-great-or-equal" tabindex="-1"><a class="header-anchor" href="#bge-great-or-equal"><span>bge(great or equal)</span></a></h3><p>条件码 ge 大于或者等于则跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">cmp R1, R2//比较R1和R2的值</span>
<span class="line">blg label 如果R1大于等于R2那么就跳转</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="bcc" tabindex="-1"><a class="header-anchor" href="#bcc"><span>bcc</span></a></h3><p>无进位时跳转，Branch if Carry Clear，判断的是xpsr寄存器中的C标志位(c == 0)</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">  cmp r2, r4  		//比较r2 和 r4 ，并设置标志位 </span>
<span class="line">  bcc FillZerobss	//cmp结果未设置C标志位则跳转</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>cmp r2 - r4</code> 实际是<code>subs r2 - r4</code>,但是并不会将结果设置到r2寄存器，而是设置标志位，当<code>r2 &lt; r4</code>时，会产生借位</p><h3 id="bl" tabindex="-1"><a class="header-anchor" href="#bl"><span>bl</span></a></h3><p>跳转分支,将返回地址(这条指令地址 + 4)保存到Lr寄存器中，然后再跳转(往PC寄存器写值)</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">bl label</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="bx" tabindex="-1"><a class="header-anchor" href="#bx"><span>bx</span></a></h3><p>常用于返回调用点，带状态切换的跳转</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">bl test1//跳转到test1</span>
<span class="line">//do something test调用完成后会继续执行</span>
<span class="line"></span>
<span class="line">test :</span>
<span class="line">//do something</span>
<span class="line">bx lr//返回到调用程序</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="栈指令" tabindex="-1"><a class="header-anchor" href="#栈指令"><span>栈指令</span></a></h2><h3 id="push" tabindex="-1"><a class="header-anchor" href="#push"><span>push</span></a></h3><p>把若干寄存器压入到栈中</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">PUSH {R0,R1,R2,LR} //将R0,R1,R2,LR寄存器入栈</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="pop" tabindex="-1"><a class="header-anchor" href="#pop"><span>pop</span></a></h3><p>从堆栈中弹出若干的寄存器的值</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">POP {R0,R1,R2,PC} //将R0,R1,R2,LR寄存器的值从栈中读出</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="其他指令" tabindex="-1"><a class="header-anchor" href="#其他指令"><span>其他指令</span></a></h2><h3 id="n和-w" tabindex="-1"><a class="header-anchor" href="#n和-w"><span>.n和.w</span></a></h3><h3 id="cmp" tabindex="-1"><a class="header-anchor" href="#cmp"><span>cmp</span></a></h3><p>比较两个寄存器值 ，并且存到xpsr寄存器的标志位，实际执行的是subs指令</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">cmp R0, R1//等于subs r0 , R1 但不将结果存在R0 寄存器</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="nop" tabindex="-1"><a class="header-anchor" href="#nop"><span>nop</span></a></h3><p>不执行任何有意义的计算或数据操作，只是简单地消耗一个指令周期</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">nop</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="mla" tabindex="-1"><a class="header-anchor" href="#mla"><span>mla</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//计算两个寄存器的乘积，并将结果加上另一个寄存器的值，最后存储到目标寄存器中</span>
<span class="line">mov R0, #5</span>
<span class="line">mov R1, #10</span>
<span class="line">mov R2, #3</span>
<span class="line">MLA R0, R0, R1, R2 //R0乘上R1并加上R2，将值存在R0，R0 = 53</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="umull" tabindex="-1"><a class="header-anchor" href="#umull"><span>umull</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//无符号长整数乘法</span>
<span class="line">mov R0, 0xFFFFFFFF</span>
<span class="line">mov R1, 0xEEEEEEEE</span>
<span class="line"></span>
<span class="line">UMULL R2, R3, R0, R1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="umlal" tabindex="-1"><a class="header-anchor" href="#umlal"><span>umlal</span></a></h3><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">//无符号长整数乘加</span>
<span class="line">mov R0, 0xFFFFFFFF</span>
<span class="line">mov R1, 0xEEEEEEEE</span>
<span class="line">mov R2, 0x00000001</span>
<span class="line">mov R3, 0x00000003</span>
<span class="line"></span>
<span class="line">//R2将存储R0和R1乘积的低32位与R2的原始值相加的结果。</span>
<span class="line">//R3将存储R0和R1乘积的高32位与R3的原始值相加的结果。</span>
<span class="line">UMULL R2, R3, R0, R1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cpsid" tabindex="-1"><a class="header-anchor" href="#cpsid"><span>cpsid</span></a></h3><p>用于关闭中断</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">cpsid i//关闭中断</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="cpsie" tabindex="-1"><a class="header-anchor" href="#cpsie"><span>cpsie</span></a></h3><p>用于启用中断</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">cpsie i</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="mrs" tabindex="-1"><a class="header-anchor" href="#mrs"><span>mrs</span></a></h3><p>用于将一个特殊寄存器的值移动到通用寄存器中</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">mrs R0, MSP//将msp寄存器的值读取到R0寄存器中</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="msr" tabindex="-1"><a class="header-anchor" href="#msr"><span>msr</span></a></h3><p>将普通寄存器的值移动到特殊寄存器中</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">msr psp, r0 //将R0寄存器的值移动到psp寄存器中</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="ldmia" tabindex="-1"><a class="header-anchor" href="#ldmia"><span>ldmia</span></a></h3><p>多寄存器加载指令，从连续的内存地址中，恢复寄存器的值</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">Ldr R4, 0x20002a4	//加载基地址到R4寄存器中</span>
<span class="line">ldmia R4, {R0, R1, R2, R3} //从R4寄存器读取4个字(32位)的数据到R0 - R3 寄存器中</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ite-it-then" tabindex="-1"><a class="header-anchor" href="#ite-it-then"><span>ITE(IT-THEN)</span></a></h3><p>对应c语言的if else,对应的形式可以是<code>IT&lt;x&gt;</code>、<code>IT&lt;x&gt;&lt;y&gt;</code>、<code>IT&lt;x&gt;&lt;y&gt;&lt;z&gt;</code></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">mov R1, #1</span>
<span class="line">mov R2, #2</span>
<span class="line"></span>
<span class="line">ittee eq//如果R1 和 R2 相等</span>
<span class="line">//两条eq</span>
<span class="line">moveq  r1 ,#3</span>
<span class="line">moveq  r1 ,#4</span>
<span class="line"></span>
<span class="line">//两条不相等 ne</span>
<span class="line">movne r1, #4</span>
<span class="line">movne r1, #5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="uxtb" tabindex="-1"><a class="header-anchor" href="#uxtb"><span>uxtb</span></a></h3><p>无符号扩展一个字节到 32 位,对应c语言的unsiged char 扩展到 unsiged int</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">uxth R0, R0 //将R0扩展成32位</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="uxth" tabindex="-1"><a class="header-anchor" href="#uxth"><span>uxth</span></a></h3><p>无符号扩展一个半字到 32 位,,对应c语言的unsiged short 扩展到 unsiged int</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">uxth R0, R0 //将R0扩展成32位</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="sxtb" tabindex="-1"><a class="header-anchor" href="#sxtb"><span>sxtb</span></a></h3><p>有符号扩展一个字节到 32 位,对应c语言的char 扩展到int</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">uxth R0, R0 //将R0扩展成32位</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="sxth" tabindex="-1"><a class="header-anchor" href="#sxth"><span>sxth</span></a></h3><p>有符号扩展一个半字到 32 位,,对应c语言的short 扩展到int</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">uxth R0, R0 //将R0扩展成32位</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="clz" tabindex="-1"><a class="header-anchor" href="#clz"><span>clz</span></a></h3><p>计算前导零的数量，用于计算寄存器中的最高有效位</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">MOV R2, #0x0F00   ; 将十六进制数 0x0F00 装载到 R2</span>
<span class="line">CLZ R3, R2         ; 计算 R2 中前导零的数量并将结果存入 R3,r3 = 8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="内嵌汇编" tabindex="-1"><a class="header-anchor" href="#内嵌汇编"><span>内嵌汇编</span></a></h2><p><code>__asm__ __volatile__(&quot;汇编代码&quot;:输出:输入:&quot;破坏的寄存器&quot;)</code></p><p>汇编代码：这个是实际的汇编指令，比如MOV R2, #0x0F00</p><p>输出：这个是描述汇编代码中的输出操作，描述一个输出操作的类型和位置</p><p>输入：描述了一个输入操作的类型和位置</p><p>破坏的寄存器：在汇编代码中可能被修改的寄存器，表示汇编可能会修改寄存器的值，用于通知编译器</p><div class="language-assembly line-numbers-mode" data-highlighter="prismjs" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code><span class="line">int a = 10;</span>
<span class="line">int b = 5;</span>
<span class="line">int result;</span>
<span class="line"></span>
<span class="line">__asm__ __volatile__ (</span>
<span class="line">    &quot;add %0, %1, %2\\n&quot;</span>
<span class="line">    : &quot;=r&quot; (result)       // 输出操作，%0 表示 result</span>
<span class="line">    : &quot;r&quot; (a), &quot;r&quot; (b)    // 输入操作，%1 表示 a，%2 表示 b</span>
<span class="line">    : &quot;memory&quot;            // 破坏的寄存器（可选）</span>
<span class="line">);</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code>&quot;=r&quot;</code>,表示将结果保存在一个寄存器中，<code>(result)</code>表示该寄存器对应C变量<code>result</code>，<code>&quot;r&quot;</code>表示输入的变量存储在寄存器中，<code>&quot;memory&quot;</code> 表示汇编代码可能会修改内存中的内容，因此编译器不能依赖内存中的值保持不变。</p><p><code>&quot;r&quot;</code>是汇编中的约束，表示变量和寄存器之间的关系，有以下的常见约束：</p><p><code>&quot;r&quot;</code>：使用任何寄存器。</p><p><code>&quot;m&quot;</code>：使用内存操作数。</p><p><code>&quot;i&quot;</code>：立即数（常量）。</p><p><code>&quot;g&quot;</code>：通用操作数，表示可以是寄存器、内存或立即数。</p>`,156),d=[i];function r(t,c){return e(),a("div",null,d)}const m=s(l,[["render",r],["__file","huibianzhiling.html.vue"]]),v=JSON.parse('{"path":"/blogs/huibian/huibianzhiling.html","title":"汇编指令","lang":"en-US","frontmatter":{"title":"汇编指令","date":"2024/4/29","tags":["汇编"],"categories":["stm32"]},"headers":[{"level":2,"title":"数据传输指令","slug":"数据传输指令","link":"#数据传输指令","children":[{"level":3,"title":"mov","slug":"mov","link":"#mov","children":[]},{"level":3,"title":"mvn(move not)","slug":"mvn-move-not","link":"#mvn-move-not","children":[]},{"level":3,"title":"LDR(load register)","slug":"ldr-load-register","link":"#ldr-load-register","children":[]},{"level":3,"title":"STR(store register)","slug":"str-store-register","link":"#str-store-register","children":[]}]},{"level":2,"title":"算数指令","slug":"算数指令","link":"#算数指令","children":[{"level":3,"title":"add","slug":"add","link":"#add","children":[]},{"level":3,"title":"sub","slug":"sub","link":"#sub","children":[]},{"level":3,"title":"mul","slug":"mul","link":"#mul","children":[]}]},{"level":2,"title":"位操作指令","slug":"位操作指令","link":"#位操作指令","children":[{"level":3,"title":"and","slug":"and","link":"#and","children":[]},{"level":3,"title":"orr","slug":"orr","link":"#orr","children":[]},{"level":3,"title":"eor","slug":"eor","link":"#eor","children":[]},{"level":3,"title":"lsr","slug":"lsr","link":"#lsr","children":[]},{"level":3,"title":"lsl","slug":"lsl","link":"#lsl","children":[]},{"level":3,"title":"asr","slug":"asr","link":"#asr","children":[]},{"level":3,"title":"bic","slug":"bic","link":"#bic","children":[]}]},{"level":2,"title":"标志","slug":"标志","link":"#标志","children":[{"level":3,"title":"条件码","slug":"条件码","link":"#条件码","children":[]}]},{"level":2,"title":"位转移指令","slug":"位转移指令","link":"#位转移指令","children":[{"level":3,"title":"b","slug":"b","link":"#b","children":[]},{"level":3,"title":"cbz","slug":"cbz","link":"#cbz","children":[]},{"level":3,"title":"cbnz","slug":"cbnz","link":"#cbnz","children":[]},{"level":3,"title":"beq (equal)","slug":"beq-equal","link":"#beq-equal","children":[]},{"level":3,"title":"ble(less or equal)","slug":"ble-less-or-equal","link":"#ble-less-or-equal","children":[]},{"level":3,"title":"bne (not equal)","slug":"bne-not-equal","link":"#bne-not-equal","children":[]},{"level":3,"title":"bge(great or equal)","slug":"bge-great-or-equal","link":"#bge-great-or-equal","children":[]},{"level":3,"title":"bcc","slug":"bcc","link":"#bcc","children":[]},{"level":3,"title":"bl","slug":"bl","link":"#bl","children":[]},{"level":3,"title":"bx","slug":"bx","link":"#bx","children":[]}]},{"level":2,"title":"栈指令","slug":"栈指令","link":"#栈指令","children":[{"level":3,"title":"push","slug":"push","link":"#push","children":[]},{"level":3,"title":"pop","slug":"pop","link":"#pop","children":[]}]},{"level":2,"title":"其他指令","slug":"其他指令","link":"#其他指令","children":[{"level":3,"title":".n和.w","slug":"n和-w","link":"#n和-w","children":[]},{"level":3,"title":"cmp","slug":"cmp","link":"#cmp","children":[]},{"level":3,"title":"nop","slug":"nop","link":"#nop","children":[]},{"level":3,"title":"mla","slug":"mla","link":"#mla","children":[]},{"level":3,"title":"umull","slug":"umull","link":"#umull","children":[]},{"level":3,"title":"umlal","slug":"umlal","link":"#umlal","children":[]},{"level":3,"title":"cpsid","slug":"cpsid","link":"#cpsid","children":[]},{"level":3,"title":"cpsie","slug":"cpsie","link":"#cpsie","children":[]},{"level":3,"title":"mrs","slug":"mrs","link":"#mrs","children":[]},{"level":3,"title":"msr","slug":"msr","link":"#msr","children":[]},{"level":3,"title":"ldmia","slug":"ldmia","link":"#ldmia","children":[]},{"level":3,"title":"ITE(IT-THEN)","slug":"ite-it-then","link":"#ite-it-then","children":[]},{"level":3,"title":"uxtb","slug":"uxtb","link":"#uxtb","children":[]},{"level":3,"title":"uxth","slug":"uxth","link":"#uxth","children":[]},{"level":3,"title":"sxtb","slug":"sxtb","link":"#sxtb","children":[]},{"level":3,"title":"sxth","slug":"sxth","link":"#sxth","children":[]},{"level":3,"title":"clz","slug":"clz","link":"#clz","children":[]}]},{"level":2,"title":"内嵌汇编","slug":"内嵌汇编","link":"#内嵌汇编","children":[]}],"git":{},"filePathRelative":"blogs/汇编/汇编指令.md"}');export{m as comp,v as data};
