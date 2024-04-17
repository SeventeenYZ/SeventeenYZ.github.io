import{_ as s,c as n,o as a,a as l}from"./app.f98d1513.js";const o="/assets/type-of-join.6ad484ed.png",d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Select","slug":"select","link":"#select","children":[]},{"level":2,"title":"Where","slug":"where","link":"#where","children":[]},{"level":2,"title":"And、Or、Not、In","slug":"and、or、not、in","link":"#and、or、not、in","children":[]},{"level":2,"title":"Order By","slug":"order-by","link":"#order-by","children":[]},{"level":2,"title":"Insert Into","slug":"insert-into","link":"#insert-into","children":[]},{"level":2,"title":"Null Values","slug":"null-values","link":"#null-values","children":[]},{"level":2,"title":"Update","slug":"update","link":"#update","children":[]},{"level":2,"title":"Delete","slug":"delete","link":"#delete","children":[]},{"level":2,"title":"Between","slug":"between","link":"#between","children":[]},{"level":2,"title":"Like","slug":"like","link":"#like","children":[]},{"level":2,"title":"Joins","slug":"joins","link":"#joins","children":[]},{"level":2,"title":"Union","slug":"union","link":"#union","children":[]},{"level":2,"title":"Group By","slug":"group-by","link":"#group-by","children":[]},{"level":2,"title":"Having","slug":"having","link":"#having","children":[]},{"level":2,"title":"Exists","slug":"exists","link":"#exists","children":[]},{"level":2,"title":"Any，All","slug":"any-all","link":"#any-all","children":[]},{"level":2,"title":"Select Into","slug":"select-into","link":"#select-into","children":[]},{"level":2,"title":"Insert Into Select","slug":"insert-into-select","link":"#insert-into-select","children":[]},{"level":2,"title":"Case","slug":"case","link":"#case","children":[]},{"level":2,"title":"Null Functions","slug":"null-functions","link":"#null-functions","children":[]},{"level":2,"title":"Stored Procedures","slug":"stored-procedures","link":"#stored-procedures","children":[]},{"level":2,"title":"MongoDB","slug":"mongodb","link":"#mongodb","children":[]}],"relativePath":"Tool/SQL.md"}'),e={name:"Tool/SQL.md"},p=l(`<p>语法：关键字select、create等不区分大小写，结尾必须加分号</p><h2 id="select" tabindex="-1">Select <a class="header-anchor" href="#select" aria-hidden="true">#</a></h2><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> country, city </span><span style="color:#F78C6C;">as</span><span style="color:#A6ACCD;"> cityName </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers; </span><span style="color:#676E95;font-style:italic;">-- as是别名</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers;</span></span>
<span class="line"><span style="color:#F78C6C;">select distinct</span><span style="color:#A6ACCD;"> country </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers; </span><span style="color:#676E95;font-style:italic;">-- 查询后去重</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">count</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">distinct</span><span style="color:#A6ACCD;"> country) </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers; </span><span style="color:#676E95;font-style:italic;">-- 查询去重后的数量，还有avg、sum</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">min</span><span style="color:#A6ACCD;">(price) </span><span style="color:#F78C6C;">as</span><span style="color:#A6ACCD;"> smallestPrice </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> products; </span><span style="color:#676E95;font-style:italic;">-- 查询价格最低的，同理还有max</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">top</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers; </span><span style="color:#676E95;font-style:italic;">-- 查询3条，不是所有数据库都支持，MySQL是用limit</span></span>
<span class="line"></span></code></pre></div><h2 id="where" tabindex="-1">Where <a class="header-anchor" href="#where" aria-hidden="true">#</a></h2><p>过滤records或提取特定的record</p><p>运算符：=、&gt;、&lt;、&gt;=、&lt;=、&lt;&gt;、between、like、in</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> country</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Mexico</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> customerID</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="and、or、not、in" tabindex="-1">And、Or、Not、In <a class="header-anchor" href="#and、or、not、in" aria-hidden="true">#</a></h2><p>过滤records，可和where搭配使用</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> country</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Germany</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> city</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Berlin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> city</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Berlin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">or</span><span style="color:#A6ACCD;"> city</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">München</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> country</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Germany</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> country</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Germany</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> (city</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Berlin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">or</span><span style="color:#A6ACCD;"> city</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">München</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> country</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Germany</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> coutry</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">USA</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><p>In是和where搭配来指定一些值，相当于多个or的简写</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> city </span><span style="color:#F78C6C;">in</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Berlin</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">München</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers</span></span>
<span class="line"><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> country </span><span style="color:#F78C6C;">in</span><span style="color:#A6ACCD;"> (</span><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> country </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> suppliers);</span></span>
<span class="line"></span></code></pre></div><h2 id="order-by" tabindex="-1">Order By <a class="header-anchor" href="#order-by" aria-hidden="true">#</a></h2><p>将records进行排序，默认升序</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> column1, column2, ...</span></span>
<span class="line"><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> table_name</span></span>
<span class="line"><span style="color:#F78C6C;">order by</span><span style="color:#A6ACCD;"> column1, column2, ... </span><span style="color:#F78C6C;">asc</span><span style="color:#A6ACCD;">|</span><span style="color:#F78C6C;">desc</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="insert-into" tabindex="-1">Insert Into <a class="header-anchor" href="#insert-into" aria-hidden="true">#</a></h2><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">insert into</span><span style="color:#A6ACCD;"> customers (customername, contactname, </span><span style="color:#F78C6C;">address</span><span style="color:#A6ACCD;">, city, postalcode, country) </span><span style="color:#F78C6C;">values</span><span style="color:#A6ACCD;"> (</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cardinal</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tom b. erichsen</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">skagen 21</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">stavanger</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">4006</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">, </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">norway</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"></span></code></pre></div><h2 id="null-values" tabindex="-1">Null Values <a class="header-anchor" href="#null-values" aria-hidden="true">#</a></h2><p>如果field是可选的，当没有赋值的时候，默认为null</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> customername, </span><span style="color:#F78C6C;">address</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers</span></span>
<span class="line"><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">address</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">null</span><span style="color:#A6ACCD;">; </span><span style="color:#676E95;font-style:italic;">-- 查询地址为空的</span></span>
<span class="line"></span></code></pre></div><h2 id="update" tabindex="-1">Update <a class="header-anchor" href="#update" aria-hidden="true">#</a></h2><p>搭配where使用，where指定了哪些records会被修改</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">update</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">set</span><span style="color:#A6ACCD;"> contactname </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">alfred schmidt</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">, city</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">frankfurt</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> customerID </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="delete" tabindex="-1">Delete <a class="header-anchor" href="#delete" aria-hidden="true">#</a></h2><p>也是搭配where使用，如果省略了where则是删除整个表的数据（但表还在）</p><h2 id="between" tabindex="-1">Between <a class="header-anchor" href="#between" aria-hidden="true">#</a></h2><p>指定数字、文本或日期的范围</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> products </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> Price </span><span style="color:#F78C6C;">between</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> products </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> price </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">between</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> products </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> price </span><span style="color:#F78C6C;">between</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> categoryid </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">in</span><span style="color:#A6ACCD;"> (</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">,</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">,</span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> products </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> productName </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">between</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">carnarvon tigers</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">mozzarella di giovanni</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">order by</span><span style="color:#A6ACCD;"> productName;</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> orders </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> orderDate </span><span style="color:#F78C6C;">between</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2020-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2020-12-31</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="like" tabindex="-1">Like <a class="header-anchor" href="#like" aria-hidden="true">#</a></h2><p>搭配where来查询指定格式，通配符%代表不限数量的字符，_代表一个字符（MS Access数据库则是分别用*和?代替），还有其它通配符，见https:--www.w3schools.com/sql/sql_wildcards.asp</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> customerName </span><span style="color:#F78C6C;">like</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a_%</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="joins" tabindex="-1">Joins <a class="header-anchor" href="#joins" aria-hidden="true">#</a></h2><p>基于相同的列进行连表查询</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> orders.orderID, customers.customerName, orders.orderDate</span></span>
<span class="line"><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> orders</span></span>
<span class="line"><span style="color:#F78C6C;">inner join</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">on</span><span style="color:#A6ACCD;"> orders.customerID</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">customers.customerID; </span><span style="color:#676E95;font-style:italic;">-- inner写不写都一样</span></span>
<span class="line"></span></code></pre></div><p>不同的连表查询类型</p><p><img src="`+o+`" alt="图片加载失败"></p><h2 id="union" tabindex="-1">Union <a class="header-anchor" href="#union" aria-hidden="true">#</a></h2><p>联合其它表，必须有相同的列，列的顺序也要一致，默认是过滤重复值的，如果允许重复值，用union all</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> city </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers</span></span>
<span class="line"><span style="color:#F78C6C;">union all</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> city </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> suppliers</span></span>
<span class="line"><span style="color:#F78C6C;">order by</span><span style="color:#A6ACCD;"> city;</span></span>
<span class="line"></span></code></pre></div><h2 id="group-by" tabindex="-1">Group By <a class="header-anchor" href="#group-by" aria-hidden="true">#</a></h2><p>通过某个一样的值进行分组，常与count()、max()、min()、sun()、avg()等配合使用，如计算每个country的用户数量</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">count</span><span style="color:#A6ACCD;">(customerID), country </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">group by</span><span style="color:#A6ACCD;"> country;</span></span>
<span class="line"></span></code></pre></div><h2 id="having" tabindex="-1">Having <a class="header-anchor" href="#having" aria-hidden="true">#</a></h2><p>因为where不能直接和count()这些aggregate functions一起使用，所以需要有having来辅助</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">count</span><span style="color:#A6ACCD;">(customerID), country</span></span>
<span class="line"><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers</span></span>
<span class="line"><span style="color:#F78C6C;">group by</span><span style="color:#A6ACCD;"> country</span></span>
<span class="line"><span style="color:#F78C6C;">having</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">count</span><span style="color:#A6ACCD;">(customerID) </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;">; </span><span style="color:#676E95;font-style:italic;">-- 过滤出5个客户以上的那些country</span></span>
<span class="line"></span></code></pre></div><h2 id="exists" tabindex="-1">Exists <a class="header-anchor" href="#exists" aria-hidden="true">#</a></h2><p>用来测试subquery是否存在record，存在则返回true，查出结果来，不存在则返回false，没有结果</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> supplierName </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> suppliers</span></span>
<span class="line"><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">exists</span><span style="color:#A6ACCD;"> (</span><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> productName </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> products </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> products.suppliersID </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> suppliers.suppliersID </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> price </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span><span style="color:#A6ACCD;">);</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">-- 列出产品价格有低于20的供应商</span></span>
<span class="line"></span></code></pre></div><h2 id="any-all" tabindex="-1">Any，All <a class="header-anchor" href="#any-all" aria-hidden="true">#</a></h2><h2 id="select-into" tabindex="-1">Select Into <a class="header-anchor" href="#select-into" aria-hidden="true">#</a></h2><h2 id="insert-into-select" tabindex="-1">Insert Into Select <a class="header-anchor" href="#insert-into-select" aria-hidden="true">#</a></h2><h2 id="case" tabindex="-1">Case <a class="header-anchor" href="#case" aria-hidden="true">#</a></h2><h2 id="null-functions" tabindex="-1">Null Functions <a class="header-anchor" href="#null-functions" aria-hidden="true">#</a></h2><h2 id="stored-procedures" tabindex="-1">Stored Procedures <a class="header-anchor" href="#stored-procedures" aria-hidden="true">#</a></h2><p>一个stored procedure是一段可重复使用的SQL代码</p><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#F78C6C;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">procedure</span><span style="color:#A6ACCD;"> selectAllCustomers @City </span><span style="color:#F78C6C;">nvarchar</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#F78C6C;">as</span></span>
<span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> city</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">@city</span></span>
<span class="line"><span style="color:#F78C6C;">go</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">-- 用的时候</span></span>
<span class="line"><span style="color:#F78C6C;">exec</span><span style="color:#A6ACCD;"> selectAllCustomers @city</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">London</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"></span></code></pre></div><h2 id="mongodb" tabindex="-1">MongoDB <a class="header-anchor" href="#mongodb" aria-hidden="true">#</a></h2><p>mongoose：odm工具包，可能nosql的odm类似于sql的orm</p>`,58),t=[p];function r(c,C,y,i,A,D){return a(),n("div",null,t)}const u=s(e,[["render",r]]);export{d as __pageData,u as default};