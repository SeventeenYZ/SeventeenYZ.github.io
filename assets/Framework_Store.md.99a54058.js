import{_ as s,c as a,o as n,a as l}from"./app.b1167376.js";const p="/assets/5018f42ab810250517a39554b5eebb0.5facce0d.jpg",d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Vuex","slug":"vuex","link":"#vuex","children":[{"level":3,"title":"mapState和mapGetters","slug":"mapstate和mapgetters","link":"#mapstate和mapgetters","children":[]}]},{"level":2,"title":"React Redux","slug":"react-redux","link":"#react-redux","children":[]},{"level":2,"title":"useQuery","slug":"usequery","link":"#usequery","children":[{"level":3,"title":"常规获取远程数据hook","slug":"常规获取远程数据hook","link":"#常规获取远程数据hook","children":[]},{"level":3,"title":"缓存功能hook","slug":"缓存功能hook","link":"#缓存功能hook","children":[]}]},{"level":2,"title":"使用useContext存储用户信息","slug":"使用usecontext存储用户信息","link":"#使用usecontext存储用户信息","children":[]}],"relativePath":"Framework/Store.md"}'),o={name:"Framework/Store.md"},e=l(`<p>如非必要，不要用状态管理库，例如用redux只存了两部分数据userInfo和listData，而且两种数据都不需要修改，单纯只需要有个地方存储用，不如换成useContext（存储userInfo），SWR（自动缓存列表数据）</p><p>不同于列表数据，用户信息在一个访问周期内只会调用一次</p><p>SWR：提供了自动重新验证数据是否更新的功能，不用去手动加载新数据</p><h2 id="vuex" tabindex="-1">Vuex <a class="header-anchor" href="#vuex" aria-hidden="true">#</a></h2><p><a href="https://vuex.vuejs.org/zh/guide/" target="_blank" rel="noreferrer">官网</a></p><p><a href="https://pinia.web3doc.top/" target="_blank" rel="noreferrer">Pinia</a></p><h3 id="mapstate和mapgetters" tabindex="-1">mapState和mapGetters <a class="header-anchor" href="#mapstate和mapgetters" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">supplier</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">fallback</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">supplier</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapGetters</span><span style="color:#A6ACCD;">([</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">supplier</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// supplier只在state里有，没有getter照样可以引进来</span></span>
<span class="line"><span style="color:#A6ACCD;">])</span></span>
<span class="line"></span></code></pre></div><h2 id="react-redux" tabindex="-1">React Redux <a class="header-anchor" href="#react-redux" aria-hidden="true">#</a></h2><p><a href="https://taro-docs.jd.com/taro/docs/redux/" target="_blank" rel="noreferrer">参考资料</a></p><p><img src="`+p+`" alt="图片加载失败"></p><h2 id="usequery" tabindex="-1">useQuery <a class="header-anchor" href="#usequery" aria-hidden="true">#</a></h2><p>大概原理是维护一个缓存cachedMap</p><p>监听事件触发useQuery</p><p>比较key，key相同则从缓存中取出<code>const data = cachedMap.get(key)</code>，不存在则获取，而后存入缓存</p><h3 id="常规获取远程数据hook" tabindex="-1">常规获取远程数据hook <a class="header-anchor" href="#常规获取远程数据hook" aria-hidden="true">#</a></h3><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useAsyncFunction </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">asyncFunc</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">state</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">setState</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">useEffect</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">asyncFunc</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">setState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> err</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">err</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">setState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> data</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">undefined,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">err</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">asyncFunc</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">state</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> MyComponent </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useAsyncFunction</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">fetchALLGames</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="缓存功能hook" tabindex="-1">缓存功能hook <a class="header-anchor" href="#缓存功能hook" aria-hidden="true">#</a></h3><p>添加缓存</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> cache </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Map</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> useAsyncFunction </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">asyncFunc</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">setErr</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">undefined</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">useEffect</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">asyncFunc</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#A6ACCD;">cache</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        	</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">err</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">setErr</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> asyncFunc</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> cache</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> err</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><p>允许mutate来更新缓存中的数据</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> mutate </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useCallback</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">void</span><span style="color:#A6ACCD;"> cache</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#A6ACCD;">(key</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> data)</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [key])</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> err</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> data </span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">mutate </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>为了提供重新加载功能，把加载的实现提取出来</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> load </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useCallback</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">asyncFunc</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    	</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">then</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        	</span><span style="color:#82AAFF;">mutate</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// 调用mutate代替cache.set</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">cache</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">key</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">catch</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">err</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">setErr</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">err</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">useEffect</span><span style="color:#A6ACCD;">(load</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> load) </span><span style="color:#676E95;font-style:italic;">// 仅当组件挂载或props变化时执行</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> err</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> mutate</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">reload</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> load </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>参考资料：<a href="https://juliangaramendy.dev/blog/how-swr-works" target="_blank" rel="noreferrer">https://juliangaramendy.dev/blog/how-swr-works</a></p><h2 id="使用usecontext存储用户信息" tabindex="-1">使用useContext存储用户信息 <a class="header-anchor" href="#使用usecontext存储用户信息" aria-hidden="true">#</a></h2><p>背景：用户信息是调用接口返回的，在有多个入口页的情况下（如点击链接直接进入某某页），入口页之间切换都要调用一遍，选择集中在入口组件<code>app.tsx</code>中调用</p><p>由于是全局状态且不支持修改，不考虑放在状态管理库中，用<code>useContext</code>即可</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> UserContext </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createContext</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> App </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">userInfo</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">setUserInfo</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useState</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">getUserInfo</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">async</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">err</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">]</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">GET_USERINFO</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// ... 判断有无权限，token等</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">useEffect</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">getUserInfo</span><span style="color:#F07178;">() </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> [])</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">UserContext.Provider</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">value</span><span style="color:#89DDFF;">={</span><span style="color:#A6ACCD;">userInfo</span><span style="color:#89DDFF;">}&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#FFCB6B;">UserContext.Provider</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 入口页</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> MyPage </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">userInfo</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">useContext</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">UserContext</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">useEffect</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">userInfo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">userInfo</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,30),t=[e];function c(r,y,F,D,A,C){return n(),a("div",null,t)}const u=s(o,[["render",c]]);export{d as __pageData,u as default};
