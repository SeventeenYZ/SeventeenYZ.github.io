import{_ as a,c as e,o as s,a as t}from"./app.b1167376.js";const n="/assets/5018f42ab810250517a39554b5eebb0.5facce0d.jpg",C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Vuex","slug":"vuex","link":"#vuex","children":[{"level":3,"title":"mapState和mapGetters","slug":"mapstate和mapgetters","link":"#mapstate和mapgetters","children":[]}]},{"level":2,"title":"React Redux","slug":"react-redux","link":"#react-redux","children":[]}],"relativePath":"Framework/Store.md"}'),p={name:"Framework/Store.md"},l=t(`<p>如非必要，不要用状态管理库，例如用redux只存了两部分数据userInfo和listData，而且两种数据都不需要修改，单纯只需要有个地方存储用，不如换成useContext（存储userInfo），SWR（自动缓存列表数据）</p><p>SWR：提供了自动重新验证数据是否更新的功能，不用去手动加载新数据</p><h2 id="vuex" tabindex="-1">Vuex <a class="header-anchor" href="#vuex" aria-hidden="true">#</a></h2><p><a href="https://vuex.vuejs.org/zh/guide/" target="_blank" rel="noreferrer">官网</a></p><p><a href="https://pinia.web3doc.top/" target="_blank" rel="noreferrer">Pinia</a></p><h3 id="mapstate和mapgetters" tabindex="-1">mapState和mapGetters <a class="header-anchor" href="#mapstate和mapgetters" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapState</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">supplier</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">state</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> state</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">fallback</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">supplier</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">mapGetters</span><span style="color:#A6ACCD;">([</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">supplier</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// supplier只在state里有，没有getter照样可以引进来</span></span>
<span class="line"><span style="color:#A6ACCD;">])</span></span>
<span class="line"></span></code></pre></div><h2 id="react-redux" tabindex="-1">React Redux <a class="header-anchor" href="#react-redux" aria-hidden="true">#</a></h2><p><a href="https://taro-docs.jd.com/taro/docs/redux/" target="_blank" rel="noreferrer">参考资料</a></p><p><img src="`+n+'" alt="图片加载失败"></p>',10),r=[l];function o(c,i,d,u,A,h){return s(),e("div",null,r)}const y=a(p,[["render",o]]);export{C as __pageData,y as default};